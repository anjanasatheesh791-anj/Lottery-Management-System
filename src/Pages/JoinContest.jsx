import { useParams } from "react-router-dom";

export default function JoinContest() {

  const { id } = useParams();

  return (

    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center px-6">

      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 max-w-xl w-full text-center">

        <h1 className="text-5xl font-bold text-purple-400 mb-6">
          Join Contest
        </h1>

        <p className="text-xl text-gray-300 mb-4">
          Contest ID: {id}
        </p>

        <p className="text-gray-400 mb-8">
          User scanned QR code successfully.
        </p>

        <button className="w-full bg-purple-500 hover:bg-purple-400 duration-300 text-black font-bold py-4 rounded-xl text-lg">

          Join Now

        </button>

      </div>

    </div>

  );

}