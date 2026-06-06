import { useEffect, useState } from "react";
import axios from "axios";

export default function SpinPage() {

  // STATES

  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);

  const [participants, setParticipants] = useState([]);

  const [spinning, setSpinning] = useState(false);

  const [currentName, setCurrentName] = useState("");

  const [winner, setWinner] = useState(null);

  const [loading, setLoading] = useState(true);

  // FETCH READY CONTESTS

  useEffect(() => {

    fetchReadyContests();

  }, []);

  // GET CONTESTS READY FOR DRAW

  const fetchReadyContests = async () => {

    try {

      const response = await axios.get(
        "https://lottery-management-system-backend.onrender.com/api/get_ready_contests.php"
      );

      if (response.data.success) {

        setContests(response.data.contests);

      }

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  // LOAD PARTICIPANTS

  const loadParticipants = async (contestId) => {

    try {

      const response = await axios.get(
        `https://lottery-management-system-backend.onrender.com/api/get_participants.php?contest_id=${contestId}`
      );

      if (response.data.success) {

        setParticipants(response.data.participants);

      }

    }

    catch (error) {

      console.log(error);

    }

  };

  // SELECT CONTEST

  const handleContestSelect = async (contest) => {

    setSelectedContest(contest);

    setWinner(null);

    await loadParticipants(contest.id);

  };

  // START SPIN

  const startSpin = async () => {

    // SAFETY CHECK

    if (!selectedContest) {

      alert("Please select a contest");

      return;

    }

    if (participants.length === 0) {

      alert("No participants found");

      return;

    }

    setSpinning(true);

    let currentIndex = 0;

    // SPINNING ANIMATION

    const spinInterval = setInterval(() => {

      setCurrentName(
        participants[currentIndex].name
      );

      currentIndex++;

      if (currentIndex >= participants.length) {

        currentIndex = 0;

      }

    }, 100);

    // AFTER 5 SECONDS STOP SPIN

    setTimeout(async () => {

      clearInterval(spinInterval);

      try {

        // CALL BACKEND WINNER SCRIPT

        const response = await axios.post(
          "https://lottery-management-system-backend.onrender.com/api/spin_winner.php",
          {
            contest_id: selectedContest.id
          }
        );

        if (response.data.success) {

          setWinner(response.data.winner);

          setCurrentName(
            response.data.winner.name
          );

        }

        else {

          alert(response.data.message);

        }

      }

      catch (error) {

        console.log(error);

        alert("Spin failed");

      }

      finally {

        setSpinning(false);

      }

    }, 5000);

  };

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-950 flex justify-center items-center">

        <div className="text-purple-400 text-2xl font-bold">
          Loading Spin Arena...
        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-purple-400 mb-4">
            Lottery Spin Arena
          </h1>

          <p className="text-gray-400 text-lg">
            Select a completed contest and declare winner
          </p>

        </div>

        {/* CONTEST LIST */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          {contests.map((contest) => (

            <div
              key={contest.id}
              onClick={() => handleContestSelect(contest)}
              className={`cursor-pointer border rounded-3xl p-6 duration-300 ${
                selectedContest?.id === contest.id
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-gray-800 bg-gray-900 hover:border-purple-500"
              }`}
            >

              <h2 className="text-2xl font-bold text-purple-400 mb-4">
                {contest.title}
              </h2>

              <div className="space-y-2 text-gray-300">

                <p>
                  Prize: ₹{contest.prize_amount}
                </p>

                <p>
                  Entry: ₹{contest.entry_fee}
                </p>

                <p>
                  Slots: {contest.filled_slots}/{contest.total_slots}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* SPIN SECTION */}

        {selectedContest && (

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 text-center">

            <h2 className="text-4xl font-bold text-purple-400 mb-8">
              {selectedContest.title}
            </h2>

            {/* SPIN DISPLAY */}

            <div className="bg-black/40 border border-gray-800 rounded-3xl py-16 mb-8">

              {spinning ? (

                <div>

                  <p className="text-gray-500 mb-4">
                    Spinning...
                  </p>

                  <h1 className="text-6xl font-extrabold text-yellow-400 animate-pulse">
                    {currentName}
                  </h1>

                </div>

              ) : winner ? (

                <div>

                  <p className="text-green-400 text-xl mb-4">
                    🎉 Winner Declared
                  </p>

                  <h1 className="text-6xl font-extrabold text-green-400">
                    {winner.username}
                  </h1>

                  <p className="mt-6 text-2xl text-gray-300">
                    Won ₹{selectedContest.prize_amount}
                  </p>

                </div>

              ) : (

                <div>

                  <h1 className="text-5xl font-bold text-gray-500">
                    Ready To Spin
                  </h1>

                </div>

              )}

            </div>

            {/* START BUTTON */}

            {!winner && (

              <button
                onClick={startSpin}
                disabled={spinning}
                className={`px-10 py-5 rounded-2xl text-xl font-bold duration-300 ${
                  spinning
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-400 text-black"
                }`}
              >

                {spinning
                  ? "Spinning..."
                  : "Start Lottery Spin"}

              </button>

            )}

          </div>

        )}

      </div>

    </div>

  );

}