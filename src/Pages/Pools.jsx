import { useState, useEffect } from "react";
import { FaUsers, FaGlobe, FaLock, FaSpinner, FaArrowLeft, FaClock } from "react-icons/fa";

export default function Pools() {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);
  
  // States for the Detailed View Component Toggle
  const [selectedPool, setSelectedPool] = useState(null);
  const [poolDetails, setPoolDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Fetch all active public pools for the grid directory list
  const fetchPools = () => {
    fetch("http://localhost/Lottery%20Management%20System/Lottery-Management-System/Backend/api/get_all_pools.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPools(data.data || []);
        } else {
          console.error("Error:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPools();
  }, []);

  // Open the Details View Screen and fetch live participants list
  const handleOpenDetails = (pool) => {
    setSelectedPool(pool);
    setDetailsLoading(true);
    
    fetch(`http://localhost/Lottery%20Management%20System/Lottery-Management-System/Backend/api/get_pool_details.php?pool_id=${pool.id}&pool_source=${pool.pool_source}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPoolDetails(data);
        } else {
          alert(data.message);
        }
        setDetailsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setDetailsLoading(false);
      });
  };

  // Join pool handler
  const handleJoin = (poolId, source) => {
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (!userId) {
      alert("Please login first.");
      return;
    }

    setJoiningId(poolId);

    fetch("http://localhost/Lottery%20Management%20System/Lottery-Management-System/Backend/api/join_pool.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        pool_id: poolId,
        pool_source: source,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.message || "Successfully joined pool!");
          fetchPools(); // Refresh dynamic list totals
          
          // If we are currently looking at the details page, refresh the participant names too!
          if (selectedPool) {
            handleOpenDetails(selectedPool);
          }
        } else {
          alert(data.message);
        }
        setJoiningId(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Join failed.");
        setJoiningId(null);
      });
  };

  // Loading Main UI State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-purple-400">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  // SCREEN B: THE DETAILED OVERLAY VIEW SCREEN
  if (selectedPool) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Back button resets state to go back to directory grid */}
          <button 
            onClick={() => { setSelectedPool(null); setPoolDetails(null); }}
            className="flex items-center gap-2 text-purple-400 mb-6 hover:text-purple-300 transition font-medium"
          >
            <FaArrowLeft /> Back to Pools
          </button>

          {detailsLoading ? (
            <div className="flex justify-center p-20 text-purple-400">
              <FaSpinner className="animate-spin text-3xl" />
            </div>
          ) : (
            poolDetails && (
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-black text-white">{poolDetails.pool.pool_name}</h2>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-900/40 text-purple-400 font-bold uppercase">
                    {selectedPool.pool_source} Match
                  </span>
                </div>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  Secure your spot now! Once this pool is 100% full, a winner is instantly drawn at random and credited with the total grand prize pool.                </p>

                {/* QUICK METRICS GRID SUMMARY */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800">
                    <span className="text-gray-500 text-xs block mb-1">Entry Ticket</span>
                    <span className="text-xl font-bold text-white">₹{poolDetails.pool.entry_amount}</span>
                  </div>
                  <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800">
                    <span className="text-gray-500 text-xs block mb-1">Grand Prize</span>
                    <span className="text-xl font-bold text-green-400">₹{poolDetails.pool.prize_pool}</span>
                  </div>
                  <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800">
                    <span className="text-gray-500 text-xs block mb-1">Filled Progress</span>
                    <span className="text-xl font-bold text-purple-400">{poolDetails.pool.filled_slots || 0} / {poolDetails.pool.total_slots} Slots</span>
                  </div>
                  <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800">
                    <span className="text-gray-500 text-xs block mb-1">Status</span>
                    <span className="text-sm font-bold text-yellow-400 flex items-center gap-1 mt-1">
                      <FaClock /> Waiting to Fill
                    </span>
                  </div>
                </div>

                {/* LIVE DYNAMIC PARTICIPANTS CONTAINER LIST */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3 text-purple-400">Current Competitors ({poolDetails.participants.length})</h3>
                  {poolDetails.participants.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">No players have entered this pool room yet. Secure your spot first!</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {poolDetails.participants.map((name, index) => (
                        <div key={index} className="bg-gray-950 px-4 py-2.5 rounded-xl text-sm border border-gray-800 text-gray-300 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* BOTTOM CONFIRMATION TRIGGER BUTTON */}
                <button
                  onClick={() => handleJoin(poolDetails.pool.id, selectedPool.pool_source)}
                  disabled={joiningId === poolDetails.pool.id || parseInt(poolDetails.pool.filled_slots) >= parseInt(poolDetails.pool.total_slots)}
                  className="w-full bg-purple-500 hover:bg-purple-400 text-black font-black py-4 rounded-2xl transition disabled:opacity-40"
                >
                  {joiningId === poolDetails.pool.id 
                    ? "Authorizing Entry..." 
                    : parseInt(poolDetails.pool.filled_slots) >= parseInt(poolDetails.pool.total_slots) 
                    ? "Pool Capacity Reached" 
                    : "Deposit Entry Fee & Join Match"}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  // SCREEN A: THE REGULAR DIRECTORY MAIN INDEX GRID VIEW
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* DIRECTORY HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-purple-400 mb-2">Browse Pools</h1>
          <p className="text-gray-400 text-sm">Explore active contests and join pools created by admins and users.</p>
        </div>

        {/* CONTEST DIRECTORY GRID CARDS */}
        {pools.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No pools available right now.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pools.map((pool) => (
              <div
                key={`${pool.pool_source}-${pool.id}`}
                className="bg-gray-900 border border-gray-800 rounded-3xl p-5 flex flex-col justify-between hover:border-purple-900 transition"
              >
                {/* INTERIOR INTERACTION TRIGGER SHEET */}
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 font-bold">
                      {pool.pool_source === "admin" ? "Admin Contest" : "User Pool"}
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${pool.visibility?.toLowerCase() === "private" ? "text-red-400" : "text-green-400"}`}>
                      {pool.visibility?.toLowerCase() === "private" ? <FaLock /> : <FaGlobe />}
                      {pool.visibility || "Public"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 truncate">{pool.pool_name}</h3>
                  <div className="text-sm text-gray-400 mb-4">₹{pool.entry_amount} Entry</div>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <span className="text-gray-500 text-xs">Prize Pool</span>
                      <div className="text-green-400 font-bold">₹{pool.prize_pool}</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Slots Filled</span>
                      <div className="text-gray-300 flex items-center gap-1 font-bold">
                        <FaUsers className="text-purple-400 text-xs" />
                        {pool.filled_slots || 0} / {pool.total_slots}
                      </div>
                    </div>
                  </div>
                </div>

                {/* THE CARD TRIGGER ACTION BUTTON */}
                <button
                  onClick={() => handleOpenDetails(pool)}
                  disabled={joiningId === pool.id}
                  className="mt-3 bg-purple-500 hover:bg-purple-400 text-black font-bold py-3 rounded-xl transition"
                >
                  View Details & Join
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}