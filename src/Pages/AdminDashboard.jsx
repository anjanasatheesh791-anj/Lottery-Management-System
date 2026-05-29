import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 1. Fetch user session from browser memory
    const loggedInUser = localStorage.getItem("user") || sessionStorage.getItem("user");

    // 2. If no data exists, they aren't logged in at all
    if (!loggedInUser) {
      navigate("/AdminLogin",{replace:true});
      return;
    }

    const user = JSON.parse(loggedInUser);

    // 3. Secure Check: Kick them out if they are a standard 'player'
    if (user.role !== "admin") {
      alert("Access Denied: Admins Only! ❌");
      navigate("/dashboard"); // Redirect standard users to their normal dashboard
    } else {
      setIsAdmin(true); // Verification passed!
    }
  }, [navigate]);

  // 🚪 The Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("user");   // Wipe permanent session
    sessionStorage.removeItem("user");  // Wipe temporary session
    navigate("/AdminLogin");                 // Direct back to gatehouse
  };

  // Prevent flashing the UI layout while checking the database role status
  if (!isAdmin) {
    return null;
  }

return (
  <div className="min-h-screen bg-gray-100 flex">

    {/* SIDEBAR */}
    <div className="w-72 bg-gray-900 text-white p-6 flex flex-col justify-between">

      <div>
        {/* LOGO */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-purple-400">
            Lottery Admin
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Management Panel
          </p>
        </div>

        {/* MENU */}
        <div className="space-y-3">

          <Link
            to="/AdminDashboard"
            className="flex items-center gap-3 bg-purple-500/20 text-purple-400 px-4 py-3 rounded-xl"
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/CreateContest"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-xl duration-300"
          >
            🎯 Pools
          </Link>

          <Link
            to="/Users"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-xl duration-300"
          >
            👥 Users
          </Link>

          <Link
            to="/Tickets"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-xl duration-300"
          >
            🎫 Tickets
          </Link>

          <Link
            to="/Winners"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-xl duration-300"
          >
            🏆 Winners
          </Link>

          <Link
            to="/generate-qr"
            className="flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-xl duration-300"
          >
            📷 QR Verify
          </Link>
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-400 duration-300 px-5 py-3 rounded-xl font-semibold text-black"
      >
        Logout
      </button>
    </div>

    {/* MAIN CONTENT */}
    <div className="flex-1 p-8 overflow-y-auto">

      {/* TOP HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back, Admin 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage contests, users and lottery activities
          </p>
        </div>

        {/* PROFILE */}
        <div className="bg-white shadow-md px-5 py-3 rounded-xl">
          <p className="font-semibold text-gray-700">
            Admin Panel
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* CARD 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-3xl font-bold text-gray-800">120</h2>
          <p className="text-gray-500 mt-2">Total Users</p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold text-gray-800">15</h2>
          <p className="text-gray-500 mt-2">Active Pools</p>
        </div>

        {/* CARD 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-4xl mb-4">🎫</div>
          <h2 className="text-3xl font-bold text-gray-800">560</h2>
          <p className="text-gray-500 mt-2">Tickets Sold</p>
        </div>

        {/* CARD 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800">8</h2>
          <p className="text-gray-500 mt-2">Winners Declared</p>
        </div>
      </div>

      {/* RECENT CONTESTS */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Contests
          </h2>

          <Link
            to="/CreateContest"
            className="bg-purple-500 hover:bg-purple-400 text-white px-5 py-2 rounded-xl duration-300"
          >
            + Create
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                <th className="py-4">Contest</th>
                <th>Entry Fee</th>
                <th>Prize</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-4">Mega Pool</td>
                <td>₹100</td>
                <td>₹10,000</td>
                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Lucky Draw</td>
                <td>₹50</td>
                <td>₹5,000</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT WINNERS */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recent Winners
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
            <div>
              <h3 className="font-semibold text-gray-800">
                Rahul Kumar
              </h3>
              <p className="text-gray-500 text-sm">
                Mega Pool Winner
              </p>
            </div>

            <div className="text-green-600 font-bold">
              ₹10,000
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
            <div>
              <h3 className="font-semibold text-gray-800">
                Anjali Nair
              </h3>
              <p className="text-gray-500 text-sm">
                Lucky Draw Winner
              </p>
            </div>

            <div className="text-green-600 font-bold">
              ₹5,000
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
);


}