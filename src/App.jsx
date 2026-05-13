import { BrowserRouter,Routes,Route } from "react-router-dom"//Importing tools from the packages...This pkg helps react to handle navigation
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import ForgotPassword from "./Pages/ForgotPassword"
import OtpVerify from "./Pages/Otpverify"
import AdminDashboard from "./Pages/AdminDashboard"
import CreateContest from "./Pages/CreateContest"
import QrContest from "./pages/qrcontest";
import JoinContest from "./pages/JoinContest";


export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/Login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword/>}/>
    <Route path="/otpVerify" element={<OtpVerify/>}/>
    <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
    <Route path="/CreateContest" element={<CreateContest/>}/>
    <Route path="/generate-qr"element={<QrContest />}/>
    <Route path="/join-contest/:id" element={<JoinContest />}/>
  </Routes>
  </BrowserRouter>
  )

}




