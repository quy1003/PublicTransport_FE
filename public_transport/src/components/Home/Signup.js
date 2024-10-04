import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DetailTripStyle from '../../styles/TripStyle/DetailTripStyle';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import RoutingDetailStyle from '../../styles/RoutingStyle/RoutingDetailStyle';
import { useState } from 'react';
import Apis, { endpoints } from '../../config/Apis';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const signup = async () => {
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        if (!validateEmail(email)) {
            setError('Email không đúng định dạng');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('type', 'CUSTOMER');
        formData.append('email', email);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            setLoading(true);
            await Apis.post(endpoints['signup'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setOpen(true);
        } catch (ex) {
            setError(ex.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/login');
    };

    return (
        <div style={{ ...DetailTripStyle.container, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '530px', backgroundImage: 'url(https://images.unsplash.com/photo-1565642899687-1c332fb7dc65?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, width: { md: '40%', sm: '100%' } }}
                noValidate
                autoComplete="off"
                style={{ padding: '1% 0', paddingBottom: '5%' }}
            >
                <Container style={{ ...DetailTripStyle.containerRgba, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ ...RoutingDetailStyle.divHeading }}>
                        <p style={{ ...RoutingDetailStyle.tableHeading, padding: '0.8rem', width: '100%', textAlign: 'center' }}>Đăng ký</p>
                    </div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Họ và tên"
                        style={{ width: '100%', padding: '0.4rem' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Tài khoản"
                        style={{ width: '100%', padding: '0.4rem' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Mật khẩu"
                        type="password"
                        style={{ width: '100%', padding: '0 0.4rem' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-confirm-password-input"
                        label="Nhập lại mật khẩu"
                        type="password"
                        style={{ width: '100%', padding: '0 0.4rem' }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        style={{ width: '100%', padding: '0 0.4rem' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ margin: '1rem 0', padding: '0.4rem', width: '100%' }}
                    />
                    {error && (
                        <p style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</p>
                    )}
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            style={DetailTripStyle.bookButton}
                            onClick={signup}
                        >
                            Đăng ký
                        </Button>
                    )}
                </Container>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Thành công"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Đăng ký thành công!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Signup;
