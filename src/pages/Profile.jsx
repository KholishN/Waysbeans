// dependencies
import React from "react";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useQuery } from "react-query";

// file
import PhotoProfile from "../assets/Ellipse 1.png";
import Logo from "../assets/logo_waysbeans.svg";

// component
import Navbar from "../components/navbar/navbar";
import { API } from "../config/Api";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const [state] = useContext(UserContext);
  console.log(state);
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/user-transaction");
    return response.data.data;
  });
  return (
    <>
      <Navbar />
      <Container className="profileContainer">
        <div className="profileLeft">
          <h1>My Profile</h1>
          <div className="biodata">
            <img src={state?.user?.image} alt="Profile" />
            <ul>
              <li className="biodataTitle">Full Name</li>
              <li className="biodataContent">{state?.user?.name}</li>
              <li className="biodataTitle">Email</li>
              <li className="biodataContent">{state.user.email}</li>
              <li className="biodataTitle">Postal Code</li>
              <li className="biodataContent">{state.user.postal_code}</li>
              <li className="biodataTitle">Address</li>
              <li className="biodataContent">{state.user.address}</li>
            </ul>
          </div>
        </div>
        <div className="profileRight">
          <h1>My Transaction</h1>
          {transactions?.map((item, index) => (
            <div className="profileCard mb-3" key={index}>
              <div className="contentCardLeft">
                {item?.product?.map((data, idx) => (
                  <div className="mapContent" key={idx}>
                    <img
                      src={
                        "http://localhost:5000/uploads/" + data?.product?.image
                      }
                      alt="coffee"
                    />
                    <ul>
                      <li className="profileCardTitle">
                        {data?.product?.title}
                      </li>
                      <li className="profileCardDate">
                        <strong>Saturday</strong>,20 Oktober 2022
                      </li>
                      <li className="profileCardToping">Qty: {data?.qty}</li>
                      <li className="profileCardPrice">
                        Price: {data?.product?.price}
                      </li>
                      <li className="profileCardToping">
                        <strong>
                          Sub Total : {data?.qty * data?.product?.price}
                        </strong>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div
                className={
                  "Success"
                    ? "contentCardRight Success"
                    : "Cancel"
                    ? "contentCardRight Cancel"
                    : "contentCardRight Otw"
                }
              >
                <img src={Logo} alt="logo" />

                <QRCode value="git re" bgColor="transparent" size={80} />
                <span>
                  <p>{item?.status}</p>
                </span>
                <p className="profileSubTotal">Total : {item?.total}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
