// dependencies
import React from "react";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import Rupiah from "rupiah-format";

// logo
import Logo from "../../assets/Logo.svg";

// fakedata
let dummyTransaction;

export default function ModalTransaction({ showTrans, close, id }) {
  let productt = dummyTransaction[id - 1];

  return (
    <Modal show={showTrans} onHide={close} className="modal-transaction">
      <div className="profileCard">
        <div className="contentCardLeft">
          {productt?.product?.map((item, index) => (
            <div className="mapContent" key={index}>
              <img src={item.productImg} alt="coffee" />
              <ul>
                <li className="profileCardTitle">{item.productName}</li>
                <li className="profileCardDate">
                  <strong>Saturday</strong>,20 Oktober 2022
                </li>
                <li className="profileCardToping">
                  <strong>Toping :</strong>
                </li>
                <li className="profileCardPrice">
                  Price: {Rupiah.convert(item.price)}
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div
          className={
            productt?.status === "Success"
              ? "contentCardRight Success"
              : productt?.status === "Cancel"
              ? "contentCardRight Cancel"
              : "contentCardRight Otw"
          }
        >
          <img src={Logo} alt="logo" />
          <QRCode value="test" bgColor="transparent" size={80} />
          <span>
            <p>{productt?.status}</p>
          </span>
          <p className="profileSubTotal">Sub Total : Rp.69.000</p>
        </div>
      </div>
    </Modal>
  );
}
