import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Spinner from "../Mutual/Spinner";
import { Box, Typography, Avatar, Fade } from "@mui/material";
import RoutingDetailStyle from "../../styles/RoutingStyle/RoutingDetailStyle";
import { Button } from "react-bootstrap";
import homeStyles from "../../styles/HomeStyle/HomeStyle";
import DashboardLayoutBasic from "./DashboardLayoutBasic";

const Profile = () => {
  const [user] = useContext(UserContext);
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    if (user && user.type === "ADMIN") {
      setShowDrawer(prev => !prev);
    }
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <div style={homeStyles?.mgdiv || {}}> 
      {user && (
        <>
          <Box sx={RoutingDetailStyle?.sxtmp || {}}> 
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Button style={homeStyles?.btnProfile || {}} onClick={toggleDrawer}>
              <Typography
                style={{ color: "rgb(25, 118, 210)" }}
                variant="h5"
                component="h1"
                gutterBottom
              >
                {user.name}
              </Typography>
              <Typography
                style={{
                  ...RoutingDetailStyle?.tableHeading, 
                  ...RoutingDetailStyle?.tableHeadingPadding, 
                }}
                variant="h5"
                component="h1"
                gutterBottom
              >
                {user.type === "ADMIN" ? "QUẢN TRỊ VIÊN" : "NGƯỜI DÙNG"}
              </Typography>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  Tên: {user.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Tài khoản: {user.username}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Email: {user.email}
                </Typography>
              </Box>
            </Button>
          </Box>

          <Fade in={showDrawer} timeout={50}>
            <Box sx={{ width: 300, maxHeight: '300px', overflowY: 'auto', backgroundColor: 'white' }}>
              <DashboardLayoutBasic />
            </Box>
          </Fade>
        </>
      )}
    </div>
  );
};

export default Profile;
