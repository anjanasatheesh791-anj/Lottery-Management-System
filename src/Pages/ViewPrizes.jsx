import { useNavigate } from "react-router-dom";


export default function ViewPrizes() {
  const navigate = useNavigate();

  const prizes = [
    {
      title: "₹10,000 Cash Prize",
      category: "Cash Reward",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    },
    {
      title: "₹50,000 Cash Prize",
      category: "Cash Reward",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    },
    {
      title: "₹1,00,000 Grand Reward",
      category: "Cash Reward",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800",
    },
    {
      title: "Smart Watch",
      category: "Gift Reward",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    },
    {
      title: "Wireless Headphones",
      category: "Gift Reward",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    },
    {
      title: "Amazon Gift Voucher",
      category: "Gift Reward",
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800",
    },
    {
      title: "iPhone 16 Pro",
      category: "Luxury Reward",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    },
    {
      title: "MacBook Air",
      category: "Luxury Reward",
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",
    },
    {
      title: "Royal Enfield Classic 350",
      category: "Luxury Reward",
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/20 blur-3xl rounded-full"></div>

      {/* HERO */}
      <section className="relative text-center px-6 py-20">

        <div className="text-7xl mb-5 animate-bounce">
          🎁
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Prize <span className="text-purple-400">Gallery</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-8">
          Discover exciting rewards available through SpinVault contests.
          Win cash prizes, premium gifts, and luxury rewards.
        </p>

      </section>

      {/* CATEGORY BADGES */}

      <div className="flex flex-wrap justify-center gap-4 mb-14 px-6">

        <div className="bg-green-500/20 text-green-400 px-6 py-3 rounded-full font-semibold">
          💰 Cash Rewards
        </div>

        <div className="bg-blue-500/20 text-blue-400 px-6 py-3 rounded-full font-semibold">
          🎁 Gift Rewards
        </div>

        <div className="bg-yellow-500/20 text-yellow-400 px-6 py-3 rounded-full font-semibold">
          👑 Luxury Rewards
        </div>

      </div>

      {/* PRIZE GRID */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {prizes.map((prize, index) => (

            <div
              key={index}
              className="
                group
                bg-gray-900
                border
                border-gray-800
                rounded-3xl
                overflow-hidden
                hover:-translate-y-3
                hover:border-purple-500
                hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]
                duration-500
              "
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                <img
                  src={prize.image}
                  alt={prize.title}
                  className="
                    h-64
                    w-full
                    object-cover
                    group-hover:scale-110
                    duration-700
                  "
                />

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-2">
                  {prize.category}
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  {prize.title}
                </h2>

                <div className="flex items-center justify-between">

                  <span className="text-gray-400">
                    Featured Reward
                  </span>

                  <span className="text-2xl">
                    ⭐
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FUTURE REWARDS */}

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 text-center">

          <h2 className="text-4xl font-bold mb-6">
            🌟 Upcoming Mega Rewards
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-gray-950 p-6 rounded-2xl">
              🚗 Luxury Cars
            </div>

            <div className="bg-gray-950 p-6 rounded-2xl">
              ✈️ International Trips
            </div>

            <div className="bg-gray-950 p-6 rounded-2xl">
              🏠 Dream Homes
            </div>

            <div className="bg-gray-950 p-6 rounded-2xl">
              💎 Gold & Diamonds
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="text-center pb-20 px-6">

        <h2 className="text-4xl font-bold mb-4">
          Ready To Win?
        </h2>

        <p className="text-gray-400 mb-8">
          Join exciting contests and unlock amazing rewards.
        </p>

        <button
          onClick={() => navigate("/")}
          className="
            bg-purple-500
            hover:bg-purple-400
            text-black
            font-bold
            px-8
            py-4
            rounded-xl
            text-lg
            duration-300
          "
        >
          Back Home
        </button>

      </section>

    </div>
  );
}