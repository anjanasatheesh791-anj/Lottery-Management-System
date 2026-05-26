import { useState, useEffect } from "react";
import { FaTicketAlt, FaSpinner, FaCircle, FaTrophy, FaTimesCircle } from "react-icons/fa";

export default function JoinedPoolsSidebar() {
  const [joinedPools, setJoinedPools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`https://lottery-management-system-backend.onrender.com/api/get_sidebarpools.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setJoinedPools(data.data || []);
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Calculate quick summary metrics for the header panel boxes
  const liveCount = joinedPools.filter(p => p.status === "Live").length;
  const wonCount = joinedPools.filter(p => p.status === "Won").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 text-purple-400">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl mx-auto">
      
      {/* 1. COMPONENT HEADER SECTION */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
            <FaTicketAlt className="text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Joined Matches Directory</h2>
            <p className="text-xs text-gray-400 mt-0.5">Tracking your latest pool entries and live draw statuses</p>
          </div>
        </div>
      </div>

      {/* 2. MINI STATS QUICK ROW DISPLAY */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-950 border border-gray-800/60 p-3 rounded-xl text-center">
          <span className="text-gray-500 text-[11px] font-medium uppercase block mb-0.5">Total Entries</span>
          <span className="text-lg font-bold text-white">{joinedPools.length}</span>
        </div>
        <div className="bg-gray-950 border border-gray-800/60 p-3 rounded-xl text-center">
          <span className="text-gray-500 text-[11px] font-medium uppercase block mb-0.5">Active Live</span>
          <span className="text-lg font-bold text-yellow-400">{liveCount}</span>
        </div>
        <div className="bg-gray-950 border border-gray-800/60 p-3 rounded-xl text-center">
          <span className="text-gray-500 text-[11px] font-medium uppercase block mb-0.5">Total Wins</span>
          <span className="text-lg font-bold text-green-400">{wonCount}</span>
        </div>
      </div>

      {/* 3. DYNAMIC CONTENT LIST AREA */}
      {joinedPools.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-800 rounded-2xl bg-gray-950/30">
          <p className="text-gray-500 text-sm italic">No pool entries found in your account history.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {joinedPools.map((pool, idx) => (
            <div 
              key={idx} 
              className="flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition"
            >
              <div className="truncate pr-4">
                <p className="text-base font-bold text-gray-100 truncate">{pool.pool_name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Ticket Price: <span className="text-purple-400 font-semibold">₹{pool.entry_amount}</span>
                </p>
              </div>

              {/* STATUS ACTION BADGES */}
              <div className="shrink-0">
                {pool.status === "Live" && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-yellow-950/40 text-yellow-400 font-semibold rounded-xl border border-yellow-900/60">
                    <FaCircle className="text-[6px] animate-pulse" /> Live Room
                  </span>
                )}
                {pool.status === "Won" && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-green-950/50 text-green-400 font-bold rounded-xl border border-green-900">
                    <FaTrophy className="text-xs" /> Winner
                  </span>
                )}
                {pool.status === "Lost" && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-red-950/20 text-red-400/80 font-medium rounded-xl border border-red-950">
                    <FaTimesCircle className="text-xs" /> Concluded
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}