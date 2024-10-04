import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import DetailTripStyle from '../../styles/TripStyle/DetailTripStyle';
import Apis, { endpoints } from '../../config/Apis';
import { UserContext } from '../../App';

const CreateStation = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
    const [address, setAddress] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [user] = useContext(UserContext)
    // Memoize the customIcon so it's only created once
    const customIcon = useMemo(() => {
        return new L.Icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });
    }, []);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([10.7763897, 106.7011391], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mapRef.current);

            mapRef.current.on('click', function (e) {
                const { lat, lng } = e.latlng;
                setCoordinates({ lat, lng });

                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                } else {
                    markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current);
                }

                console.info({ name, location, lat, lng });
            });
        }
    }, [name, location, customIcon]);

    const handleSearch = async () => {
        if (address) {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
                const data = await res.json();

                if (data && data.length > 0) {
                    const { lat, lon } = data[0];
                    mapRef.current.setView([lat, lon], 13);
                    setCoordinates({ lat, lng: lon });

                    if (markerRef.current) {
                        markerRef.current.setLatLng([lat, lon]);
                    } else {
                        markerRef.current = L.marker([lat, lon], { icon: customIcon }).addTo(mapRef.current);
                    }
                } else {
                    showMessage('Địa chỉ không tìm thấy');
                }
            } catch (error) {
                showMessage('Không thể tìm địa chỉ');
            }
        }
    };

    const submitStation = async () => {
        const lat = parseFloat(coordinates.lat);
        const lng = parseFloat(coordinates.lng);
        console.info('lat: ', lat, 'lng: ', lng);
        let SendData = {
            "name": name,
            "location": location,
            "latitude": lat,
            "longitude": lng
        };
        try {
            console.info('sendData: ', SendData);
            await Apis.post(endpoints['create-station'], SendData);
            showMessage('Tạo trạm thành công');
            // Reset form values
            setName('');
            setLocation('');
            setCoordinates({ lat: '', lng: '' });
            setAddress('');
            if (markerRef.current) {
                mapRef.current.removeLayer(markerRef.current);
                markerRef.current = null;
            }
        } catch (ex) {
            showMessage(ex.response?.data?.message || 'Không thể tạo trạm mới');
        }
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        {user && user.type === 'ADMIN'? <>
            <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                <TextField
                    required
                    placeholder="Nhập tên trạm..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                />
                <TextField
                    placeholder="Nhập địa chỉ..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', padding: '0 1rem', marginBottom: '0.5rem' }}>
                <TextField
                    type="text"
                    placeholder="Nhập địa chỉ để tìm..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                />
                <Button onClick={handleSearch} variant="contained" color="primary">
                    Tìm kiếm
                </Button>
            </div>
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
            <div style={DetailTripStyle.flex2}>
                <Button
                    variant="contained"
                    color="primary"
                    style={DetailTripStyle.bookButton2}
                    onClick={submitStation}
                >
                    Tạo trạm
                </Button>
            </div>

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
        </>
        :<></>}
        </>
    );
};

export default CreateStation;
