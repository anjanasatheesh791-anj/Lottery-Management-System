import { useState, useEffect } from "react";
import { FaTrophy, FaUsers, FaLock, FaGlobe, FaCalculator, FaCheckCircle, FaClipboard, FaArrowLeft, FaShareAlt } from "react-icons/fa";

export default function CreatePool() {
  // Form States
  const [poolName, setPoolName] = useState("");
  const [poolType, setPoolType] = useState("Fixed Slot"); 
  const [totalSlots, setTotalSlots] = useState(10);
  const [entryAmt, setEntryAmt] = useState(10);
  const [winnerCount, setWinnerCount] = useState(1);
  const [visibility, setVisibility] = useState(""); 
  const [description, setDescription] = useState("");
  const [expiryHours, setExpiryHours] = useState(24);
  

  // Success Screen Toggle States (Replaces the old popup modal concept)
  const [generatedCode, setGeneratedCode] = useState("");
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Calculated System States
  const [summary, setSummary] = useState({
    totalCollected: 0,
    adminCommission: 0,
    totalPrizePool: 0,
    amountPerWinner: 0,
  });

  // Automatically recalculate pool financials
  useEffect(() => {
    const commissionPercent = 10; 
    const collected = Number(entryAmt) * Number(totalSlots);
    const commission = collected * (commissionPercent / 100);
    const prizePool = collected - commission;
    const perWinner = winnerCount > 0 ? prizePool / Number(winnerCount) : 0;

    setSummary({
      totalCollected: collected,
      adminCommission: commission,
      totalPrizePool: prizePool,
      amountPerWinner: perWinner,
    });
  }, [entryAmt, totalSlots, winnerCount]);

  const handlePresetSelect = (slots, type) => {
    setPoolType(type);
    setTotalSlots(slots);
    if (winnerCount > slots) setWinnerCount(1);
  };

  const handleResetForm = () => {
    setPoolName("");
    setDescription("");
    setPoolType("Fixed Slot");
    setTotalSlots(10);
    setEntryAmt(10);
    setWinnerCount(1);
    setVisibility("Public");
    setExpiryHours(24);
    setShowSuccessPage(false);
    setIsCopied(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (!userId) {
      alert("Session expired. Please log in again.");
      return;
    }

    //console.log({poolName,visibility}); -> To check the form data submission

    const payload = {
      creator_id: userId,
      pool_name: poolName,
      pool_type: poolType,
      total_slots: totalSlots,
      entry_amount: entryAmt,
      winner_count: winnerCount,
      visibility: visibility,
      description: description,
      expiry_hours: expiryHours,
      prize_pool: summary.totalPrizePool,
    };

    fetch("https://lottery-management-system-backend.onrender.com/api/create_pool.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
   const text = await res.text();
   console.log(text);
   return JSON.parse(text);
})
      .then((data) => {
        if (data.status === "success") {
          if(visibility === 'Private')
          {
          setGeneratedCode(data.invite_code);
          
          }
        setShowSuccessPage(true);
          
        } else {
          alert(`Error: ${data.message}`);
        }
      })
      .catch((err) => {
        console.error("POOL CREATION ERROR:", err);
        alert("Failed to connect to local PHP server infrastructure.");
      });
  };

  // =========================================================================
  // VIEW RENDER 1: FULL PAGE SUCCESS SCREEN
  // =========================================================================
  if (showSuccessPage) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-center animate-fadeIn">
        <div className="w-full max-w-2xl bg-gradient-to-b from-gray-900 to-purple-950/20 border border-purple-500/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Glow Decorative element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Success Status Icon */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-4xl mb-4 shadow-inner">
              <FaCheckCircle className="text-green-400 animate-bounce" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Pool Successfully Deployed
            </h1>
            <p className="text-gray-400 text-sm max-w-md">
              Your custom lottery canvas is live on the network ledger and ready to accept entries.
            </p>
          </div>
 
          {/* INVITATION CODE MODULE */}
          {generatedCode && (
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 mb-8 text-center">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-widest block mb-3">
              Unique Invite Token
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-900/60 border border-purple-900/40 p-4 rounded-xl max-w-md mx-auto">
              <span className="text-4xl font-mono font-black tracking-wider text-purple-400 select-all">
                {generatedCode}
              </span>
              <button 
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 ${
                  isCopied ? 'bg-green-500 text-black' : 'bg-purple-500 text-black hover:bg-purple-400'
                }`}
              >
                <FaClipboard size={14} />
                {isCopied ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div> )}

          {/* METRIC SPECS SNAPSHOT */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-y border-gray-800/80 py-6 mb-8 text-sm">
            <div className="text-center p-2">
              <span className="text-gray-400 text-xs block mb-1">Title Target</span>
              <span className="font-bold text-gray-200 block truncate">{poolName || "Untitled Pool"}</span>
            </div>
            <div className="text-center p-2 border-x border-gray-800/60">
              <span className="text-gray-400 text-xs block mb-1">Total Prize Pool</span>
              <span className="font-bold text-green-400 block text-base">₹{summary.totalPrizePool}</span>
            </div>
            <div className="text-center p-2 col-span-2 md:col-span-1 border-t md:border-t-0 border-gray-800/60">
              <span className="text-gray-400 text-xs block mb-1">Slots Configuration</span>
              <span className="font-bold text-purple-300 block">{winnerCount} Winner / {totalSlots} Spots</span>
            </div>
          </div>

          {/* ACTION NAVIGATION CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="button"
              onClick={handleResetForm}
              className="flex-1 bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <FaArrowLeft size={12} /> Create Another Pool
            </button>
            <button 
              type="button"
              onClick={() => alert("Redirecting to active pool dashboard view...")}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold py-4 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-950/50"
            >
              View Active Contests
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW RENDER 2: SYSTEM CONFIGURATION FORM (Standard Form view)
  // =========================================================================
  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 flex flex-col items-center relative">
      <div className="w-full max-w-5xl">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-2">Create New Lottery Pool</h1>
          <p className="text-gray-400">Configure your parameters, set entry bounds, and initialize custom contests.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: CONFIGURATION MODULES */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* MODULE 1: BASIC DETAILS */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-200">1. Pool Info</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider block mb-2">Pool Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Friday Evening Thunder Blitz"
                    value={poolName}
                    onChange={(e) => setPoolName(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider block mb-2">Pool Description</label>
                  <textarea 
                    rows="2"
                    placeholder="Describe the target audience, terms or payout expectations..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* MODULE 2: POOL PRESETS & STRUCTURE */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-200">2. Select Pool Size Template</h2>
              <p className="text-xs text-gray-400 mb-4">Choose a structural archetype or configure your custom values below.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <button type="button" onClick={() => handlePresetSelect(2, "1 vs 1")} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${poolType === "1 vs 1" && totalSlots === 2 ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'}`}>
                  <span className="font-bold text-sm text-white">1 vs 1</span>
                  <span className="text-xs">2 Players</span>
                </button>
                <button type="button" onClick={() => handlePresetSelect(4, "2 vs 2")} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${poolType === "2 vs 2" && totalSlots === 4 ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'}`}>
                  <span className="font-bold text-sm text-white">2 vs 2</span>
                  <span className="text-xs">4 Players</span>
                </button>
                <button type="button" onClick={() => handlePresetSelect(10, "Fixed Slot")} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${poolType === "Fixed Slot" && totalSlots === 10 ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'}`}>
                  <span className="font-bold text-sm text-white">Fixed 10</span>
                  <span className="text-xs">10 Players</span>
                </button>
                <button type="button" onClick={() => handlePresetSelect(100, "Fixed Slot")} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${poolType === "Fixed Slot" && totalSlots === 100 ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'}`}>
                  <span className="font-bold text-sm text-white">Mega 100</span>
                  <span className="text-xs">100 Players</span>
                </button>
              </div>

              {/* SLOTS & ENTRIES TUNER */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider block mb-2">Total Slots</label>
                  <input 
                    type="number" 
                    value={totalSlots}
                    onChange={(e) => setTotalSlots(Math.max(2, parseInt(e.target.value) || 0))}
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider block mb-2">Entry Amount (₹)</label>
                  <input 
                    type="number" 
                    value={entryAmt}
                    onChange={(e) => setEntryAmt(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider block mb-2">Winner Count</label>
                  <input 
                    type="number" 
                    value={winnerCount}
                    max={totalSlots - 1}
                    onChange={(e) => setWinnerCount(Math.min(totalSlots - 1, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* MODULE 3: VISIBILITY & SETTINGS */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-200">3. Parameters & Scope</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider block mb-2">Visibility Style</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setVisibility("Public")} className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-medium text-sm transition ${visibility === "Public" ? 'bg-green-950/30 border-green-500 text-green-400' : 'bg-gray-950 border-gray-800 text-gray-400'}`}>
                      <FaGlobe /> Public
                    </button>
                    <button type="button" onClick={() => setVisibility("Private")} className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-medium text-sm transition ${visibility === "Private" ? 'bg-red-950/30 border-red-500 text-red-400' : 'bg-gray-950 border-gray-800 text-gray-400'}`}>
                      <FaLock /> Private
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider block mb-2">Expiry Window</label>
                  <select 
                    value={expiryHours}
                    onChange={(e) => setExpiryHours(Number(e.target.value))}
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-500 transition appearance-none cursor-pointer text-sm"
                  >
                    <option value={12}>12 Hours</option>
                    <option value={24}>24 Hours (1 Day)</option>
                    <option value={48}>48 Hours (2 Days)</option>
                    <option value={168}>168 Hours (1 Week)</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: LIVE FINANCIAL BREAKDOWN SUMMARY */}
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-b from-gray-900 to-purple-950/30 border border-purple-900/40 rounded-3xl p-6 sticky top-6">
              <div className="flex items-center gap-2 text-purple-400 mb-6">
                <FaCalculator className="text-xl" />
                <h2 className="text-xl font-bold text-white">Live Summary</h2>
              </div>

              <div className="flex flex-col gap-4 border-b border-gray-800/80 pb-6 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pool Subtype:</span>
                  <span className="font-semibold text-purple-300">{poolType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Capacity:</span>
                  <span className="font-semibold text-gray-200">{totalSlots} Spots</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Entry Stake:</span>
                  <span className="font-semibold text-green-400">₹{entryAmt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Target Winners:</span>
                  <span className="font-semibold text-yellow-400">{winnerCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Visibility Profile:</span>
                  <span className={`font-semibold ${visibility === "Public" ? 'text-green-400' : 'text-red-400'}`}>{visibility}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-sm mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-400">Gross Pool Collection:</span>
                  <span className="font-bold text-gray-200">₹{summary.totalCollected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform Fee (10%):</span>
                  <span className="font-bold text-red-400">- ₹{summary.adminCommission}</span>
                </div>
                <div className="border-t border-gray-800 my-1"></div>
                <div className="flex flex-col gap-1 bg-gray-950/60 p-4 rounded-2xl border border-gray-800">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wide">Net Allocation Pool</span>
                  <span className="text-2xl font-black text-green-400">₹{summary.totalPrizePool}</span>
                </div>
                <div className="flex flex-col gap-1 bg-purple-950/40 p-4 rounded-2xl border border-purple-900/30">
                  <span className="text-xs text-purple-400 uppercase font-bold tracking-wide flex items-center gap-1">
                    <FaTrophy className="text-yellow-400 text-xs" /> Payout Per Winner
                  </span>
                  <span className="text-2xl font-black text-purple-300">₹{summary.amountPerWinner.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-purple-500 hover:bg-purple-400 text-black font-extrabold py-4 rounded-2xl transition shadow-lg shadow-purple-500/10">
                Deploy Pool Instance
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}