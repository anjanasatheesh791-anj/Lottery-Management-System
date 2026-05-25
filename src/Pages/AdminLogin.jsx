import { useState } from "react";//State management in React
import { useNavigate, Link } from "react-router-dom";//Navigation purpose

export default function AdminLogin() {

  const navigate = useNavigate();

  // STATE VARIABLES

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION

  const handleLogin = (e) => {

    e.preventDefault();

    // STATIC ADMIN LOGIN

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {

      // STORE ADMIN SESSION

      const adminData = {
        email: email,
        role: "admin"
      };

      localStorage.setItem(
        "user",
        JSON.stringify(adminData)
      );

      // REDIRECT TO ADMIN DASHBOARD

      navigate("/AdminDashboard", { replace: true });

    }

    else {

      alert("Invalid Admin Credentials ❌");

    }

  };

  return (

    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-6">

      {/* LOGIN BOX */}

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-10">

        {/* TITLE */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-purple-400 mb-4">
            Admin Login
          </h1>

          <p className="text-gray-400">
            Access the lottery administration panel
          </p>

        </div>

        {/* FORM */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="mb-6">

            <label className="block text-gray-300 mb-3 text-lg">
              Admin Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              className="w-full bg-gray-950 border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="mb-8">

            <label className="block text-gray-300 mb-3 text-lg">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full bg-gray-950 border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-4 rounded-2xl text-lg"
          >
            Login as Admin
          </button>

        </form>

        {/* BACK TO HOME */}

        <div className="text-center mt-8">

          <Link
            to="/"
            className="text-gray-400 hover:text-purple-400 duration-300"
          >
            ← Back to Homepage
          </Link>

        </div>

      </div>

    </div>

  );

}