import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PoolStatus() {

  const { id } = useParams();

  const [pool, setPool] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGGED IN USER

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH POOL STATUS

  const fetchPoolStatus = async () => {

    try {

      const response = await fetch(
        `https://your-backend-url.com/pool-status.php?id=${id}`
      );

      const data = await response.json();

      setPool(data);

      setLoading(false);

    }

    catch (error) {

      console.log("Error fetching pool status:", error);

      setLoading(false);

    }

  };

  // INITIAL LOAD

  useEffect(() => {

    fetchPoolStatus();

    // AUTO REFRESH EVERY 10 SECONDS

    const interval = setInterval(() => {

      fetchPoolStatus();

    }, 10000);

    return () => clearInterval(interval);

  }, []);

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-950 flex justify-center items-center">

        <div className="text-purple-400 text-2xl font-bold">
          Loading Pool Status...
        </div>

      </div>

    );

  }

  // POOL NOT FOUND

  if (!pool) {

    return (

      <div className="min-h-screen bg-gray-950 flex justify-center items-center">

        <div className="bg-gray-900 border border-red-500 rounded-3xl p-10">

          <h1 className="text-red-400 text-3xl font-bold mb-4">
            Pool Not Found
          </h1>

          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300"
          >
            Back to Homepage
          </Link>

        </div>

      </div>

    );

  }

  // CALCULATIONS

  const slotsLeft =
    pool.total_slots - pool.filled_slots;

  const isWinner =
    user &&
    pool.winner_declared &&
    Number(user.id) === Number(pool.winner_user_id);

  return (

    <div className="min-h-screen bg-gray-950 px-6 py-10">

      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-8">

        {/* PAGE TITLE */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-purple-400 mb-3">
            Pool Status
          </h1>

          <p className="text-gray-400 text-lg">
            Track live slot progress and winner announcement
          </p>

        </div>

        {/* POOL DETAILS */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* ENTRY FEE */}

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5">

            <p className="text-gray-400 mb-2">
              Entry Fee
            </p>

            <h2 className="text-3xl font-bold text-white">
              ₹{pool.entry_fee}
            </h2>

          </div>

          {/* PRIZE AMOUNT */}

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5">

            <p className="text-gray-400 mb-2">
              Prize Amount
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              ₹{pool.prize_amount}
            </h2>

          </div>

          {/* TOTAL SLOTS */}

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5">

            <p className="text-gray-400 mb-2">
              Total Slots
            </p>

            <h2 className="text-3xl font-bold text-white">
              {pool.total_slots}
            </h2>

          </div>

          {/* FILLED SLOTS */}

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5">

            <p className="text-gray-400 mb-2">
              Filled Slots
            </p>

            <h2 className="text-3xl font-bold text-purple-400">
              {pool.filled_slots}
            </h2>

          </div>

        </div>

        {/* SLOT PROGRESS */}

        <div className="mb-10">

          <div className="flex justify-between mb-3">

            <span className="text-gray-300 font-semibold">
              Pool Progress
            </span>

            <span className="text-purple-400 font-bold">
              {pool.filled_slots}/{pool.total_slots}
            </span>

          </div>

          <div className="w-full bg-gray-800 rounded-full h-5 overflow-hidden">

            <div
              className="bg-purple-500 h-5"
              style={{
                width: `${(pool.filled_slots / pool.total_slots) * 100}%`
              }}
            ></div>

          </div>

        </div>

        {/* POOL STATUS */}

        {!pool.winner_declared ? (

          <div className="bg-yellow-500/10 border border-yellow-500 rounded-2xl p-6 mb-8">

            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Waiting For Participants
            </h2>

            <p className="text-gray-300 text-lg mb-2">
              {slotsLeft} slot{slotsLeft !== 1 ? "s" : ""} remaining
            </p>

            <p className="text-gray-400">
              Winner will be announced once all slots are filled.
            </p>

          </div>

        ) : (

          <div className="bg-green-500/10 border border-green-500 rounded-2xl p-6 mb-8">

            <h2 className="text-3xl font-bold text-green-400 mb-6">
              🎉 Winner Declared
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Winner Name
                </span>

                <span className="text-white font-bold">
                  {pool.winner_name}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Prize Amount
                </span>

                <span className="text-green-400 font-bold">
                  ₹{pool.prize_amount}
                </span>

              </div>

            </div>

          </div>

        )}

        {/* USER RESULT */}

        {pool.winner_declared && user && (

          <div className="mb-8">

            {isWinner ? (

              <div className="bg-green-500 text-black text-center font-bold text-2xl rounded-2xl py-5">

                🎉 Congratulations! You Won This Pool

              </div>

            ) : (

              <div className="bg-red-500/10 border border-red-500 text-red-400 text-center font-bold text-xl rounded-2xl py-5">

                Better Luck Next Time

              </div>

            )}

          </div>

        )}

        {/* ACTION BUTTONS */}

        <div className="flex flex-col md:flex-row gap-4">

          {/* REFRESH */}

          <button
            onClick={fetchPoolStatus}
            className="flex-1 bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-4 rounded-2xl"
          >
            Refresh Status
          </button>

          {/* BACK */}

          <Link
            to="/dashboard"
            className="flex-1 bg-gray-800 hover:bg-gray-700 duration-300 text-white font-bold py-4 rounded-2xl text-center"
          >
            Back to Dashboard
          </Link>

        </div>

      </div>

    </div>

  );

}