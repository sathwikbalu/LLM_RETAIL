// import { useState } from "react";
// import {
//   AiOutlineHome,
//   AiOutlineShopping,
//   AiOutlineLogin,
//   AiOutlineUserAdd,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { FaHeart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import "./Navigation.css";
// import { useSelector, useDispatch } from "react-redux";
// // import FavoritesCount from "../Products/FavoritesCount";

// const Navigation = () => {
//   const { userData } = useSelector((state) => state.auth);
//   // const { cartItems } = useSelector((state) => state.cart);

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     try {
//       // Send a request to the backend to log the user out
//       await axios.post("http://localhost:5000/api/users/logout");
//       // Remove the authentication token from cookies
//       Cookies.remove("token");
//       // Manually remove user data from the Redux store
//       dispatch({ type: "auth/logout" });
//       // Navigate the user to the login page
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <div
//       style={{ zIndex: 9999 }}
//       className={`${
//         showSidebar ? "hidden" : "flex"
//       } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
//       id="navigation-container"
//     >
//       <div className="flex flex-col justify-center space-y-4">
//         <Link
//           to="/"
//           className="flex items-center transition-transform transform hover:translate-x-2"
//         >
//           <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
//           <span className="hidden nav-item-name mt-[3rem]">HOME</span>
//         </Link>

//         <Link
//           to="/shop"
//           className="flex items-center transition-transform transform hover:translate-x-2"
//         >
//           <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
//           <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
//         </Link>

//         <Link to="/cart" className="flex relative">
//           <div className="flex items-center transition-transform transform hover:translate-x-2">
//             <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
//             <span className="hidden nav-item-name mt-[3rem]">Cart</span>
//           </div>

//           {/* <div className="absolute top-9">
//             {cartItems.length > 0 && (
//               <span>
//                 <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
//                   {cartItems.reduce((a, c) => a + c.qty, 0)}
//                 </span>
//               </span>
//             )}
//           </div> */}
//         </Link>

//         <Link to="/favorite" className="flex relative">
//           <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
//             <FaHeart className="mt-[3rem] mr-2" size={20} />
//             <span className="hidden nav-item-name mt-[3rem]">Favorites</span>
//             {/* <FavoritesCount /> */}
//           </div>
//         </Link>
//       </div>

//       <div className="relative">
//         <button
//           onClick={toggleDropdown}
//           className="flex items-center text-gray-800 focus:outline-none"
//         >
//           {userData ? (
//             <span className="text-white">{userData.username}</span>
//           ) : (
//             <></>
//           )}
//           {userData && (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`h-4 w-4 ml-1 ${
//                 dropdownOpen ? "transform rotate-180" : ""
//               }`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
//               />
//             </svg>
//           )}
//         </button>

//         {dropdownOpen && userData && (
//           <ul
//             className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
//               !userData.isAdmin ? "-top-20" : "-top-80"
//             }`}
//           >
//             {userData.isAdmin && (
//               <>
//                 <li>
//                   <Link
//                     to="/admin/dashboard"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/productlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Products
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/categorylist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Category
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/orderlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Orders
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/userlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Users
//                   </Link>
//                 </li>
//               </>
//             )}

//             <li>
//               <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                 Profile
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={logoutHandler}
//                 className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         )}
//         {!userData && (
//           <ul>
//             <li>
//               <Link
//                 to="/login"
//                 className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
//               >
//                 <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
//                 <span className="hidden nav-item-name">LOGIN</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/register"
//                 className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
//               >
//                 <AiOutlineUserAdd size={26} />
//                 <span className="hidden nav-item-name">REGISTER</span>
//               </Link>
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navigation;

import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";

const Navigation = () => {
  const { userData } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout");
      Cookies.remove("jwt");
      dispatch({ type: "auth/logout" });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">Favorites</span>
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userData ? (
            <span className="text-white">{userData.username}</span>
          ) : (
            <></>
          )}
          {userData && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userData && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userData.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userData.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}

        {!userData && (
          <div className="flex flex-col justify-center space-y-4">
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Sign In</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Register</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
