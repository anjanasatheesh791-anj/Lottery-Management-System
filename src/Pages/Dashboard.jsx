import { useEffect, useState } from "react";
import {
  FaHome,
  FaPlusCircle,
  FaUsers,
  FaWallet,
  FaHistory,
  FaHeadset,
  FaBell,
  FaTrophy,
  FaGamepad,
  FaUserCircle,
  FaSignOutAlt,
  FaArrowDown,
  FaLayerGroup,
  FaGift
} from "react-icons/fa";

import CreatePool from "./CreatePool";
import MyPools from "./Mypools";
import Pools from "./Pools";
import JoinedPools from "./JoinedPools"; 


export default function Dashboard() {
  const [wallet, setWallet] = useState(0);
  const [user, setUser] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard"); 

  useEffect(() => {
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    
    if (!userId || userId === "null" || userId === "undefined") {
      console.log("Invalid or missing user ID");
      return;
    }

    console.log("Fetching data for User ID:", userId);

    /* ---------------- USER FETCH ---------------- */
    fetch(`https://lottery-management-system-backend.onrender.com/api/get_user.php?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
        }
      })
      .catch((err) => console.log("USER FETCH ERROR:", err));

    /* ---------------- WALLET FETCH ---------------- */
    /* ---------------- WALLET FETCH ---------------- */
fetch(`https://lottery-management-system-backend.onrender.com/api/get_wallet.php?id=${userId}`)
  .then((res) => res.json()) // Safely handle standard JSON response
  .then((data) => {
    console.log("Wallet API raw payload response:", data);
    
    if (data.status === "success" && data.wallet) {
      setWallet(data.wallet.balance);
    } else {
      console.log("Backend sent an error status:", data.message);
      setWallet(0);
    }
  })
  .catch((err) => {
    console.log("Network or JSON Parsing Error:", err);
    setWallet(0);
  });
  
  const handleWithdraw = (e) => {
    e.preventDefault();
    alert(`Withdrawal request submitted for ₹${withdrawAmount}`);
    setWithdrawAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      
      {/* SIDEBAR */}
      <div className="w-[280px] bg-gray-900 border-r border-gray-800 p-6 flex flex-col fixed h-screen">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-purple-400">Lottery Pool</h1>
          <p className="text-gray-500 mt-2">User Panel</p>
        </div>

        {/* USER PROFILE */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 mb-10">
          <FaUserCircle className="text-5xl text-purple-400" />
          <div>
            <h2 className="text-lg font-semibold">{user?.name || "Loading..."}</h2>
            <p className="text-gray-500 text-sm">Premium User</p>
          </div>
        </div>

        {/* MENU LINKS */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-left font-semibold transition duration-200 ${
              activeTab === "dashboard" 
                ? "bg-purple-500 text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FaHome /> Dashboard
          </button>

          <button 
            onClick={() => setActiveTab("Pools")}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-left font-semibold transition duration-200 ${
              activeTab === "Pools" 
                ? "bg-purple-500 text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FaGift /> Pools
          </button>

          <button 
            onClick={() => setActiveTab("createPool")}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-left font-semibold transition duration-200 ${
              activeTab === "createPool" 
                ? "bg-purple-500 text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FaPlusCircle /> Create Pools
          </button>

          <button 
            onClick={() => setActiveTab("JoinedPools")}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-left font-semibold transition duration-200 ${
              activeTab === "JoinedPools" 
                ? "bg-purple-500 text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FaUsers /> Joined Pools
          </button>

          <button 
            onClick={() => setActiveTab("Wallet")}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-left font-semibold transition duration-200 ${
              activeTab === "Wallet" 
                ? "bg-purple-500 text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FaWallet /> Wallet
          </button>
        
          <button 
            onClick={() => setActiveTab("myPools")}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-left font-semibold transition duration-200 ${
              activeTab === "myPools" 
                ? "bg-purple-500 text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FaLayerGroup/> My Pools
          </button>

          <button className="flex items-center gap-4 hover:bg-gray-800 duration-300 px-5 py-4 rounded-2xl w-full text-left text-gray-400 hover:text-white">
            <FaHistory /> Transactions
          </button>
          <button className="flex items-center gap-4 hover:bg-gray-800 duration-300 px-5 py-4 rounded-2xl w-full text-left text-gray-400 hover:text-white">
            <FaHeadset /> Support
          </button>
        </div>

        {/* LOGOUT */}
        <button className="w-full mt-auto bg-red-500 hover:bg-red-400 duration-300 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* MAIN DYNAMIC CONTENT */}
      <div className="flex-1 ml-[280px] p-10 overflow-y-auto min-h-screen">
        {activeTab === "createPool" ? (
          <CreatePool />
        ) : activeTab === "myPools" ? (
          <MyPools />
        ) : activeTab === "Pools" ? (
          <Pools />
        ) : activeTab === "JoinedPools" ? (
          <div className="w-full min-h-[70vh] flex items-center justify-center p-4">
            <JoinedPools />
          </div>
        ) : activeTab === "Wallet" ? (
          <Wallet />
        ) : (
          <>
            {/* TOP HEADER */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-5xl font-bold text-purple-400 mb-3">Welcome Back 👋</h1>
                <p className="text-gray-400 text-lg">Manage your pools, wallet and contests here.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl relative cursor-pointer hover:bg-gray-800 duration-200">
                <FaBell className="text-3xl text-yellow-400" />
                <span className="absolute top-4 right-4 bg-red-500 h-2 w-2 rounded-full"></span>
              </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                <FaWallet className="text-4xl text-green-400 mb-4" />
                <h2 className="text-3xl font-bold mb-2">₹ {wallet}</h2>
                <p className="text-gray-400 text-sm">Wallet Balance</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                <FaGamepad className="text-4xl text-blue-400 mb-4" />
                <h2 className="text-3xl font-bold mb-2">4</h2>
                <p className="text-gray-400 text-sm">Active Games</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                <FaUsers className="text-4xl text-pink-400 mb-4" />
                <h2 className="text-3xl font-bold mb-2">12</h2>
                <p className="text-gray-400 text-sm">Joined Pools</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                <FaTrophy className="text-4xl text-yellow-400 mb-4" />
                <h2 className="text-3xl font-bold mb-2">2</h2>
                <p className="text-gray-400 text-sm">Wins</p>
              </div>
            </div>

            {/* BOTTOM DATA GRIDS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* JOINED POOLS PANEL */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-200">Your Joined Pools</h3>
                    <button className="text-purple-400 text-sm font-semibold hover:underline">View All</button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h4 className="font-semibold text-lg">Mega Weekly Pool #402</h4>
                        <p className="text-sm text-gray-500 mt-1">Prize: <span className="text-yellow-400 font-medium">₹10,000</span> • Entry: ₹50</p>
                      </div>
                      <span className="text-xs bg-purple-950 text-purple-400 border border-purple-800 font-bold px-3 py-1 rounded-full">Live</span>
                    </div>
                  </div>
                </div>

                {/* TRANSACTIONS PANEL */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                  <h3 className="text-xl font-bold text-gray-200 mb-6">Recent History</h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-500 text-sm">
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-800/50">
                      <tr>
                        <td className="py-3 flex items-center gap-2"><span className="p-1.5 bg-green-950 text-green-400 rounded-lg text-xs"><FaArrowDown /></span>Pool Win</td>
                        <td className="py-3 text-green-400 font-semibold">+ ₹500</td>
                        <td className="py-3"><span className="text-xs px-2.5 py-1 bg-green-950/50 border border-green-900 text-green-400 rounded-full">Completed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* QUICK UTILITIES COLUMN */}
              <div className="flex flex-col gap-8">
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
                  <h3 className="text-xl font-bold text-gray-200 mb-2">Fast Cashout</h3>
                  <form onSubmit={handleWithdraw} className="flex flex-col gap-4 mt-4">
                    <input 
                      type="number" 
                      placeholder="Amount (₹)" 
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                    <button type="submit" className="w-full bg-purple-500 text-black font-bold py-3.5 rounded-2xl">Submit Request</button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}