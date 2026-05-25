import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function OtpVerify() {
  // 1. Component State Mechanics
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // 2. React Router Context Hooks
  const location = useLocation()
  const navigate = useNavigate()

  // Pulls the hidden userId passed along from the Signup component redirect
  const userId = location.state?.userId

  // 3. Verification Event Handler Engine
  const handleVerify = async (e) => {
    e.preventDefault() // Block browser from refreshing the tab
    setError("")

    // Safety Fallback Check: Rejects users who jump directly to the URL manually
    if (!userId) {
      setError("Session reference missing. Please return to the Signup page.")
      return
    }

    // Input Length Validation Rule
    if (otp.length !== 6) {
      setError("Please input the complete 6-digit security pin.")
      return
    }

    setLoading(true)

    try {
      // Execute the async HTTP network fetch to your PHP backend api
      const response = await fetch("http://localhost/Lottery%20Management%20System/Lottery-Management-System/Backend/api/OtpVerify.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          otp: otp,
        }),
      })

      const data = await response.json()

      if (data.status === "success") {
        alert(data.message || "Account activated! Moving to login...")
        navigate("/login") // Direct onward to your application's login screen route
      } else {
        setError(data.message || "Verification failed.")
      }
    } catch (err) {
      setError("Network breakdown. Unable to reach the verification server.")
    } finally {
      setLoading(false)
    }
  }

  // 4. Numeric Input Sanitizer Filter
  const handleOtpInput = (e) => {
    const rawValue = e.target.value
    // Uses regular expression mapping to strip out anything that isn't a digit (0-9)
    const numericalOnly = rawValue.replace(/\D/g, "")
    setOtp(numericalOnly)
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

      {/* VERIFICATION INTERFACE CARD */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-white text-4xl font-bold text-center mb-3">
          Verify Account
        </h1>
        <p className="text-gray-300 text-sm text-center mb-8 px-2">
          Please input the 6-digit security code. This dynamic entry window expires in exactly 10 minutes.
        </p>

        {/* ERROR NOTIFICATION PANEL */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-5 text-sm text-center">
            {error}
          </div>
        )}

        {/* OTP TRANSACTION FORM */}
        <form onSubmit={handleVerify}>
          <input
            type="text"
            required
            maxLength="6"
            placeholder="000000"
            className="w-full mb-6 text-center tracking-[0.5em] text-3xl font-extrabold px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-600 outline-none focus:border-purple-400 duration-200"
            value={otp}
            onChange={handleOtpInput}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-400 disabled:bg-purple-900/50 disabled:text-gray-500 disabled:cursor-not-allowed duration-300 text-black font-bold py-3 rounded-xl"
          >
            {loading ? "Processing Code..." : "Verify & Activate"}
          </button>
        </form>
      </div>
    </div>
  )
}