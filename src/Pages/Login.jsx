import { Link, useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For showing login errors
  const [loading, setLoading] = useState(false); // To disable button while loading
  const [rememberMe,setrememberMe] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const contestId = location.state?.contestId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost/Lottery%20Management%20System/Lottery-Management-System/Backend/api/Login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        const userData = JSON.stringify(data.user);
    // If "Remember Me" is checked, use LocalStorage (Permanent)
    // Otherwise, use SessionStorage (Temporary)
     

    if (rememberMe) {

    localStorage.setItem("userId", data.user.id);

} else {

    sessionStorage.setItem("userId", data.user.id);

}





        if (contestId) {
     navigate(`/join-contest/${contestId}`);
     }  else {
    navigate("/Dashboard");
    }
      } 
      else if (data.status === "unverified") {
        // Redirect back to OTP if they aren't verified
        alert(data.message);
        navigate("/verify-otp", { state: { userId: data.user_id } });
      } 
      else {
        setError(data.message); // Show "Invalid credentials"
      }
    } catch (err) {
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-6 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop')"
      }}
    >
      {/* DARK BLUR OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-white text-4xl font-bold text-center mb-8">Login</h1>

        {/* ERROR MESSAGE PANEL */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-5 text-sm text-center">
            {error}
          </div>
        )}

        {/* FORM WRAPPER */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter email"
            className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:border-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Enter password"
            className="w-full mb-6 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:border-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setrememberMe(e.target.checked)}
              className="w-4 h-4 accent-purple-500 cursor-pointer"
            />
            <label htmlFor="remember" className="ml-3 text-gray-300 cursor-pointer">
              Remember Me
            </label>
          </div>

          <div className="flex justify-end mb-6">
            <Link
              to="/forgotpassword"
              className="text-sm text-purple-400 hover:text-purple-300 duration-300"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-400 disabled:bg-purple-900/50 disabled:text-gray-500 duration-300 text-black font-bold py-3 rounded-xl"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer font-semibold">
              Signup
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}