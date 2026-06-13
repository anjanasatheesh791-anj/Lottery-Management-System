import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export default function CreateContest() {

  const [contestName, setContestName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
 const [entryAmount, setEntryAmount] = useState(10);
const [winnerCount, setWinnerCount] = useState(1);

const [summary, setSummary] = useState({
  totalCollected: 0,
  adminCommission: 0,
  prizePool: 0,
  amountPerWinner: 0,
});


useEffect(() => {

  const collected =
    Number(entryAmount) * Number(maxPlayers);

  const commission =
    collected * 0.10;

  const prizePool =
    collected - commission;

  const amountPerWinner =
    winnerCount > 0
      ? prizePool / winnerCount
      : 0;

  setSummary({
    totalCollected: collected,
    adminCommission: commission,
    prizePool,
    amountPerWinner
  });

}, [entryAmount, maxPlayers, winnerCount]);

  // CREATE CONTEST FUNCTION
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
  title: contestName,
  entry_amount: entryAmount,
  winner_count: winnerCount,
  contest_datetime: `${date} ${time}:00`,
  max_players: maxPlayers,

  total_collected: summary.totalCollected,
  admin_commission: summary.adminCommission,
  prize_pool: summary.prizePool
};

      const response = await axios.post(
        "https://lottery-management-system-backend.onrender.com/api/create_contest.php",
        payload
      );
console.log(response.data);
alert(JSON.stringify(response.data));
      

      // CLEAR FORM AFTER SUCCESS
      if (response.data.success) {

        setContestName("");
        setDate("");
        setTime("");
        setMaxPlayers("");
        setEntryAmount(10);
        setWinnerCount(1);

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
         
        <div className="mb-6">

            <label className="block text-lg mb-3 text-gray-300">
              Entry Amount
            </label>
          <input
  type="number"
  value={entryAmount}
  onChange={(e) => setEntryAmount(e.target.value)}
  className="w-full px-5 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white outline-none"
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

        <div className="mb-8">

  <label className="block text-lg mb-3 text-gray-300">
    Winner Count
  </label>

  <input
    type="number"
    value={winnerCount}
    min="1"
    max={maxPlayers || 1}
   onChange={(e) =>
  setWinnerCount(
    Math.max(
      1,
      Math.min(
        Number(maxPlayers || 1),
        Number(e.target.value)
      )
    )
  )
}
    className="w-full px-5 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white outline-none"
    required
  />

</div>

<div className="bg-gray-950 border border-purple-700 rounded-xl p-5 mb-6">

  <h3 className="text-xl font-bold text-purple-400 mb-4">
    Contest Financial Summary
  </h3>

  <div className="space-y-3">

    <div className="flex justify-between">
      <span>Total Collection</span>
      <span>₹{summary.totalCollected}</span>
    </div>

    <div className="flex justify-between">
      <span>Platform Fee (10%)</span>
      <span>₹{summary.adminCommission}</span>
    </div>

    <div className="flex justify-between">
      <span>Prize Pool</span>
      <span>₹{summary.prizePool}</span>
    </div>

    <div className="flex justify-between">
      <span>Amount Per Winner</span>
      <span>
        ₹{summary.amountPerWinner.toFixed(2)}
      </span>
    </div>

  </div>

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