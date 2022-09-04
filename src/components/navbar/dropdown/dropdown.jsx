// dependencies
import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { UserContext } from "../../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

// files
import Photo from "../../../assets/Ellipse 1.png";
import Profile from "../../../assets/profile_waysbeens.png";
import AddProduct from "../../../assets/addBeens.png";
import Logout from "../../../assets/logout 1.png";

export default function Dropdown() {
  // logout
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <NavDropdown
      title={
        <img
          src={state?.user?.image}
          alt="photoProfile"
          className="navbarPhoto"
        />
      }
      className="navImg"
    >
      <NavDropdown.Item className={state.user.status === "admin" ? "fd" : ""}>
        <Link to="/profile" className="navbarItem navbarProfile">
          <img src={Profile} alt="profile" className="d-flex dropdown-img" />
          <p className="d-flex mb-0 dropCust tagProfile">Profile</p>
        </Link>
      </NavDropdown.Item>

      <NavDropdown.Item
        className={state.user.status === "admin" ? "mb-2 mt-2 ps-3" : "fd"}
      >
        <Link to="/add-product" className="navbarItem">
          <img
            src={AddProduct}
            alt="AddProduct"
            className="d-flex dropdown-img"
          />
          <p className="d-flex mb-0 ps-3 dropAdmin">Add Product</p>
        </Link>
      </NavDropdown.Item>
      <hr className={state.user.status === "admin" ? "hr" : "fd"} />

      <NavDropdown.Item
        className={state.user.status === "admin" ? "mb-2 mt-2 ps-3" : "fd"}
      >
        <Link to="/list-product" className="navbarItem">
          <img
            src={AddProduct}
            alt="list-product"
            className="d-flex dropdown-img navAddTopping"
          />
          <p className="d-flex ps-3 mb-0 dropAdmin ">List Product</p>
        </Link>
      </NavDropdown.Item>
      <hr className="hr" />
      <NavDropdown.Item onClick={logout}>
        <img src={Logout} alt="logout" className="d-flex dropdown-img" />
        <p className="d-flex mb-0 dropCust pe-4">Logout</p>
      </NavDropdown.Item>
    </NavDropdown>
  );
}
