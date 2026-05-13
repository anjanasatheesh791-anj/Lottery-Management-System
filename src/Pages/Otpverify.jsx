import { useState } from "react"
import { Link } from "react-router-dom"

export default function OtpVerify() {

  const [otp, setOtp] = useState("")
  //useState("") -> React creates a storage box and initial valu will be empty

  return (

    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-6 py-10 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop')"
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>


      {/* OTP CARD */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl w-full max-w-md mx-auto shadow-2xl">

        <h1 className="text-white text-4xl font-bold text-center mb-5">
          OTP Verification
        </h1>


        <p className="text-gray-300 text-center leading-7 mb-6">
          Enter the OTP sent to your email address.
        </p>


        {/* OTP INPUT */}
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none text-center tracking-[10px] text-xl"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}//onChange is a function detects user activity or events...The e stands for event object,target is the input box and value is the entered text
          maxLength={6}
        />


        {/* TIMER */}
        <p className="text-center text-red-400 mb-6">
          OTP expires in 10 minutes
        </p>


        {/* VERIFY BUTTON */}
        <button className="w-full bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-3 rounded-xl">

          Verify OTP

        </button>


        {/* RESEND OTP */}
        <p className="text-center text-gray-300 mt-6">

          Didn’t receive the OTP?{" "}

          <span className="text-purple-400 hover:text-purple-300 cursor-pointer font-semibold">
            Resend OTP
          </span>

        </p>


        {/* BACK TO LOGIN */}
        <p className="text-center text-gray-400 mt-4">

          Back to{" "}

          <Link to="/login">

            <span className="text-purple-400 hover:text-purple-300 cursor-pointer font-semibold">
              Login
            </span>

          </Link>

        </p>

      </div>

    </div>

  )
}