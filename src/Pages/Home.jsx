import { Link } from "react-router-dom"
export default function Home() {
  return (
<div className="min-h-screen bg-gray-950 text-white">

{/* NAVBAR */}
<nav className="flex justify-between items-center px-8 py-5 bg-gray-900 border-b border-gray-800">
<h1 className="text-3xl font-bold text-purple-400">
SpinVault
</h1>

<ul className="hidden md:flex gap-8 text-lg">
<li className="hover:text-teal-400 cursor-pointer duration-300">Home</li>
<li className="hover:text-teal-400 cursor-pointer duration-300">Games</li>
<li className="hover:text-teal-400 cursor-pointer duration-300">Winners</li>
<li className="hover:text-teal-400 cursor-pointer duration-300">Contact</li>
</ul>

<div className="flex gap-4">

  <Link to="/AdminDashboard">

    <button className="bg-teal-400 text-black px-5 py-2 rounded-lg font-semibold">
      Admin
    </button>

  </Link>


  <Link to="/login">

    <button className="bg-purple-500 text-black px-5 py-2 rounded-lg font-semibold">
      Login
    </button>

  </Link>

</div>

</nav>




{/* HERO SECTION */}
<section className="px-8 py-20">

<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

{/* LEFT SIDE */}
<div>

<p className="text-teal-400 text-lg font-semibold mb-4">
Online Lottery Platform
</p>

<h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
Spin Into Fortune
</h1>

<p className="text-gray-300 text-lg leading-8 mb-8">
Experience exciting lottery spins, instant rewards, and luckywinning moments all in one modern online platform.
</p>


{/* BUTTONS */}
<div className="flex gap-5 mb-10">

<button className="bg-purple-500 text-black px-7 py-3 rounded-xl text-lg font-semibold hover:bg-purple-400 duration-300">
Start Spinning
</button>

<button className="border border-teal-400 px-7 py-3 rounded-xl text-lg hover:bg-teal-400 hover:text-black duration-300">
View Prizes
</button>

</div>


{/* STATS */}
<div className="flex gap-6 flex-wrap">

<div className="bg-gray-900 p-5 rounded-2xl w-36 text-center border border-gray-800">
<h2 className="text-3xl font-bold text-purple-400">10K+</h2>
<p className="text-gray-400 mt-2">Players</p>
</div>

<div className="bg-gray-900 p-5 rounded-2xl w-36 text-center border border-gray-800">
<h2 className="text-3xl font-bold text-teal-400">₹5L+</h2>
<p className="text-gray-400 mt-2">Rewards</p>
</div>

<div className="bg-gray-900 p-5 rounded-2xl w-36 text-center border border-gray-800">
<h2 className="text-3xl font-bold text-purple-400">24/7</h2>
<p className="text-gray-400 mt-2">Live Games</p>
</div>

</div>

</div>


{/* RIGHT SIDE */}
<div className="flex justify-center">

<div className="relative">

{/* IMAGE */}
<img
src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1200&auto=format&fit=crop"
alt="Lottery Winner"
className="w-[420px] h-[420px] object-cover rounded-3xl border border-gray-700 shadow-2xl"
/>


{/* WINNER CARD */}
<div className="absolute top-5 -left-10 bg-gray-900 border border-gray-700 px-5 py-4 rounded-xl">
<p className="text-gray-400 text-sm">Today's Winner</p>
<h2 className="text-2xl font-bold text-teal-400">₹15,000</h2>
</div>


{/* LIVE PLAYERS */}
<div className="absolute bottom-5 -right-10 bg-gray-900 border border-gray-700 px-5 py-4 rounded-xl">
<p className="text-gray-400 text-sm">Live Players</p>
<h2 className="text-2xl font-bold text-purple-400">1,250</h2>
</div>

</div>

</div>

</div>

</section>


{/* WHY CHOOSE SECTION */}
<section className="px-8 pb-20">

<div className="text-center mb-14">

<h2 className="text-4xl font-bold mb-4">
Why Choose <span className="text-purple-400">SpinVault?</span>
</h2>

<p className="text-gray-400 text-lg">
Enjoy a secure and exciting lottery experience with amazing rewards.
</p>

</div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

{/* CARD 1 */}
<div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:-translate-y-2 duration-300">

<div className="text-5xl mb-5">🎯</div>

<h3 className="text-2xl font-bold mb-4 text-purple-400">
Fair Games
</h3>

<p className="text-gray-400 leading-7">
Transparent lottery system with equal winning chances for every player.
</p>

</div>


{/* CARD 2 */}
<div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:-translate-y-2 duration-300">

<div className="text-5xl mb-5">⚡</div>

<h3 className="text-2xl font-bold mb-4 text-teal-400">
Instant Results
</h3>

<p className="text-gray-400 leading-7">
Get fast spin results and instant reward announcements.
</p>

</div>


{/* CARD 3 */}
<div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:-translate-y-2 duration-300">

<div className="text-5xl mb-5">🏆</div>

<h3 className="text-2xl font-bold mb-4 text-purple-400">
Big Rewards
</h3>

<p className="text-gray-400 leading-7">
Participate in games and win exciting cash prizes daily.
</p>

</div>


{/* CARD 4 */}
<div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:-translate-y-2 duration-300">

<div className="text-5xl mb-5">🔒</div>
<h3 className="text-2xl font-bold mb-4 text-teal-400">
Secure Platform
</h3>

<p className="text-gray-400 leading-7">
Safe user accounts and secure online transactions.
</p>

</div>

</div>

</section>



{/* FAQ SECTION */}
<section className="px-8 pb-20">

  <div className="text-center mb-14">

    <h2 className="text-4xl font-bold mb-4">
      Frequently Asked Questions
    </h2>

    <p className="text-gray-400 text-lg">
      Everything you need to know about SpinVault.
    </p>

  </div>


  <div className="max-w-4xl mx-auto space-y-6">

    {/* FAQ 1 */}
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">

      <h3 className="text-2xl font-semibold text-purple-400 mb-3">
        How do I start playing?
      </h3>

      <p className="text-gray-400 leading-7">
        Create an account, login, and start participating in live lottery games instantly.
      </p>

    </div>


    {/* FAQ 2 */}
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">

      <h3 className="text-2xl font-semibold text-teal-400 mb-3">
        Is SpinVault secure?
      </h3>

      <p className="text-gray-400 leading-7">
        Yes, all user data and transactions are protected with secure systems.
      </p>

    </div>


    {/* FAQ 3 */}
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">

      <h3 className="text-2xl font-semibold text-purple-400 mb-3">
        How are winners selected?
      </h3>

      <p className="text-gray-400 leading-7">
        Winners are selected through a transparent and fair random lottery system.
      </p>

    </div>


    {/* FAQ 4 */}
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">

      <h3 className="text-2xl font-semibold text-teal-400 mb-3">
        Can I play anytime?
      </h3>

      <p className="text-gray-400 leading-7">
        Yes, SpinVault offers live games and lottery events 24/7.
      </p>
</div>
</div>
</section>


{/* FOOTER */}
<footer className="bg-gray-900 border-t border-gray-800 px-8 py-10">

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* LEFT */}
    <div>

      <h2 className="text-3xl font-bold text-purple-400 mb-4">
        SpinVault
      </h2>

      <p className="text-gray-400 leading-7">
        Experience secure online lottery games, exciting rewards,
        and fair winning opportunities anytime.
      </p>

    </div>


    {/* QUICK LINKS */}
    <div>

      <h3 className="text-2xl font-semibold text-white mb-4">
        Quick Links
      </h3>

      <ul className="space-y-3 text-gray-400">

        <li className="hover:text-purple-400 cursor-pointer duration-300">
          Home
        </li>

        <li className="hover:text-purple-400 cursor-pointer duration-300">
          Games
        </li>

        <li className="hover:text-purple-400 cursor-pointer duration-300">
          Winners
        </li>

        <li className="hover:text-purple-400 cursor-pointer duration-300">
          Contact
        </li>

      </ul>

    </div>


    {/* CONTACT */}
    <div>

      <h3 className="text-2xl font-semibold text-white mb-4">
        Contact
      </h3>

      <p className="text-gray-400 mb-3">
        support@spinvault.com
      </p>

      <p className="text-gray-400 mb-3">
        +91 9585632145
      </p>

      <p className="text-gray-400">
        Kerala, India
      </p>

    </div>

  </div>


  {/* BOTTOM */}
  <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">

    © 2026 SpinVault. All Rights Reserved.

  </div>

</footer>
  </div>
)
}
