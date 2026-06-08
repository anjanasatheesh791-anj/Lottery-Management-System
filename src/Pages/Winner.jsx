import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Winners() {

  const navigate = useNavigate();

  const [winners,setWinners] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {

      const res = await axios.get(
        "https://lottery-management-system-backend.onrender.com/api/get_winner.php"
      );

      if(res.data.success){
        setWinners(res.data.winners);
      }

    } catch(err){
      console.error(err);
    } finally{
      setLoading(false);
    }
  };

  if(loading){
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center">
        <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-purple-500 border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">

          <div className="text-7xl mb-4">
            👑
          </div>

          <h1 className="text-5xl font-bold text-purple-400 mb-3">
            Hall of Winners
          </h1>

          <p className="text-gray-400 text-lg">
            Celebrating our lucky champions
          </p>

        </div>

        {winners.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center">
            <h2 className="text-2xl text-gray-400">
              No winners announced yet
            </h2>
          </div>
        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {winners.map((winner,index) => (

              <div
                key={winner.id}
                className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:-translate-y-2 duration-300 shadow-xl"
              >

                <div className="flex justify-between items-center mb-6">

                  <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl font-bold text-purple-400">
                    {winner.winner_name.charAt(0)}
                  </div>

                  <span className="text-3xl">
                    {index === 0 ? "🥇" :
                     index === 1 ? "🥈" :
                     index === 2 ? "🥉" : "🏆"}
                  </span>

                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {winner.winner_name}
                </h2>

                <p className="text-gray-400 mb-4">
                  {winner.contest_name}
                </p>

                <div className="bg-black/30 rounded-2xl p-4 border border-gray-800">

                  <p className="text-gray-500 text-sm mb-1">
                    Prize Won
                  </p>

                  <h3 className="text-3xl font-bold text-teal-400">
                    ₹{winner.prize_amount}
                  </h3>

                </div>

              </div>

            ))}

          </div>

        )}

        <div className="text-center mt-12">

          <button
            onClick={() => navigate("/")}
            className="bg-purple-500 hover:bg-purple-400 text-black font-bold px-8 py-3 rounded-xl"
          >
            Back Home
          </button>

        </div>

      </div>

    </div>
  );
}