import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers = async () => {

try {

  const response = await axios.get(
    "https://lottery-management-system-backend.onrender.com/api/get_all_users.php"
  );

  if (response.data.success) {
    setUsers(response.data.users);
  }

} catch (error) {

  console.log(error);

} finally {

  setLoading(false);

}


};

const handleCreatePoolRestriction = (user) => {
alert(`Restrict Create Pool for ${user.name}`);
};

const handleJoinPoolRestriction = (user) => {
alert(`Restrict Join Pool for ${user.name}`);
};

const handleBlockUser = (user) => {
alert(`Block User ${user.name}`);
};

const handleDeleteUser = (user) => {
alert(`Delete User ${user.name}`);
};

if (loading) {
return ( <div className="min-h-screen bg-gray-950 flex justify-center items-center"> <h1 className="text-white text-3xl font-bold">
Loading Users... </h1> </div>
);
}

return (


<div className="min-h-screen bg-gray-950 text-white">

  {/* HEADER */}

  <div className="mb-10">

    <h1 className="text-5xl font-bold text-purple-400 mb-3">
      Users Management
    </h1>

    <p className="text-gray-400 text-lg">
      Manage users and their platform permissions.
    </p>

  </div>

  {/* USERS TABLE */}

  <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b border-gray-800 text-left text-gray-400">

            <th className="pb-4">Name</th>
            <th className="pb-4">Email</th>
            <th className="pb-4">Phone</th>
            <th className="pb-4">Role</th>
            <th className="pb-4">Verified</th>
            <th className="pb-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b border-gray-800"
            >

              <td className="py-5 font-semibold">
                {user.name}
              </td>

              <td>
                {user.email}
              </td>

              <td>
                {user.phone}
              </td>

              <td>

                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>

              </td>

              <td>

                {user.is_verified == 1 ? (

                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Verified
                  </span>

                ) : (

                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    Not Verified
                  </span>

                )}

              </td>

              <td>

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={() =>
                      handleCreatePoolRestriction(user)
                    }
                    className="bg-blue-500 hover:bg-blue-400 text-black px-3 py-2 rounded-xl text-sm font-semibold"
                  >
                    Restrict Create
                  </button>

                  <button
                    onClick={() =>
                      handleJoinPoolRestriction(user)
                    }
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-2 rounded-xl text-sm font-semibold"
                  >
                    Restrict Join
                  </button>

                  <button
                    onClick={() =>
                      handleBlockUser(user)
                    }
                    className="bg-red-500 hover:bg-red-400 text-black px-3 py-2 rounded-xl text-sm font-semibold"
                  >
                    Block
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteUser(user)
                    }
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-xl text-sm font-semibold"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

</div>

);

}
