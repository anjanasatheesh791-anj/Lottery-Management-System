import { useState, useEffect } from "react";
import { FaTrophy, FaClipboard, FaCheckCircle, FaSpinner, FaSearch, FaUsers, FaClock, FaGlobe, FaLock } from "react-icons/fa";

export default function MyPools() {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedPoolId, setCopiedPoolId] = useState(null);

  // Fetch all pools created by this specific user
  useEffect(() => {
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (!userId) {
      console.error("User session missing.");
      setLoading(false);
      return;
    }

    // Direct endpoint connection targeting your local machine architecture
    fetch(`http://localhost/Lottery%20Management%20System/Lottery-Management-System/Backend/api/get_user_pools.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPools(data.data || []);
        } else {
          console.error("Backend Error Message:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Local network link failure:", err);
        setLoading(false);
      });
  }, []);

  // Copy code handler
  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedPoolId(id);
    setTimeout(() => setCopiedPoolId(null), 2000);
  };

  // Filter pools based on search input (Pool Name or Invite Code)
  const filteredPools = pools.filter((pool) =>
    pool.pool_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pool.invite_code || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-gray-950 text-purple-400">
        <FaSpinner className="animate-spin text-4xl" />
        <span className="text-sm text-gray-500 font-medium tracking-wide">Syncing local network ledgers...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER & SEARCH CONTROL LAYER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-900">
          <div>
            <h1 className="text-4xl font-black text-purple-400 mb-1 tracking-tight">My Deployed Pools</h1>
            <p className="text-gray-400 text-sm">Monitor system capacity variables, revenue models, and operational invite keys.</p>
          </div>
          
          {/* Live Filter Bar */}
          {pools.length > 0 && (
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <FaSearch size={14} />
              </span>
              <input
                type="text"
                placeholder="Search name or invite code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 text-sm border border-gray-800 rounded-2xl pl-11 pr-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          )}
        </div>

        {/* MAIN DISPLAY ENGINE */}
        {pools.length === 0 ? (
          // Empty State if no pools exist in database yet
          <div className="bg-gray-900 border border-gray-800/60 rounded-3xl p-16 text-center max-w-xl mx-auto mt-12 shadow-xl">
            <div className="text-5xl mb-4 text-gray-700">📊</div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">No Pools Deployed Yet</h3>
            <p className="text-gray-500 text-sm mb-6">You haven't initialized any lottery contracts under this creator profile account signature.</p>
          </div>
        ) : filteredPools.length === 0 ? (
          // Empty State if search query finds nothing
          <div className="bg-gray-900/40 border border-gray-900 rounded-2xl p-12 text-center text-gray-500 max-w-md mx-auto">
            No matching active contracts found for "{searchTerm}".
          </div>
        ) : (
          // Responsive Matrix Grid for active cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPools.map((pool) => (
              <div 
                key={pool.id} 
                className="bg-gray-900 border border-gray-800 rounded-3xl p-5 relative flex flex-col justify-between hover:border-purple-900/60 transition-all duration-300 group shadow-lg shadow-black/40"
              >
                <div>
                  {/* Top Category Badge Header */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="bg-purple-950/40 text-purple-400 border border-purple-900/40 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">
                      {pool.pool_type || "Fixed Slot"}
                    </span>
                    
                    {/* Visibility Badge Indicator */}
                    <span className={`text-xs flex items-center gap-1 font-semibold ${pool.visibility === "Private" ? "text-red-400" : "text-green-400"}`}>
                      {pool.visibility === "Private" ? <FaLock size={10} /> : <FaGlobe size={10} />}
                      {pool.visibility || "Public"}
                    </span>
                  </div>

                  {/* Title & Context */}
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-purple-400 transition truncate mb-1">
                    {pool.pool_name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    {pool.description || "No specific guidelines or descriptions provided for this tournament layout."}
                  </p>
                  
                  {/* Financial Metrics Panel */}
                  <div className="grid grid-cols-2 gap-3 mb-5 bg-gray-950/60 p-4 rounded-2xl border border-gray-800/80">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block mb-0.5">Prize Pool Allocation</span>
                      <span className="text-base font-black text-green-400">₹{pool.prize_pool}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block mb-0.5">Capacity Matrix</span>
                      <span className="text-base font-bold text-gray-300 flex items-center gap-1">
                        <FaUsers className="text-xs text-gray-500" /> {pool.winner_count}W / {pool.total_slots}S
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Lower Action Token Bar */}
                {pool.invite_code && (
                  <div className="flex justify-between items-center bg-gray-950/80 -mx-5 -mb-5 p-4 rounded-b-3xl border-t border-gray-800/60 mt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-0.5">Invite Code</span>
                    <span className="font-mono font-black text-lg text-purple-300 tracking-wider">
                      {pool.invite_code}
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleCopyCode(pool.invite_code, pool.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 duration-150 ${
                      copiedPoolId === pool.id 
                        ? "bg-green-500 text-black shadow-lg shadow-green-500/10" 
                        : "bg-gray-900 text-gray-200 border border-gray-800 hover:border-gray-700 hover:text-white"
                    }`}
                  >
                    {copiedPoolId === pool.id ? (
                      <>
                        <FaCheckCircle className="text-black" /> Copied
                      </>
                    ) : (
                      <>
                        <FaClipboard className="text-gray-400 group-hover:text-white" /> Copy Token
                      </>
                    )}
                  </button>
                </div>)}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}