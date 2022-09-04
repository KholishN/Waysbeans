// dependencies
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/Api";

// component
import Navbar from "../components/navbar/navbar";

// file
import paperClip from "../assets/paper_waybeens.png";

// componnents
import ModalAddproduct from "../components/modal/ModalAddproduct";

export default function AddProduct() {
  // title
  const title = "Add Product";
  document.title = "Waysbeans | " + title;

  let navigate = useNavigate();
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate("/list-product");
  };

  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
    stock: "",
    desc: "",
  }); //Store data product

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);
      formData.set("stock", form.stock);
      formData.set("desc", form.desc);

      // Insert category data
      await API.post("/product", formData, config);

      setShow(true);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbar />
      <Container className="addProductContainer">
        <div className="addProductLeft">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h1>Add Product</h1>
            <input
              type="text"
              placeholder="Name"
              name="title"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Stock"
              className="price"
              name="stock"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price"
              className="price"
              name="price"
              onChange={handleChange}
            />
            <textarea
              placeholder="Description Product"
              name="desc"
              className="desc"
              onChange={handleChange}
            />
            <input
              type="file"
              id="addProductImage"
              hidden
              className="photoProduct"
              name="image"
              onChange={handleChange}
            />
            <label
              htmlFor="addProductImage"
              className={previewName === "" ? "addProductImage" : "previewName"}
            >
              {previewName === "" ? "Photo Product" : previewName}
              <img src={paperClip} alt="paperClip" />
            </label>
            <button>Add Product</button>
          </form>
        </div>
        {preview && (
          <div className="addProductRight">
            <img src={preview} alt="preview" />
          </div>
        )}
      </Container>
      <ModalAddproduct handleClose={handleClose} show={show} />
    </>
  );
}
