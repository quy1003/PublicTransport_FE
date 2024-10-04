import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine'; 
import StationStyle from '../../styles/StationStyle/StationStyle';
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34]
});

const StationMap = ({ stations }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!stations || stations.length === 0) {
      console.warn('No stations data available');
      return;
    }
    if (mapInstance.current) {
        try {
          mapInstance.current.eachLayer((layer) => {
              if (
                  layer instanceof L.Marker
                ) {
                  if (mapInstance.current.hasLayer(layer)) {
                    mapInstance.current.removeLayer(layer);
                  }
                }
          });

          if (routingControlRef.current) {
            if (mapInstance.current) {
              try {
                mapInstance.current.removeControl(routingControlRef.current);
                routingControlRef.current = null;
              } catch (error) {
                console.error('Error removing routing control:', error);
              }
            }
          }

          if (stations.length > 0) {
            stations.forEach((station) => {
              const { coordinate, name } = station;
              if (coordinate && coordinate.length === 2) {
                try {
                  L.marker([coordinate[1], coordinate[0]], { icon: customIcon })
                    .addTo(mapInstance.current)
                    .bindPopup(name);
                } catch (error) {
                  console.error('Error adding marker:', error);
                }
              } else {
                console.warn('Invalid coordinates:', coordinate);
              }
            });

            if (stations.length > 1) {
              const waypoints = stations
                .filter(station => station.coordinate && station.coordinate.length === 2)
                .map(station => L.latLng(station.coordinate[1], station.coordinate[0]));
    
              try {
                routingControlRef.current = L.Routing.control({
                  waypoints: waypoints,
                  routeWhileDragging: true,
                  show:false,
                  createMarker: () => null,
                }).addTo(mapInstance.current);
    
                setTimeout(() => {
                  document.querySelectorAll('.leaflet-routing-control').forEach(control => {
                    control.style.display = 'none';
                  });
                }, 100);
    
                const group = L.featureGroup(stations
                  .filter(station => station.coordinate && station.coordinate.length === 2)
                  .map(station =>
                    L.marker([station.coordinate[1], station.coordinate[0]], { icon: customIcon })
                  )
                );
    
                const bounds = group.getBounds();
                if (bounds.isValid()) {
                  mapInstance.current.fitBounds(bounds);
                } else {
                  console.warn('No valid bounds to fit');
                }
              } catch (error) {
                console.error('Error with routing control or fitBounds:', error);
              }
            }
          }
        } catch (error) {
          console.error('Unexpected error in useEffect:', error);
        }
      }
    // Initialize the map if not already created
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(
        [stations[1]?.coordinate[1] || 0, stations[1]?.coordinate[0] || 0],
        13
      );
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
      }).addTo(mapInstance.current);
    }

    
  }, [stations]);
  
  
  

  return (
    <div 
      ref={mapRef} 
      style={StationStyle.mapStyle}
    ></div>
  );
};

export default StationMap;
