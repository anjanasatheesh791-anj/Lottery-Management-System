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

import AdminLayout from "./Pages/AdminLayout"; 
import AdminDashboard from "./Pages/AdminDashboard"; 
import CreateContest from "./Pages/CreateContest"; 
import QrContest from "./Pages/qrcontest"; 
import AdminLogin from "./Pages/AdminLogin";





export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/otpVerify" element={<OtpVerify />} />

        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        <Route path="/CreateContest" element={<CreateContest />} />

        <Route path="/generate-qr" element={<QrContest />} />

        <Route path="/join-contest/:id" element={<JoinContest />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Test" element={<Test />} />

        <Route path="/AdminLogin" element={<AdminLogin />} />

        <Route path="/contest-details/:id" element={<ContestDetails/>}/>

        <Route path="/CreatePool" element={<CreatePool/>}/>

        <Route path="/MyPools" element={<MyPools/>}/>

        <Route path="/Pools" element={<Pools/>}/>

        <Route path="/admin" element={<AdminLayout/>}/>
        
        <Route path="/admin/Admindashboard" element={<AdminDashboard/>}/>

        <Route path="/admin/CreateContest" element={<CreateContest/>}/>

        <Route path="/admin/generate-qr" element={<QrContest/>}/>

      </Routes>
    </BrowserRouter>

  );

}