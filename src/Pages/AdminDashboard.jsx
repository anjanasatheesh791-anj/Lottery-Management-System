import { Link } from "react-router-dom";
export default function AdminDashboard() {

  return (

    <div className="min-h-screen bg-gray-950 text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold text-purple-400">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Manage contests, users, and lottery activities
          </p>
        </div>

        <button className="bg-red-500 hover:bg-red-400 duration-300 px-5 py-3 rounded-xl font-semibold text-black">
          Logout
        </button>

      </div>


      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* CARD 1 */}
        <Link to="/CreateContest">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl hover:-translate-y-2 duration-300">

          <div className="text-5xl mb-5">
            🎯
          </div>

          <h2 className="text-2xl font-bold text-purple-400 mb-3">
            Create Contest
          </h2>

          <p className="text-gray-400 leading-7">
            Add and manage new lottery contests.
          </p>

        </div>
        </Link>


        {/* CARD 2 */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl hover:-translate-y-2 duration-300">

          <div className="text-5xl mb-5">
            👥
          </div>

          <h2 className="text-2xl font-bold text-teal-400 mb-3">
            Users
          </h2>

          <p className="text-gray-400 leading-7">
            View registered users and participants.
          </p>

        </div>


        {/* CARD 3 */}
        <Link to="/generate-qr">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl hover:-translate-y-2 duration-300">

          <div className="text-5xl mb-5">
            📷
          </div>

          <h2 className="text-2xl font-bold text-purple-400 mb-3">
            Generate QR
          </h2>

          <p className="text-gray-400 leading-7">
            Create QR codes for contest joining.
          </p>

        </div>
        </Link>


        {/* CARD 4 */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl hover:-translate-y-2 duration-300">

          <div className="text-5xl mb-5">
            🏆
          </div>

          <h2 className="text-2xl font-bold text-teal-400 mb-3">
            Winners
          </h2>

          <p className="text-gray-400 leading-7">
            Manage and announce contest winners.
          </p>

        </div>

      </div>

        </div>
 )

}