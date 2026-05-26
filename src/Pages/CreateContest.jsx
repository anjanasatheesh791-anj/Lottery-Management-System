import axios from "axios";
import { useState } from "react";


export default function CreateContest() {

  const [contestName, setContestName] = useState("");
  const [prize, setPrize] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  

  // CREATE CONTEST FUNCTION
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        title: contestName,
        prize_amount: prize,
        contest_datetime: `${date} ${time}:00`,
        max_players: maxPlayers
      };

      const response = await axios.post(
        "https://lottery-management-system-backend.onrender.com/api/create_contest.php",
        payload
      );

      alert(response.data.message);
      

      // CLEAR FORM AFTER SUCCESS
      if (response.data.success) {

        setContestName("");
        setPrize("");
        setDate("");
        setTime("");
        setMaxPlayers("");

      }

    } catch (error) {

      console.log(error);

      alert("Server error or API not working");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-950 text-white px-6 py-10">

      <div className="w-full max-w-2xl">

        {/* PAGE TITLE */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-purple-400 mb-3">
            Create Contest
          </h1>

          <p className="text-gray-400 text-lg">
            Create and manage lottery contests from admin panel.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-10"
        >

          {/* CONTEST NAME */}
          <div className="mb-6">

            <label className="block text-lg mb-3 text-gray-300">
              Contest Name
            </label>

            <input
              type="text"
              placeholder="Enter contest name"
              className="w-full px-5 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white outline-none"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              required
            />

          </div>

          {/* PRIZE */}
          <div className="mb-6">

            <label className="block text-lg mb-3 text-gray-300">
              Prize Amount
            </label>

            <input
              type="number"
              placeholder="Enter prize amount"
              className="w-full px-5 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white outline-none"
              value={prize}
              onChange={(e) => setPrize(e.target.value)}
              required
            />

          </div>

          {/* DATE */}
          <div className="mb-6">

            <label className="block text-lg mb-3 text-gray-300">
              Contest Date
            </label>

            <input
              type="date"
              className="w-full px-5 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

          </div>

          {/* TIME */}
          <div className="mb-6">

            <label className="block text-lg mb-3 text-gray-300">
              Contest Time
            </label>

            <input
              type="time"
              className="w-full px-5 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

          </div>

          {/* MAX PLAYERS */}
          <div className="mb-8">

            <label className="block text-lg mb-3 text-gray-300">
              Maximum Players
            </label>

            <input
              type="number"
              placeholder="Enter maximum players"
              className="w-full px-5 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white outline-none"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              required
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-4 rounded-xl text-lg"
          >
            Create Contest
          </button>

        </form>



      </div>

    </div>

  );

}