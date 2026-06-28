import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendWelcomeEmail = async (name, email) => {
  try {
    await emailjs.send(
      "service_5cu3dhd",
      "template_ogxl10n",
      {
        name: name,
        email: email,
      },
      "N76znlfRi-5xQGA86"
    );

    console.log("Welcome email sent");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // STEP 1: SIGNUP
      const response = await fetch(
        "https://lottery-management-system-backend.onrender.com/api/signup.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!data || data.status !== "success") {
        setError(data?.message || "Signup failed");
        return;
      }

      // STEP 2: GENERATE OTP (ONLY ONCE)
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

      if (!otpData || otpData.status !== "success") {
  setError(otpData?.message || "OTP generation failed");
  return;
}

// SEND WELCOME EMAIL
await sendWelcomeEmail(name, email);

// STEP 3: NAVIGATE TO OTP PAGE
navigate("/OtpVerify", {
  state: { userId: data.user_id },
});

    } catch (err) {
      console.error(err);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-6 py-10 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-5 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Enter Mobile No"
            className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-6 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-400 disabled:bg-purple-800 text-black font-bold py-3 rounded-xl"
          >
            {loading ? "Processing..." : "Signup"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-purple-400 font-semibold">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}