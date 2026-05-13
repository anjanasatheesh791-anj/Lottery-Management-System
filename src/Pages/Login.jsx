import { Link } from "react-router-dom"
import { useState } from "react"
export default function Login()
{
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

return(
<div
className="min-h-screen bg-cover bg-center flex justify-center items-center px-6 relative"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop')"
}}
>
{/* DARK BLUR OVERLAY */}
<div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

<div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl w-full max-w-md shadow-2xl">

<h1 className="text-white text-4xl font-bold text-center mb-8">
Login
</h1>

<input
type="email"
placeholder="Enter email"
className="w-full mb-5 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<input 
type="password"
placeholder="Enter password"
className="w-full mb-6 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>

<div className="flex items-center mb-6">

  <input
    type="checkbox"
    id="remember"
    className="w-4 h-4 accent-purple-500 cursor-pointer"
  />

  <label
    htmlFor="remember"
    className="ml-3 text-gray-300 cursor-pointer"
  >
    Remember Me
  </label>

</div>


<div className="flex justify-end mb-6">

  <Link
    to="/forgotpassword"
    className="text-sm text-purple-400 hover:text-purple-300 duration-300"
  >
    Forgot Password?
  </Link>

</div>

<button
className="w-full bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-3 rounded-xl"
>
  Login
</button>

<p className="text-center text-gray-300 mt-6">

  Don’t have an account?{" "}

 <Link to="/signup">   
  <span className="text-purple-400 hover:text-purple-300 cursor-pointer font-semibold">
    Signup
  </span>
  </Link>

</p>
</div>
</div>
)
}

