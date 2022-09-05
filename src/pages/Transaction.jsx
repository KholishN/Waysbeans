// dependencies
import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import Rupiah from "rupiah-format";

// component
import ModalTransaction from "../components/modal/ModalTransaction";
import Navbar from "../components/navbar/navbar";
import { API } from "../config/Api";

export default function Transaction() {
  // title
  const title = "Transactions";
  document.title = "Waysbeans | " + title;

  // modal
  const [showTrans, setShowTrans] = useState(false);
  const [idOrder, setIdOrder] = useState(null);

  const handleShow = (id) => {
    setIdOrder(id);
    setShowTrans(true);
  };
  const handleClose = () => setShowTrans(false);

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  console.log(transactions);

  return (
    <>
      <Navbar />
      <Container className="tableContainer">
        <h1>Income Transaction</h1>
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr onClick={() => handleShow(item.id)} key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.user?.name}</td>
                  <td>{item?.user?.address}</td>
                  <td>{item?.user?.postal_code}</td>
                  <td className="tablePrice">{Rupiah.convert(item?.total)}</td>
                  <td
                    className={
                      item?.status === "Success"
                        ? "tableSuccess"
                        : item?.status === "Cancel"
                        ? "tableCancel"
                        : item?.status === "Pending"
                        ? "tableWaiting"
                        : "tableOtw"
                    }
                  >
                    {item?.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* <ModalTransaction
          showTrans={showTrans}
          close={handleClose}
          id={idOrder}
        /> */}
      </Container>
    </>
  );
}
