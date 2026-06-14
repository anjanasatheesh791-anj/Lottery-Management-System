import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import OtpVerify from "./Pages/Otpverify";
import Dashboard from "./Pages/Dashboard";
import Test from "./Pages/Test";
import JoinContest from "./Pages/JoinContest";
import ContestDetails from "./Pages/Contestdetails";
import CreatePool from "./Pages/CreatePool";
import MyPools from "./Pages/Mypools";
import Pools from "./Pages/Pools";
import PoolStatus from "./Pages/PoolStatus";
import Winners from "./Pages/Winner";
import ViewPrizes from "./Pages/ViewPrizes";
import Wallet from "./Pages/Wallet";


//Admin Pages
import AdminLayout from "./Pages/AdminLayout"; 
import AdminDashboard from "./Pages/AdminDashboard"; 
import CreateContest from "./Pages/CreateContest"; 
import QrContest from "./Pages/qrcontest"; 
import AdminLogin from "./Pages/AdminLogin";
import SpinPage from "./Pages/SpinPage";
import Users from "./Pages/Users";
import Revenue from "./Pages/Revenue";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/winners" element={<Winners/>}/>

        <Route path="/prizes" element={<ViewPrizes/>}/>

        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/otpVerify" element={<OtpVerify />} />

        <Route path="/join-contest/:id" element={<JoinContest />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/contest-details/:id" element={<ContestDetails/>}/>

        <Route path="/CreatePool" element={<CreatePool/>}/>

        <Route path="/MyPools" element={<MyPools/>}/>

        <Route path="/Pools" element={<Pools/>}/>

        <Route path="/PoolStatus/:id" element={<PoolStatus/>}/>

        <Route path="/Wallet" element={<Wallet/>}/>

        <Route path="/AdminLogin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout/>}>
        
        <Route index element={<AdminDashboard />} />

        <Route path="dashboard" element={<AdminDashboard/>}/>

        <Route path="createcontest" element={<CreateContest/>}/>

        <Route path="users" element={<Users/>}/>

        <Route path="revenue" element={<Revenue/>}/>

        <Route path="generate-qr" element={<QrContest/>}/>

        <Route path="spin" element={<SpinPage />} />
      
      </Route>

      </Routes>
    </BrowserRouter>

  );

}