import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function JoinContest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🌟 Double-check that this matches your current laptop IP address from cmd (ipconfig)
  const CURRENT_PC_IP = "192.168.29.17"; 

  useEffect(() => {
    fetchContestDetails();
  }, [id]);

  const fetchContestDetails = async () => {
    try {
      setLoading(true);
      // 🎯 TARGETING YOUR EXISTING FILE WITH THE NEW ?id= PARAMETER
      const response = await axios.get(
        `http://${CURRENT_PC_IP}/Lottery%20Management%20System/Lottery-Management-System/Backend/api/get_contests.php?id=${id}`
      );

      if (response.data.success) {
        setContest(response.data.contest);
      } else {
        setError(response.data.message || "Contest data not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error: Unable to reach the server backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    const loggedInUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (!loggedInUser) {
      alert("Please log in first to join this contest!");
      navigate("/login");
      return;
    }

    const user = JSON.parse(loggedInUser);

    try {
      // Send join action to your registration pool engine
      const response = await axios.post(
        `http://${CURRENT_PC_IP}/Lottery%20Management%20System/Lottery-Management-System/Backend/api/join_contest_handler.php`,
        {
          contest_id: id,
          user_id: user.id
        }
      );

      if (response.data.success) {
        alert("🎉 Successfully joined the lottery pool!");
        navigate("/dashboard");
      } else {
        alert(`❌ Failed: ${response.data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting registration request.");
    }
  };

  // UI State Checkers
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center p-6">
        <div className="bg-gray-900 border border-red-900/50 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-red-400 font-semibold mb-6">{error}</p>
          <button onClick={() => navigate("/dashboard")} className="bg-gray-800 px-6 py-2 rounded-xl text-sm">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center px-6 py-10">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 max-w-xl w-full text-center shadow-2xl">
        <span className="bg-purple-900/40 text-purple-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
          🎫 Ticket Entry Confirmed
        </span>

        <h1 className="text-4xl font-extrabold text-purple-400 mt-6 mb-2">
          {contest?.title}
        </h1>
        <p className="text-gray-500 text-sm mb-8 font-mono">Contest System Ref: #{id}</p>

        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-black/30 p-4 rounded-2xl border border-gray-800/50">
            <p className="text-gray-500 text-xs uppercase font-semibold">Grand Prize</p>
            <p className="text-2xl font-bold text-teal-400 mt-1">₹{contest?.prize_amount}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-2xl border border-gray-800/50">
            <p className="text-gray-500 text-xs uppercase font-semibold">Entry Cost</p>
            <p className="text-2xl font-bold text-yellow-400 mt-1">₹{contest?.entry_fee || "Free"}</p>
          </div>
        </div>

        <button 
          onClick={handleJoin}
          className="w-full bg-purple-500 hover:bg-purple-400 active:scale-[0.98] duration-200 text-black font-bold py-4 rounded-xl text-lg shadow-lg shadow-purple-500/20"
        >
          Confirm & Join Now
        </button>
      </div>
    </div>
  );
}