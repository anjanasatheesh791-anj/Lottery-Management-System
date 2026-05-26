import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function QrContest() {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);

  
 
  // FETCH CONTESTS
  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
  try {
    const response = await axios.get(
      `https://lottery-management-system-backend.onrender.com/api/get_contests.php`
    );

    console.log(response.data);

    setContests(
      Array.isArray(response.data)
        ? response.data
        : response.data.data || []
    );

  } catch (error) {
    console.log(error);
    alert("Failed to fetch contests.");
  }
};

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      {/* TITLE */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-purple-400 mb-3">
          Generate QR Codes
        </h1>
        <p className="text-gray-400 text-lg">
          Select a contest to generate QR code.
        </p>
      </div>

      {/* CONTEST LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-purple-400 mb-3">
                {contest.title}
              </h2>
              <p className="text-gray-400 mb-2">
                Prize: ₹{contest.prize_amount}
              </p>
              <p className="text-gray-400 mb-6">
                Max Players: {contest.max_players}
              </p>
            </div>

            <button
              onClick={() => setSelectedContest(contest)}
              className="w-full bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-3 rounded-xl mt-auto"
            >
              Generate QR
            </button>
          </div>
        ))}
      </div>

      {/* QR DISPLAY */}
      {selectedContest && (
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">
            {selectedContest.title}
          </h2>

          <div className="bg-white inline-block p-5 rounded-2xl shadow-xl">
            <QRCodeCanvas
              value={`https://lottery-management-system.vercel.app/contest-details/${selectedContest.id}`}
              size={250}
            />
          </div>

          <p className="text-gray-400 mt-6 break-all font-mono text-sm bg-black/30 p-3 rounded-xl inline-block">
            `https://lottery-management-system.vercel.app/contest-details/${selectedContest.id}`
          </p>
        </div>
      )}
    </div>
  );
}