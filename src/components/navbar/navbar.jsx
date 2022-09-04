// dependencies
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { API } from "../../config/Api";

// components
import Dropdown from "./dropdown/dropdown";
import ModalAuth from "../modal/ModalAuth";

// files
import Logo from "../../assets/logo_waysbeans.svg";
import Cart from "../../assets/cart_waysbeens.png";
import { useState } from "react";

export default function Navbar({ counter, setShow, show }) {
  const [bubble, setBubble] = useState([]);
  const [state] = useContext(UserContext);
  const isLogin = state.isLogin;

  useEffect(() => {
    API.get("/carts-id")
      .then((res) => {
        setBubble(res.data.data);
      })
      .catch((err) => console.log("error", err));
  });

  return (
    <nav>
      <div>
        <Link to={state?.user?.status === "customer" ? "/" : "/transaction"}>
          <img src={Logo} alt="Logo" className="navbarLogo" />
        </Link>
      </div>
      {isLogin ? (
        <div className="navbarRight">
          <div
            className={
              bubble === undefined
                ? "d-none"
                : bubble?.length === 0
                ? "d-none"
                : "circle"
            }
          >
            {bubble?.length}
          </div>
          <Link to={"/cart"}>
            <img
              src={Cart}
              alt="cart"
              className={
                state.user.status === "customer" ? "navbarCart" : "d-none"
              }
            />
          </Link>
          <Dropdown />
        </div>
      ) : (
        <div className="navbarLeft">
          <ModalAuth show={show} setShow={setShow} />
        </div>
      )}
    </nav>
  );
}
