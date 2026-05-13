import { useState } from "react"
import { Link } from "react-router-dom"

export default function ForgotPassword() {

  const [email, setEmail] = useState("")

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


      {/* FORGOT PASSWORD CARD */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl w-full max-w-md mx-auto shadow-2xl">

        <h1 className="text-white text-4xl font-bold text-center mb-5">
          Forgot Password
        </h1>

        <p className="text-gray-300 text-center mb-8 leading-7">
          Enter your registered email address to reset your password.
        </p>


        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-6 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        {/* RESET BUTTON */}
        <button className="w-full bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-3 rounded-xl">

          Send Reset Link

        </button>


        {/* BACK TO LOGIN */}
        <p className="text-center text-gray-300 mt-6">

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