
import { IconButton, List, ListItem, ListItemText, Pagination, TextField, Button, DialogActions } from "@mui/material";
import Apis, { endpoints } from "../../config/Apis";
import { useContext, useEffect, useState } from "react";
import RoutingStyle from "../../styles/RoutingStyle/RoutingStyle";
import InfCard from "../Mutual/InfCard";
import { UserContext } from "../../App";
import SettingIcon from '@mui/icons-material/Settings';
import Spinner from "../Mutual/Spinner";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const Routing = () => {
    const [routes, setRoutes] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [page, setPage] = useState(1);
    const [showInput, setShowInput] = useState(false); // State to manage TextField and Button visibility
    const [user] = useContext(UserContext);
    const [name, setName] = useState("");
    const handleCardClick = (id) => {
        window.location.href = `http://localhost:3000/routes/${id}`;
    };

    const loadRoutes = async (pageNumber) => {
        try {
            let res = await Apis.get(`${endpoints['routes']}?page=${pageNumber}`);
            console.info(res.data)
            setRoutes(res.data);
        } catch (ex) {
            alert(ex.response.data.message);
        }
    };

    useEffect(() => {
        loadRoutes(page);
    }, [page, open]);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.history.pushState(null, '', `/routes?page=${value}`);
    };

    const toggleInput = () => {
        setShowInput(!showInput);
    };

    const handleAddRoute = async() => {
        try{
        await Apis.post(endpoints['create-routing'],{name})
        setName('') 
        setOpen(true); // Open the success modal
    } 
        catch(ex){ alert(ex.response.data.message) }
    };

    if (routes === null) {
        return <Spinner />;
    }

    return (
        <div style={RoutingStyle.containerWithOutMg}>
            <div style={RoutingStyle.pageContainer}>
                <Pagination count={routes.totalPages} page={page} onChange={handlePageChange} variant="outlined" />
            </div>
            <div style={RoutingStyle.cardContainer}>
                {routes.routes.map(route => (
                    <InfCard key={route._id} name={route.name} id={route._id} onClick={() => handleCardClick(route._id)} />
                ))}
            </div>
            {user && user.type === 'ADMIN' ? (
                <div style={RoutingStyle.divListRouting}>
                    <List  style={{paddingTop: '0'}} sx={RoutingStyle.listRouting}>
                        <ListItem disableGutters>
                            <IconButton onClick={toggleInput} aria-label="toggle-input">
                                <SettingIcon />
                                <ListItemText primary={showInput ? "Ẩn" : "Thêm tuyến"} />
                            </IconButton>
                        </ListItem>
                        {showInput && (
                            <ListItem>
                                <TextField label="Tên tuyến" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
                                <Button
                                    variant="contained" 
                                    onClick={handleAddRoute}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Thêm
                                </Button>
                            </ListItem>
                        )}
                    </List>
                </div>
            ) : null}
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

export default Routing;
