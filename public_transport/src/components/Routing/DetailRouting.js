import React, { useEffect, useState, useRef, useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Apis, { endpoints } from "../../config/Apis";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import RoutingDetailStyle from "../../styles/RoutingStyle/RoutingDetailStyle";
import HeadingContent from "../Mutual/HeadingContent";
import Spinner from "../Mutual/Spinner";
import RoutingStyle from "../../styles/RoutingStyle/RoutingStyle";
import SettingIcon from "@mui/icons-material/Settings";
import { UserContext } from "../../App";
import SelectionStation from "./SelectStation";
import { StationContext } from "./StationContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SelectionBus from "../Bus/SelectionBus";
import { BusContext } from "../Bus/BusContext";
const DetailRouting = () => {
  const { id } = useParams();
  const [user] = useContext(UserContext);
  const [route, setRoute] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRefs = useRef({});
  const [chip, setChip] = useState(false);
  const [busChip, setBusChip] = useState(false)
  const { selectedStation } = useContext(StationContext);
  const { selectedBus } = useContext(BusContext);
  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reverse, setReverse] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const customIcon = useRef(
    new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconSize: [25, 41],
      iconAnchor: [15, 45],
      popupAnchor: [1, -34],
    })
  );
  const handleClose = () => {
    setOpen(false);
  };
  const showMessage = (msg) => {
    setMessage(msg);
    setOpen(true);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadRoute = async () => {
      try {
        let res = await Apis.get(endpoints["detailRoute"](id));
        setRoute(res.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    loadRoute();
  }, [id, open]);

  const [hide, setHide] = useState(true);

  useEffect(() => {
    const initializeMap = () => {
      const stations = isReverse ? route.stationsReverse : route.stations;

      if (stations.length >= 1 && mapRef.current) {
        if (mapInstance.current) {
          if (mapInstance.current._control) {
            mapInstance.current._control.getPlan().setWaypoints([]);
            mapInstance.current.removeControl(mapInstance.current._control);
          }

          mapInstance.current.eachLayer((layer) => {
            if (
              layer instanceof L.TileLayer ||
              layer instanceof L.Routing.Control
            ) {
              if (mapInstance.current.hasLayer(layer)) {
                mapInstance.current.removeLayer(layer);
              }
            }
          });

          mapInstance.current.remove();
          mapInstance.current = null;
        }

        mapInstance.current = L.map(mapRef.current).setView(
          [stations[0].coordinates[1], stations[0].coordinates[0]],
          13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 20,
        }).addTo(mapInstance.current);

        const waypoints = stations.map((station) =>
          L.latLng(station.coordinates[1], station.coordinates[0])
        );

        const routingControl = L.Routing.control({
          waypoints: waypoints,
          routeWhileDragging: true,
        }).addTo(mapInstance.current);

        mapInstance.current._control = routingControl;

        if (hide === false) {
          routingControl.hide();
        }

        waypoints.forEach((latlng, index) => {
          const marker = L.marker(latlng, { icon: customIcon.current })
            .addTo(mapInstance.current)
            .bindPopup(stations[index].name);

          markerRefs.current[stations[index]._id] = marker;
        });

        const style = document.createElement("style");
        style.innerHTML = `
                    .leaflet-control-attribution {
                        display: none !important;
                    }
                `;
        document.head.appendChild(style);
      }
    };

    if (route) {
      initializeMap();
    }

    //Hàm làm sạch
    return () => {
      if (mapInstance.current) {
        if (mapInstance.current._control) {
          mapInstance.current._control.getPlan().setWaypoints([]);
          mapInstance.current.removeControl(mapInstance.current._control);
        }

        mapInstance.current.eachLayer((layer) => {
          if (
            layer instanceof L.TileLayer ||
            layer instanceof L.Routing.Control
          ) {
            if (mapInstance.current.hasLayer(layer)) {
              mapInstance.current.removeLayer(layer);
            }
          }
        });

        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [route, isReverse, hide]);

  //
  useEffect(() => {
    if (mapInstance.current) {
      selectedStation.forEach((station) => {
        const { coordinates, name } = station;

        if (coordinates && coordinates.length >= 2) {
          L.marker([coordinates[1], coordinates[0]], {
            icon: customIcon.current,
          })
            .addTo(mapInstance.current)
            .bindPopup(name)
            .openPopup();
        }
      });
    }
  }, [selectedStation]);
  const handleButtonClick = (station) => {
    if (Array.isArray(station.coordinates) && station.coordinates.length >= 2) {
      if (mapInstance.current) {
        mapInstance.current.setView(
          [station.coordinates[1], station.coordinates[0]],
          13
        );
        const marker = markerRefs.current[station._id];
        if (marker) {
          marker.openPopup();
        }
      }
    } else {
      console.error("Invalid coordinates for station:", station);
    }
  };

  if (!route) {
    return <Spinner />;
  }

  const showSelection = () => {
    setChip(!chip);
  };
  const showSelectionBus = () => {
    setBusChip(!busChip)
  }
  const submitStation = async () => {
    try {
      const submitData = {
        stationIds: selectedStation.map((station) => station._id),
        position: position,
        reverse: reverse,
      };
      console.info("Thông tin đã gửi: ", submitData);
      await Apis.post(endpoints["add-station"](id), submitData);
      showMessage("Thêm trạm thành công");
    } catch (ex) {
      showMessage(ex.response.data.message);
    }
  };
  const handleReverseChange = () => {
    setIsReverse(!isReverse)
  };
  const submitBus = async () => {
    try{
        const selectedBusIds = {
        "buses" : selectedBus.map(bus => bus._id)
        }
        console.log(selectedBusIds)
        await Apis.post(endpoints['add-bus'](id), selectedBusIds)
        showMessage("Thêm bus thành công");
    }
    catch(ex){
        showMessage(ex.response.data.message);
    }
  }
  return (
    <div>
      <HeadingContent title="Chi tiết tuyến xe" />
      <div style={RoutingDetailStyle.flexColumn}>
        {user && user.type === "ADMIN" ? (
          <div style={{ width: "100%", display: "block" }}>
            <List
              style={RoutingDetailStyle.pdT0FR}
              sx={RoutingStyle.listRouting}
            >
              <ListItem disableGutters>
                <IconButton onClick={showSelectionBus} aria-label="toggle-input">
                  <SettingIcon />
                  <ListItemText primary={"Thêm bus vào tuyến"} />
                </IconButton>
                <Button onClick={submitBus}> 
                  <span>Thêm Bus</span>
                </Button>
              </ListItem>
              {busChip === true ? (
                <>

                <SelectionBus />
                </>
              ) : (
                <></>
              )}
              <ListItem disableGutters>
                <IconButton onClick={showSelection} aria-label="toggle-input">
                  <SettingIcon />
                  <ListItemText primary={"Thêm trạm vào tuyến"} />
                </IconButton>
                <Button onClick={submitStation}>
                  <span>Thêm trạm</span>
                </Button>
              </ListItem>
              {chip === true ? (
                <>
                  <TextField
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Nhập vị trí thêm..."
                    style={{ marginLeft: "0.5rem" }}
                  />
                  <FormControl style={RoutingDetailStyle.formControl}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Chọn chiều
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="false"
                      name="radio-buttons-group"
                      onChange={(e) => setReverse(e.target.value)}
                    >
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Chiều đi"
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Chiều về"
                      />
                    </RadioGroup>
                  </FormControl>
                  <SelectionStation />
                </>
              ) : (
                <></>
              )}
            </List>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div style={RoutingDetailStyle.tableDiv}>
        <TableContainer
          style={{ width: isDesktop ? "45%" : "90%" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
              >
                <TableCell
                  style={{
                    ...RoutingDetailStyle.width30,
                    ...RoutingDetailStyle.tableHeading,
                  }}
                >
                  Thông tin chi tiết
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{
                    ...RoutingDetailStyle.width30,
                    ...RoutingDetailStyle.bold,
                  }}
                >
                  Tên tuyến xe
                </TableCell>
                <TableCell style={RoutingDetailStyle.width70}>
                  {route.name}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{
                    ...RoutingDetailStyle.width30,
                    ...RoutingDetailStyle.bold,
                  }}
                >
                  Số trạm
                </TableCell>
                <TableCell style={RoutingDetailStyle.width70}>
                  {route.stations.length}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{
                    ...RoutingDetailStyle.width30,
                    ...RoutingDetailStyle.bold,
                  }}
                >
                  Xe buýt
                </TableCell>
                <TableCell style={RoutingDetailStyle.width70}>
                  {route.buses.map((bus) => bus.name + " ")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={RoutingDetailStyle.divMapList}>
        <div style={RoutingDetailStyle.divMap}>
          <div ref={mapRef} style={RoutingDetailStyle.map}></div>
        </div>

        <List sx={RoutingDetailStyle.list} subheader={<li />}>
          <li>
            <ul>
              <ListSubheader style={RoutingDetailStyle.tableHeading}>
                <Button
                  style={{ width: "100%", color: "white" }}
                  onClick={handleReverseChange}
                >
                  {isReverse
                    ? "Danh sách các trạm về"
                    : "Danh sách các trạm đi"}
                </Button>
              </ListSubheader>
              {!isReverse
                ? route.stations.map((item, index) => (
                    <Button
                      key={item._id}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "0px",
                      }}
                      variant="outlined"
                      onClick={() => handleButtonClick(item)}
                    >
                      <ListItem key={Math.random()}>
                        <ListItemText primary={`${index}. ${item.name}`} />
                      </ListItem>
                    </Button>
                  ))
                : route.stationsReverse.map((item, index) => (
                    <Button
                      key={item._id}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "0px",
                      }}
                      variant="outlined"
                      onClick={() => handleButtonClick(item)}
                    >
                      <ListItem key={Math.random()}>
                        <ListItemText primary={`${index}. ${item.name}`} />
                      </ListItem>
                    </Button>
                  ))}
            </ul>
          </li>
        </List>
      </div>
      <Button
        onClick={() => {
          setHide(!hide);
        }}
        style={RoutingDetailStyle.mgleft62}
      >
        <p style={{ textAlign: "center" }}>Ẩn/hiện chỉ dẫn</p>
      </Button>

      {/* Modal box for success and error messages */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thông Báo</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailRouting;
