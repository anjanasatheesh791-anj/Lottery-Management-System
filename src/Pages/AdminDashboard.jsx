export default function AdminDashboard() {

  return (

    <div className="min-h-screen bg-gray-950 text-white">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-purple-400 mb-3">
          Admin Dashboard
        </h1>

        <p className="text-gray-400 text-lg">
          Manage contests, users, and lottery activities.
        </p>

      </div>

      {/* STATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

        {/* CARD 1 */}

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:-translate-y-2 duration-300">

          <div className="text-5xl mb-5">
            👥
          </div>

          <h2 className="text-4xl font-bold text-purple-400">
            120
          </h2>

          <p className="text-gray-400 mt-3">
            Total Users
          </p>

        </div>

        {/* CARD 2 */}

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:-translate-y-2 duration-300">

          <div className="text-5xl mb-5">
            🎯
          </div>

          <h2 className="text-4xl font-bold text-green-400">
            15
          </h2>

          <p className="text-gray-400 mt-3">
            Active Contests
          </p>

        </div>

        {/* CARD 3 */}

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:-translate-y-2 duration-300">

          <div className="text-5xl mb-5">
            🎫
          </div>

          <h2 className="text-4xl font-bold text-blue-400">
            560
          </h2>

          <p className="text-gray-400 mt-3">
            Tickets Sold
          </p>

        </div>

        {/* CARD 4 */}

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:-translate-y-2 duration-300">

          <div className="text-5xl mb-5">
            🏆
          </div>

          <h2 className="text-4xl font-bold text-yellow-400">
            8
          </h2>

          <p className="text-gray-400 mt-3">
            Winners Declared
          </p>

        </div>

      </div>

      {/* RECENT CONTESTS */}

      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mb-10">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-purple-400">
            Recent Contests
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-gray-800 text-left text-gray-400">

                <th className="pb-4">
                  Contest
                </th>

                <th className="pb-4">
                  Entry Fee
                </th>

                <th className="pb-4">
                  Prize
                </th>

                <th className="pb-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b border-gray-800">

                <td className="py-5">
                  Mega Pool
                </td>

                <td>
                  ₹100
                </td>

                <td>
                  ₹10,000
                </td>

                <td>

                  <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                    Active
                  </span>

                </td>

              </tr>

              <tr>

                <td className="py-5">
                  Lucky Draw
                </td>

                <td>
                  ₹50
                </td>

                <td>
                  ₹5,000
                </td>

                <td>

                  <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm">
                    Pending
                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* RECENT WINNERS */}

      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-purple-400 mb-8">
          Recent Winners
        </h2>

        <div className="space-y-5">

          {/* WINNER */}

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 flex justify-between items-center">

            <div>

              <h3 className="text-xl font-semibold">
                Rahul Kumar
              </h3>

              <p className="text-gray-400 mt-1">
                Mega Pool Winner
              </p>

            </div>

            <div className="text-green-400 text-xl font-bold">
              ₹10,000
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

