import React, { useContext, useEffect, useState, useRef } from "react"; 
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine"; 
import io from "socket.io-client";
import { UserContext } from "../../App";
import Spinner from "../Mutual/Spinner";
import { Box, Button, Typography } from "@mui/material";
import Apis, { endpoints } from "../../config/Apis";
import RoutingDetailStyle from "../../styles/RoutingStyle/RoutingDetailStyle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// Fix for default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const socket = io("http://localhost:5000");

const RoutingMachine = ({ stations }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (map) {
      // Xóa routing control hiện tại nếu đã tồn tại
      if (routingControlRef.current) {
        try {
          console.log('Removing existing routing control');
          if (map.hasLayer(routingControlRef.current)) {
            map.removeControl(routingControlRef.current);
          }
        } catch (error) {
          console.error('Error removing existing routing control:', error);
        } finally {
          routingControlRef.current = null;
        }
      }

      // Kiểm tra nếu có đủ stations để tạo routing control
      if (stations && stations.length > 1) {
        const waypoints = stations.map((station) =>
          L.latLng(station.coordinates[1], station.coordinates[0])
        );

        console.log('Waypoints:', waypoints);

        try {
          // Tạo routing control mới và thêm vào bản đồ
          routingControlRef.current = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: false,
            show: false,
          }).addTo(map);
          
          // Xóa thủ công các phần tử HTML liên quan đến routing control cũ
          setTimeout(() => {
            const controls = document.querySelectorAll('.leaflet-routing-container');
            controls.forEach(control => {
              control.parentNode.removeChild(control); // Xóa mỗi control
            });
          }, 100); // Thời gian ngắn chờ để đảm bảo các control được render

        } catch (error) {
          console.error('Error adding routing control:', error);
        }
      }
    }

    // Cleanup khi component unmount hoặc khi stations thay đổi
    return () => {
      if (routingControlRef.current) {
        try {
          console.log('Removing routing control on unmount');
          if (map.hasLayer(routingControlRef.current)) {
            map.removeControl(routingControlRef.current);
          }
        } catch (error) {
          console.error('Error removing routing control on unmount:', error);
        } finally {
          routingControlRef.current = null;  // Đảm bảo giá trị được đặt lại
        }
      }
    };
  }, [map, stations]);

  return null;
};



// Các component khác không thay đổi
function LocationMarker({ setPosition, sendBusLocation }) {
  const map = useMap();

  useMapEvents({
    locationfound(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      sendBusLocation(lat, lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate({
      setView: true,
      maxZoom: 16,
      watch: true,
      enableHighAccuracy: true,
    });
  }, [map]);

  return null;
}

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

function BusPosition() {
  const [position, setPosition] = useState([10.77690197587158, 106.70584127259971]);
  const [user] = useContext(UserContext);
  const [tripDetails, setTripDetails] = useState(null);
  const [stations, setStations] = useState(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    socket.emit("driverId", user._id);

    socket.on("tripDetail", async (trip) => {
      if (trip.isReverse === true) {
        setStations(trip.route.stationsReverse);
      } else {
        setStations(trip.route.stations);
      }

      const response = await Apis.get(endpoints["detailTrip"](trip._id));
      setTripDetails(response.data);
    });

    return () => {
      socket.off("tripDetail");
    };
  }, [user._id]);

  const sendBusLocation = (latitude, longitude) => {
    socket.emit("busLocation", {
      lat: latitude,
      lng: longitude,
      user: user?.name,
    });
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
            marginBottom: "5px",
            ...RoutingDetailStyle.tableHeading,
            textAlign: "center",
          }}
        >
          Chuyến xe hiện tại
        </Typography>
        {!hide ? (
          <></>
        ) : (
          <div>
            {stations ? (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "#F5F5DC",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 300,
                  float: "right",
                  "& ul": { padding: 0 },
                }}
                subheader={
                  <Typography
                    style={{
                      textAlign: "center",
                      zIndex: "100",
                      backgroundColor: "yellow",
                      padding: "10px",
                      position: "fixed",
                      width: "22.5%",
                    }}
                  >
                    Danh sách các trạm
                  </Typography>
                }
              >
                {stations.map((station, index) => (
                  <ListItem
                    key={station._id}
                    style={{ marginTop: index === 0 ? "40px" : "0px" }}
                  >
                    <ListItemText primary={station.name} />
                  </ListItem>
                ))} 
              </List>
            ) : (
              <></>
            )}
            {tripDetails ? (
              <Box
                sx={{
                  padding: "16px",
                  display: "inline-block",
                  marginBottom: "5px",
                  marginLeft: "40%",
                }}
              >
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Mã chuyến:</strong> {tripDetails._id}
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Tên xe:</strong> {tripDetails.bus.name}
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Tuyến đường:</strong> {tripDetails.route.name}
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Giá vé:</strong> {tripDetails.price}
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Giờ khởi hành:</strong>{" "}
                  {new Date(tripDetails.departureTime).toLocaleString()}
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Chiều:</strong>{" "}
                  {tripDetails.isReverse ? "Chiều về" : "Chiều đi"}
                </Typography>
              </Box>
            ) : (
              <Typography
                sx={{
                  color: "gray",
                  fontStyle: "italic",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Chưa có chuyến xe nào đến giờ khởi hành
              </Typography>
            )}
          </div>
        )}
        <Button style={{ padding: "10px" }} onClick={() => setHide(!hide)}>
          {!hide ? "Xem chi tiết chuyến xe" : "Ẩn thông tin chuyến xe"}
        </Button>
      </div>
      <MapContainer
        center={position}
        zoom={17}
        style={{ height: "33rem", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
        <ChangeView center={position} />
        <LocationMarker setPosition={setPosition} sendBusLocation={sendBusLocation} />

        {stations &&
          stations.map((station) => (
            <Marker
              key={station._id}
              position={[station.coordinates[1], station.coordinates[0]]} 
            >
              <Popup>{station.name}</Popup>
            </Marker>
          ))}

        {stations && <RoutingMachine stations={stations} />}
      </MapContainer>
    </div>
  );
}

export default BusPosition;
