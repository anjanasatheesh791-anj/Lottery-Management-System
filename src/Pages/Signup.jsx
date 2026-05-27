import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
          headers: { "Content-Type": "application/json" },
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
      const otpRes = await fetch(
        "https://lottery-management-system-backend.onrender.com/api/generateOtp.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: data.user_id }),
        }
      );

      const otpData = await otpRes.json();

      if (!otpData || otpData.status !== "success") {
        setError(otpData?.message || "OTP generation failed");
        return;
      }

      // STEP 3: NAVIGATE
      navigate("/OtpVerify", {
        state: { userId: data.user_id },
      });

    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button disabled={loading}>
          {loading ? "Processing..." : "Signup"}
        </button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}