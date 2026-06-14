import { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaTrophy,
  FaChartLine,
  FaCoins,
} from "react-icons/fa";

export default function Revenue() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    total_collection: 0,
    total_revenue: 0,
    total_prize: 0,
    completed_contests: 0,
  });

  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetch(
      "https://lottery-management-system-backend.onrender.com/api/revenue.php"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSummary(data.revenue);
          setContests(data.contests);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading Revenue Data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-purple-400">
          Revenue Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Platform earnings and contest revenue analytics
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaMoneyBillWave className="text-green-400 text-2xl" />
            <span className="text-gray-400">Total Collection</span>
          </div>

          <h2 className="text-3xl font-bold text-green-400">
            ₹{summary.total_collection}
          </h2>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaCoins className="text-yellow-400 text-2xl" />
            <span className="text-gray-400">Platform Revenue</span>
          </div>

          <h2 className="text-3xl font-bold text-yellow-400">
            ₹{summary.total_revenue}
          </h2>

          <p className="text-xs text-gray-500 mt-2">
            10% Commission Earned
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaTrophy className="text-purple-400 text-2xl" />
            <span className="text-gray-400">Prize Distributed</span>
          </div>

          <h2 className="text-3xl font-bold text-purple-400">
            ₹{summary.total_prize}
          </h2>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-blue-400 text-2xl" />
            <span className="text-gray-400">Completed Contests</span>
          </div>

          <h2 className="text-3xl font-bold text-blue-400">
            {summary.completed_contests}
          </h2>
        </div>
      </div>

      {/* Revenue Formula */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 mb-10">
        <h2 className="text-xl font-bold text-purple-400 mb-4">
          Revenue Calculation System
        </h2>

        <div className="space-y-3 text-gray-300">
          <p>
            Total Collection = Entry Amount × Participants
          </p>

          <p>
            Platform Revenue = Total Collection × 10%
          </p>

          <p>
            Prize Pool = Total Collection − Platform Revenue
          </p>

          <div className="mt-4 bg-gray-950 rounded-2xl p-4 border border-gray-800">
            <p>Example:</p>
            <p>₹10 × 10 Participants = ₹100</p>
            <p>Platform Revenue = ₹10</p>
            <p>Winner Prize Pool = ₹90</p>
          </div>
        </div>
      </div>

      {/* Contest Revenue Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
        <h2 className="text-xl font-bold text-purple-400 mb-6">
          Contest Revenue Breakdown
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="pb-4">Contest</th>
                <th className="pb-4">Entry Fee</th>
                <th className="pb-4">Participants</th>
                <th className="pb-4">Collection</th>
                <th className="pb-4">Revenue</th>
                <th className="pb-4">Prize Pool</th>
                <th>Source</th>
              </tr>
            </thead>

            <tbody>
              {contests.map((contest, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-800/30"
                >
                  <td className="py-4">{contest.pool_name}</td>

                  <td>₹{contest.entry_amount}</td>

                  <td>{contest.participants}</td>

                  <td className="text-green-400">
                    ₹{contest.collection}
                  </td>

                  <td className="text-yellow-400">
                    ₹{contest.revenue}
                  </td>

                  <td className="text-purple-400">
                    ₹{contest.prize_pool}
                  </td>

                  <td>{contest.source}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {contests.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No completed contests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}