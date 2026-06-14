import { useEffect, useState } from "react";
import { FaWallet, FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Wallet() {
  const userId = localStorage.getItem("user_id");
  console.log("User ID:", userId);

  const [wallet, setWallet] = useState({
    balance: 0,
    total_deposit: 0,
    total_withdrawal: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://lottery-management-system-backend.onrender.com/api/get_wallet_details.php?id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setWallet({
  balance: data.wallet.balance,
  total_deposit: 0,
  total_withdrawal: 0,
});
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="text-white p-6">
        Loading wallet...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        💳 Wallet
      </h1>

      {/* Balance Card */}

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 mb-8">

        <div className="flex items-center gap-3 mb-4">
          <FaWallet size={28} />
          <h2 className="text-xl font-semibold">
            Available Balance
          </h2>
        </div>

        <h1 className="text-5xl font-bold">
          ₹{wallet.balance}
        </h1>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <FaArrowDown />
            <span>Total Deposits</span>
          </div>

          <h2 className="text-3xl font-bold">
            ₹{wallet.total_deposit}
          </h2>
        </div>

        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <FaArrowUp />
            <span>Total Withdrawals</span>
          </div>

          <h2 className="text-3xl font-bold">
            ₹{wallet.total_withdrawal}
          </h2>
        </div>

      </div>

      {/* Buttons */}

      <div className="mt-8 flex gap-4">

        <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold">
          Add Money
        </button>

        <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold">
          Withdraw
        </button>

      </div>

    </div>
  );
}