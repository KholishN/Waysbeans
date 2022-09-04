import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/Api";

// component
import Navbar from "../components/navbar/navbar";

// file
import paperClip from "../assets/paper_waybeens.png";
import { useEffect } from "react";

export default function UpdateProduct() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
    stock: "",
    desc: "",
  }); //Store data product

  // fetching old data
  let { data: products } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      setPreviewName(products.image.slice(30));
      setForm({
        ...form,
        title: products.title,
        desc: products.desc,
        price: products.price,
        stock: products.stock,
      });
      setProduct(products);
    }
  }, [products]);

  //   handlechange
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
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("title", form.title);
      formData.set("price", form.price);
      formData.set("stock", form.stock);
      formData.set("desc", form.desc);

      // Insert category data
      await API.patch("/product/" + product.id, formData, config);

      navigate("/transaction");
    } catch (error) {
      console.log(error);
    }
  });

  console.log(form);
  return (
    <>
      <Navbar />
      <Container className="addProductContainer">
        <div className="addProductLeft">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h1>Update Product</h1>
            <input
              type="text"
              placeholder="Name"
              name="title"
              onChange={handleChange}
              value={form.title}
            />
            <input
              type="number"
              placeholder="Stock"
              className="price"
              name="stock"
              onChange={handleChange}
              value={form.stock}
            />
            <input
              type="number"
              placeholder="Price"
              className="price"
              name="price"
              onChange={handleChange}
              value={form.price}
            />
            <textarea
              placeholder="Description Product"
              name="desc"
              className="desc"
              onChange={handleChange}
              value={form.desc}
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
            <button>Update Product</button>
          </form>
        </div>
        {preview && (
          <div className="addProductRight">
            <img src={preview} alt="preview" />
          </div>
        )}
      </Container>
    </>
  );
}
