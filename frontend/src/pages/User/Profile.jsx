import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setCredentials } from "../../redux/features/authSlice";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(userData.username);
    setEmail(userData.email);
  }, [userData.email, userData.username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      setLoadingUpdateProfile(true);
      try {
        const token = Cookies.get("jwt");

        const res = await axios.put(
          `http://localhost:5000/api/users/profile`,
          {
            _id: userData._id,
            username,
            email,
            password,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        dispatch(setCredentials({ ...res.data }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
      } finally {
        setLoadingUpdateProfile(false);
      }
    }
  };

  // useEffect(() => {
  //   if (userData) {
  //     const userData = JSON.parse(Data);
  //     setUsername(userData.username);
  //     setEmail(userData.email);
  //     setId(userData._id);
  //   }
  // }, [userData]);

  // const submitHandler = async (eve) => {
  //   eve.preventDefault();
  //   if (pwd != confirmPwd) {
  //     toast.error("Password did not match");
  //   }
  //   const data = {
  //     _id: id,
  //     username,
  //     email,
  //     password: pwd,
  //   };
  //   try {
  //     const token = Cookies.get("jwt");
  //     await axios.put("http://localhost:5000/api/users/profile", data, {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     });

  //     toast.success("Profile Updated Successfully"), console.log(res);
  //   } catch {
  //     (e) => {
  //       toast.error(e);
  //       console.log(e);
  //     };
  //   }

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl text-white font-semibold mb-4">
            Update Profile
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                disabled={loadingUpdateProfile}
              >
                {loadingUpdateProfile ? "Updating..." : "Update"}
              </button>

              <Link
                to="/user-orders"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// const Profile = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [pwd, setPwd] = useState("");
//   const [confirmPwd, setConfirmPwd] = useState("");

//   useEffect(() => {
//     const Data = localStorage.getItem("userData");
//     if (Data) {
//       const userData = JSON.parse(Data);
//       setUsername(userData.username);
//       setEmail(userData.email);
//     }
//   }, []);

//   const submitHandler = async () => {
//     if (pwd != confirmPwd) {
//       toast.error("Password did not match");
//       console.log("pondu");
//     }
//     const data = {
//       username,
//       email,
//       password: pwd,
//     };
//     const res = await axios
//       .put("http://localhost:5000/api/users/profile", data)
//       .then(toast.success("Profile Updated Successfully"), console.log(res))
//       .catch((e) => {
//         toast.error(e);
//         console.log(e);
//       });
//   };

//   return (
//     <div className="container mx-auto p-4 mt-[10rem]">
//       <div className="flex justify-center align-center md:flex md:space-x-4">
//         <div className="md:w-1/3">
//           <h2 className="text-white text-2xl font-semibold mb-4">
//             Update Profile
//           </h2>
//           <form onSubmit={submitHandler}>
//             <div className="mb-4">
//               <label className="block text-white mb-2">Username</label>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 className="form-input p-4 rounded-sm w-full"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <label className="block text-white mb-2">Email</label>
//               <input
//                 type="email"
//                 placeholder="email"
//                 className="form-input p-4 rounded-sm w-full"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label className="block text-white mb-2">Password</label>
//               <input
//                 type="password"
//                 placeholder="password"
//                 className="form-input p-4 rounded-sm w-full"
//                 value={pwd}
//                 onChange={(e) => setPwd(e.target.value)}
//               />
//               <label className="block text-white mb-2">Confirm Password</label>
//               <input
//                 type="password"
//                 placeholder="confirm password"
//                 className="form-input p-4 rounded-sm w-full"
//                 value={confirmPwd}
//                 onChange={(e) => setConfirmPwd(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-4 w-full"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
