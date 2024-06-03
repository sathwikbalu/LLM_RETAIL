// import { useEffect, useState } from "react";
// import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Message from "../../components/Message.jsx";
// import Loader from "../../Components/Loader.jsx";
// // ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
// // import AdminMenu from "./AdminMenu";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.message || error.message;
//     return Promise.reject({ message });
//   }
// );

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [editableUserId, setEditableUserId] = useState(null);
//   const [editableUserName, setEditableUserName] = useState("");
//   const [editableUserEmail, setEditableUserEmail] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setIsLoading(true);
//       try {
//         const { data } = await axiosInstance.get("/users");
//         setUsers(data);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const deleteHandler = async (id) => {
//     if (window.confirm("Are you sure")) {
//       try {
//         await axiosInstance.delete(`/users/${id}`);
//         setUsers(users.filter((user) => user._id !== id));
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   const toggleEdit = (id, username, email) => {
//     setEditableUserId(id);
//     setEditableUserName(username);
//     setEditableUserEmail(email);
//   };

//   const updateHandler = async (id) => {
//     try {
//       await axiosInstance.put(`/users/${id}`, {
//         username: editableUserName,
//         email: editableUserEmail,
//       });
//       setUsers(
//         users.map((user) =>
//           user._id === id
//             ? { ...user, username: editableUserName, email: editableUserEmail }
//             : user
//         )
//       );
//       setEditableUserId(null);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-4 text-center">Users</h1>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <div className="flex flex-col md:flex-row">
//           {/* <AdminMenu /> */}
//           <table className="w-full md:w-4/5 mx-auto">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-white text-left">ID</th>
//                 <th className="px-4 py-2 text-white text-left">NAME</th>
//                 <th className="px-4 py-2 text-white text-left">EMAIL</th>
//                 <th className="px-4 py-2 text-white text-left">ADMIN</th>
//                 <th className="px-4 py-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user._id}>
//                   <td className="px-4 py-2 text-white">{user._id}</td>
//                   <td className="px-4 py-2">
//                     {editableUserId === user._id ? (
//                       <div className="flex items-center">
//                         <input
//                           type="text"
//                           value={editableUserName}
//                           onChange={(e) => setEditableUserName(e.target.value)}
//                           className="w-full p-2 border rounded-lg"
//                         />
//                         <button
//                           onClick={() => updateHandler(user._id)}
//                           className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
//                         >
//                           <FaCheck />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center text-white">
//                         {user.username}{" "}
//                         <button
//                           onClick={() =>
//                             toggleEdit(user._id, user.username, user.email)
//                           }
//                         >
//                           <FaEdit className="ml-[1rem]" />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-2">
//                     {editableUserId === user._id ? (
//                       <div className="flex items-center">
//                         <input
//                           type="text"
//                           value={editableUserEmail}
//                           onChange={(e) => setEditableUserEmail(e.target.value)}
//                           className="w-full p-2 border rounded-lg"
//                         />
//                         <button
//                           onClick={() => updateHandler(user._id)}
//                           className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
//                         >
//                           <FaCheck />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center text-white">
//                         <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
//                         <button
//                           onClick={() =>
//                             toggleEdit(user._id, user.username, user.email)
//                           }
//                         >
//                           <FaEdit className="ml-[1rem]" />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-2">
//                     {user.isAdmin ? (
//                       <FaCheck style={{ color: "green" }} />
//                     ) : (
//                       <FaTimes style={{ color: "red" }} />
//                     )}
//                   </td>
//                   <td className="px-4 py-2">
//                     {!user.isAdmin && (
//                       <div className="flex">
//                         <button
//                           onClick={() => deleteHandler(user._id)}
//                           className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;

import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Message from "../../Components/Message"; // Ensure this path is correct
import Loader from "../../Components/Loader"; // Ensure this path is correct
import Cookies from "js-cookie";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get("jwt");

        const { data } = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `${token}`,
          },
        }); // Adjust the URL to match your API endpoint
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        const token = Cookies.get("jwt");
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        }); // Adjust the URL to match your API endpoint
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      const token = Cookies.get("jwt");
      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        {
          username: editableUserName,
          email: editableUserEmail,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      ); // Adjust the URL to match your API endpoint
      setUsers(
        users.map((user) =>
          user._id === id
            ? { ...user, username: editableUserName, email: editableUserEmail }
            : user
        )
      );
      toast.success("Updated Successfully");
      setEditableUserId(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white text-left">ID</th>
                <th className="px-4 py-2 text-white text-left">NAME</th>
                <th className="px-4 py-2 text-white text-left">EMAIL</th>
                <th className="px-4 py-2 text-white text-left">ADMIN</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 text-white">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center text-white">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center text-white">
                        <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
