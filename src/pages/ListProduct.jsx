// dependencies
import { Container, Table } from "react-bootstrap";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/Api";
import { useNavigate } from "react-router-dom";
import Rupiah from "rupiah-format";

// componenet
import Navbar from "../components/navbar/navbar";
import ModalDelete from "../components/modal/ModalDelete";
import { useEffect } from "react";

export default function ListProduct() {
  // title
  const title = "Products";
  document.title = "Waysbeans | " + title;

  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Fatching product
  let { data: products, refetch } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  // update product
  const handleUpdate = (id) => {
    navigate("/update-product/" + id);
  };

  // delete product
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <Navbar />
      <Container className="tableContainer">
        <h1>List Product</h1>
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt="product"
                      className="productImagee"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.stock}</td>
                  <td className="tablePrice">{Rupiah.convert(item.price)}</td>
                  <td>{item.desc}</td>
                  <td>
                    <button
                      className="btnDelt"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btnEdt"
                      onClick={() => {
                        handleUpdate(item.id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <ModalDelete
          show={show}
          handleClose={handleClose}
          setConfirmDelete={setConfirmDelete}
        />
      </Container>
    </>
  );
}
