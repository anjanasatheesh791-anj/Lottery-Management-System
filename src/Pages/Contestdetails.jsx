import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ContestDetails() {

  // GET CONTEST ID FROM URL

  const { id } = useParams();
  console.log("Contest ID:", id);

  const navigate = useNavigate();

  // STATES

  const [contest, setContest] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // YOUR CURRENT LAPTOP IP

 

  // FETCH CONTEST DETAILS WHEN PAGE LOADS

  useEffect(() => {

    fetchContest();

  }, [id]);

  // FUNCTION TO FETCH CONTEST

  const fetchContest = async () => {

    try {

      setLoading(true);

      const response = await axios.get(

        `https://lottery-management-system-backend.onrender.com/api/get_contests_details.php?id=${id}`

      );

      // SUCCESS

      if (response.data.success) {

        setContest(response.data.contest);

      }

      // FAILED

      else {

        setError(response.data.message);

      }

    }

    catch (err) {

      console.log(err);

      setError("Unable to load contest");

    }

    finally {

      setLoading(false);

    }

  };

  // HANDLE JOIN

  const handleJoinContest = () => {

    // CHECK USER LOGIN

    const loggedInUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    // USER NOT LOGGED IN

    if (!loggedInUser) {

      alert("Please login first to join contest");

     navigate("/login", {
  state: { contestId: contest.id }
});

      return;

    }

    // REDIRECT TO JOIN PAGE

    navigate(`/join-contest/${id}`);

  };

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-950 flex justify-center items-center">

        <h1 className="text-white text-3xl font-bold">
          Loading Contest...
        </h1>

      </div>

    );

  }

  // ERROR SCREEN

  if (error) {

    return (

      <div className="min-h-screen bg-gray-950 flex justify-center items-center px-6">

        <div className="bg-gray-900 border border-red-500 rounded-3xl p-10 text-center max-w-xl w-full">

          <div className="text-6xl mb-5">
            ⚠️
          </div>

          <h1 className="text-red-400 text-3xl font-bold mb-4">
            Error
          </h1>

          <p className="text-gray-300 text-lg">
            {error}
          </p>

        </div>

      </div>

    );

  }

  // MAIN PAGE

  return (

    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-purple-400 mb-3">
            Contest Details
          </h1>

          <p className="text-gray-400 text-lg">
            View contest information and join the lottery pool.
          </p>

        </div>

        {/* MAIN CARD */}

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT SIDE */}

            <div>

              <h2 className="text-4xl font-bold mb-8">
                {contest?.title}
              </h2>

              {/* DETAILS */}

              <div className="space-y-6">

                {/* PRIZE */}

                <div className="flex justify-between border-b border-gray-800 pb-4">

                  <span className="text-gray-400 text-lg">
                    Prize Amount
                  </span>

                  <span className="text-green-400 text-2xl font-bold">
                    ₹ {contest?.prize_amount}
                  </span>

                </div>

                {/* PLAYERS */}

                <div className="flex justify-between border-b border-gray-800 pb-4">

                  <span className="text-gray-400 text-lg">
                    Maximum Players
                  </span>

                  <span className="text-blue-400 text-2xl font-bold">
                    {contest?.max_players}
                  </span>

                </div>

                {/* DATE */}

                <div className="flex justify-between border-b border-gray-800 pb-4">

                  <span className="text-gray-400 text-lg">
                    Contest Date & Time
                  </span>

                  <span className="text-purple-400 text-xl font-bold">
                    {contest?.contest_datetime}
                  </span>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">

              <h3 className="text-3xl font-bold text-purple-400 mb-8">
                Join Contest
              </h3>

              {/* CONTEST ID */}

              <div className="mb-6">

                <p className="text-gray-400 mb-2">
                  Contest ID
                </p>

                <h2 className="text-3xl font-bold">
                  #{contest?.id}
                </h2>

              </div>

              {/* STATUS */}

              <div className="mb-6">

                <p className="text-gray-400 mb-2">
                  Contest Status
                </p>

                <h2 className="text-green-400 text-2xl font-bold">
                  Open
                </h2>

              </div>

              {/* JOIN BUTTON */}

              <button

                onClick={handleJoinContest}

                className="w-full bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-4 rounded-2xl text-lg mt-8"

              >
                Join Contest
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}