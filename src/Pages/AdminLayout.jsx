import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);

  // ADMIN AUTH CHECK
  useEffect(() => {

    const loggedInUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    // NO LOGIN
    if (!loggedInUser) {
      navigate("/AdminLogin", { replace: true });
      return;
    }

    const user = JSON.parse(loggedInUser);

    // NOT ADMIN
    if (user.role !== "admin") {
      alert("Access Denied: Admins Only ❌");
      navigate("/dashboard");
    } else {
      setIsAdmin(true);
    }

  }, [navigate]);

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    navigate("/AdminLogin");
  };

  // PREVENT FLASHING
  if (!isAdmin) {
    return null;
  }

  // ACTIVE LINK STYLE
  const activeLink =
    "flex items-center gap-3 bg-purple-500/20 text-purple-400 px-4 py-3 rounded-2xl border border-purple-500/30";

  const normalLink =
    "flex items-center gap-3 hover:bg-gray-800 px-4 py-3 rounded-2xl duration-300";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* SIDEBAR */}
      <div className="w-72 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <div className="mb-12">

            <h1 className="text-3xl font-bold text-purple-400">
              Lottery Admin
            </h1>

            <p className="text-gray-400 mt-2 text-sm">
              Control Center
            </p>

          </div>

          {/* NAVIGATION */}
          <div className="space-y-3">

            {/* DASHBOARD */}
            <Link
              to="dashboard"
              className={
                location.pathname === "/admin/dashboard"
                  ? activeLink
                  : normalLink
              }
            >
              🏠 Dashboard
            </Link>

            {/* POOLS */}
            <Link
              to="createcontest"
              className={
                location.pathname === "/admin/createcontest"
                  ? activeLink
                  : normalLink
              }
            >
              🎯 Pools
            </Link>

            {/* USERS */}
            <Link
              to="users"
              className={
                location.pathname === "/admin/users"
                  ? activeLink
                  : normalLink
              }
            >
              👥 Users
            </Link>

            
            {/* REVENUE */}
            <Link
              to="/admin/Revenue"
              className={
                location.pathname === "/admin/Revenue"
                  ? activeLink
                  : normalLink
              }
            >
              🏆 Revenue
            </Link>

            {/* QR */}
            <Link
              to="/admin/generate-qr"
              className={
                location.pathname === "/admin/generate-qr"
                  ? activeLink
                  : normalLink
              }
            >
              📷 Generate QR
            </Link>

           <Link to="spin"
           className={
           location.pathname === "/admin/spin"
           ? activeLink
           : normalLink
          }
          >
          🎡 Spin Arena
          </Link>

          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 duration-300 px-5 py-3 rounded-2xl font-semibold text-black"
        >
          Logout
        </button>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">

        <Outlet />

      </div>

    </div>
  );
}