import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Signup() {
  // 1. Core State Form Fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // 2. Auxiliary UI States
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // 3. Navigation Hook
  const navigate = useNavigate()

  // 4. Submit Handler Function
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents the page from refreshing on form submit
    setError("")

    // Frontend validation safety check
    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    setLoading(true)

   try {
  const response = await fetch("https://lottery-management-system-backend.onrender.com/api/signup.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      password: password,
      confirm_password: confirmPassword,
    }),
  })

  const text = await response.text()

  console.log("RAW RESPONSE:", text)

  const data = JSON.parse(text)
if (data.status === "success") {

  const otpResponse = await fetch(
    "https://lottery-management-system-backend.onrender.com/api/generateOtp.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: data.user_id,
      }),
    }
  );

  const otpData = await otpResponse.json();

  console.log("OTP API RESPONSE:", otpData);

  if (otpData.status === "success") {
    navigate("/OtpVerify", { state: { userId: data.user_id } });
  } else {
    setError(otpData.message || "OTP generation failed.");
  }

} else {
  setError(data.message || "Registration failed.");
}

} catch (err) {
  console.error(err)
  setError(err.message)
} finally {
  setLoading(false)
}

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

      {/* SIGNUP CARD */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Create Account
        </h1>

        {/* ERROR DISPLAY BOX */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-5 text-sm text-center">
            {error}
          </div>
        )}

        {/* FORM CONTAINER */}
        <form onSubmit={handleSubmit}>
          {/* NAME */}
<input
  id="signup-name"
  name="name"
  type="text"
  required
  placeholder="Enter Name"
  className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

{/* EMAIL */}
<input
  id="signup-email"
  name="email"
  type="email"
  required
  placeholder="Enter Email"
  className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

{/* PHONE NO */}
<input
  id="signup-phone"
  name="phone"
  type="tel"
  required
  placeholder="Enter mobile no"
  className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

{/* PASSWORD */}
<input
  id="signup-password"
  name="password"
  type="password"
  required
  placeholder="Enter Password"
  className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

{/* CONFIRM PASSWORD */}
<input
  id="signup-confirm-password"
  name="confirmPassword"
  type="password"
  required
  placeholder="Confirm Password"
  className="w-full mb-6 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>

          {/* SIGNUP BUTTON */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-400 disabled:bg-purple-800 disabled:cursor-not-allowed duration-300 text-black font-bold py-3 rounded-xl"
          >
            {loading ? "Registering..." : "Signup"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
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