import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";

function Header() {
//   const auth = useSelector((state) => state.auth);

//   const { user, isLogged } = auth;

//   const handleLogout = async () => {
//     try {
//       await axios.get("/user/logout");
//       localStorage.removeItem("firstLogin");
//       window.location.href = "/";
//     } catch (err) {
//       window.location.href = "/";
//     }
//   };

//   const userLink = () => {
//     return (
//       <li className="drop-nav">
//         <Link to="#" className="avatar">
//           <img src={user.avatar} alt="" /> {user.name}{" "}
//           <i className="fas fa-angle-down"></i>
//         </Link>
//         <ul className="dropdown">
//           <li>
//             <Link to="/profile">Profile</Link>
//           </li>
//           <li>
//             <Link to="/" onClick={handleLogout}>
//               Logout
//             </Link>
//           </li>
//         </ul>
//       </li>
//     );
//   };

//   const transForm = {
//     transform: isLogged ? "translateY(-5px)" : 0,
//   };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Fudokueseto</Link>
        </h1>
      </div>
        <ul className="navbar__links">
          <li>
            <Link to="/" className="navbarLink">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbarLink">
              ABOUT
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbarLink">
              CONTACT
            </Link>
          </li>
          <li>
            <Link to="/login">
              <i className="fas fa-user"></i> Sign in
            </Link>
          </li>
        </ul>
      {/* <ul style={transForm}>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
        </li>
        {isLogged ? (
          userLink()
        ) : (

        )}
      </ul>
      <div className="hamburger__menu" onClick ={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>  */}
    </header>
  );
}
export default Header;
