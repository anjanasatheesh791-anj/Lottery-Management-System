import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import OtpVerify from "./Pages/Otpverify";
import AdminDashboard from "./Pages/AdminDashboard";
import CreateContest from "./Pages/CreateContest";
import QrContest from "./Pages/qrcontest";
import Dashboard from "./Pages/Dashboard";
import Test from "./Pages/Test";
import AdminLogin from "./Pages/AdminLogin";
import JoinContest from "./Pages/JoinContest";
import ContestDetails from "./Pages/Contestdetails";
import CreatePool from "./Pages/CreatePool";
import MyPools from "./Pages/Mypools";
import Pools from "./Pages/Pools";

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

        <Route path="/generate-qr" element={<Qrcontest />} />

        <Route path="/join-contest/:id" element={<JoinContest />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Test" element={<Test />} />

        <Route path="/AdminLogin" element={<AdminLogin />} />

        <Route path="/contest-details/:id" element={<ContestDetails/>}/>

        <Route path="/CreatePool" element={<CreatePool/>}/>

        <Route path="/MyPools" element={<MyPools/>}/>

        <Route path="/Pools" element={<Pools/>}/>

        

      </Routes>

    </BrowserRouter>

  );

}