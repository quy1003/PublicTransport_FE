import { BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./components/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from "./components/Routing/Routing";
import DetailRouting from "./components/Routing/DetailRouting";
import Trip from "./components/Trip/Trip";
import DetailTrip from "./components/Trip/DetailTrip";
import Login from "./components/Home/Login";
import { createContext, useReducer } from "react";
import UserReducer from "./reducers/UserReducer";
import cookie from "react-cookies"
import Signup from "./components/Home/Signup";
import Station from "./components/Station/Station";
import CreateStation from "./components/Station/CreateStation";
import CreateRouting from "./components/Routing/CreateRouting";
import { StationProvider } from "./components/Routing/StationContext";
import CreateTrip from "./components/Trip/CreateTrip";
import { BusProvider } from "./components/Bus/BusContext";
import Bus from "./components/Bus/Bus";
import CreateBus from "./components/Bus/CreateBus";
import AdminChat from "./components/Chat/AdminChat";
import UserChat from "./components/Chat/UserChat";
import FindStation from "./components/Station/FindStation";
import Profile from "./components/Home/Profile";
import MyTrips from "./components/User/MyTrip";
import Tickets from "./components/Ticket/Tickets";
import CreateBlog from "./components/Blog/CreateBlog";
import DetailBlog from "./components/Blog/BlogDetail";
import Blog from "./components/Blog/Blog";
import BusPosition from "./components/Bus/BusPosition";
import AdminSignUp from "./components/Home/AdminSignUp";
import AllBusPositions from "./components/Bus/AllBusPosition";
import ReportsComponent from "./components/Report/Report";
import RevenueChart from "./components/Ticket/RevenueChart";

export const UserContext = createContext();


const App = () => {
  const [user, dispatch] = useReducer(UserReducer, cookie.load("user") || null)
  return (
    <UserContext.Provider value={[user, dispatch]}>
      <StationProvider>
        <BusProvider>
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login/" element={<Login/>} />
        <Route path="/sign-up/" element={<Signup/>} /> 
        <Route path="/routes/" element={<Routing/>}/>
        <Route path="/stations/create-routing/" element={<CreateRouting/>} />
        <Route path="/routes/:id" element={<DetailRouting />} />
        <Route path="/trips/" element={<Trip/>}/>
        <Route path="/trips/create-trip/" element={<CreateTrip />} />
        <Route path="/trips/:id" element={<DetailTrip />} />
        <Route path="/stations/" element={<Station/>} />
        <Route path="/stations/create-station/" element={<CreateStation/>} />
        <Route path="/buses/" element={<Bus/>} />
        <Route path="/buses/create-bus/" element={<CreateBus/>} />
        <Route path="/admin-chat/" element={<AdminChat/>} />
        <Route path="/user-chat/" element={<UserChat/>} />
        <Route path="/find-path/" element={<FindStation/>} />
        <Route path="/profile/" element={<Profile/>} />
        <Route path="/users/my-trip/" element={<MyTrips/>} />
        <Route path="/tickets/" element={<Tickets/>} />
        <Route path="/blogs/" element={<Blog/>} />
        <Route path="/blogs/create-blog/" element={<CreateBlog/>} />
        <Route path="/blogs/:id" element={<DetailBlog/>} />
        <Route path="/buses/all-position/" element={<AllBusPositions/>} />
        <Route path="/buses/bus-position/" element={<BusPosition/>} />
        <Route path="/admin-signup/" element={<AdminSignUp/>} />
        <Route path="/reports/" element={<ReportsComponent/>} />
        <Route path="/tickets/statistics" element={<RevenueChart/>} />
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
      </BusProvider>
      </StationProvider>
    </UserContext.Provider>
  );
};

export default App;
