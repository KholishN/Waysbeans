// dependencies
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useMutation } from "react-query";
import { API } from "../../config/Api";
import paperClip from "../../assets/paper_waybeens.png";

export default function ModalAuth({ show, setShow }) {
  // modal-check
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [shows, setShows] = useState(false);
  const handleShows = () => setShows(true);
  const handleCloses = () => setShows(false);
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");

  const handleSwitchRegister = () => {
    setShow(false);
    setShows(true);
  };

  const handleSwitchLogin = () => {
    setShows(false);
    setShow(true);
  };

  // auth
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setShow(false);
    } catch (error) {
      console.log(error);
    }
  });

  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    postal_code: "",
    image: "",
  });

  const handleChangeRegister = (e) => {
    setRegister({
      ...register,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  const handleSubmitRegister = useMutation(async (e) => {
    e.preventDefault();

    // Configuration Content-type
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set("image", register.image[0], register.image[0].name);
    formData.set("name", register.name);
    formData.set("email", register.email);
    formData.set("address", register.address);
    formData.set("postal_code", register.postal_code);
    formData.set("password", register.password);

    // Insert data user to database
    const response = await API.post("/register", formData, config);

    // Handling response here
    setShows(false);
  });

  return (
    <>
      <>
        <button className="btnNavbar login" onClick={handleShow}>
          Login
        </button>
        <Modal show={show} onHide={handleClose} className="mt-5">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="authContainer">
              <h1 className="authTitle">Login</h1>
              <input
                type="email"
                className="inputAuth p-2"
                placeholder="Email"
                name="email"
                id="email"
                onChange={handleChange}
              />
              <input
                type="password"
                className="inputAuth p-2"
                placeholder="Password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <button className="btnAuth">Login</button>
              <p className="toRegist">
                Don't have an account ? Click{" "}
                <strong onClick={handleSwitchRegister}>Here</strong>
              </p>
            </div>
          </form>
        </Modal>
      </>

      <>
        <button className="btnNavbar register" onClick={handleShows}>
          Register
        </button>
        <Modal show={shows} onHide={handleCloses} id="modalRegister">
          <form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
            <div className="authContainer">
              <h1 className="authTitle">Register</h1>
              <input
                type="email"
                className="inputAuth p-2"
                placeholder="Email"
                name="email"
                onChange={handleChangeRegister}
              />
              <input
                type="password"
                className="inputAuth p-2"
                placeholder="Password"
                name="password"
                onChange={handleChangeRegister}
              />
              <input
                type="text"
                className="inputAuth p-2"
                placeholder="Full Name"
                name="name"
                onChange={handleChangeRegister}
              />
              <input
                type="text"
                className="inputAuth p-2"
                placeholder="Address"
                name="address"
                onChange={handleChangeRegister}
              />
              <input
                type="number"
                className="inputAuth p-2"
                placeholder="Postal Code"
                name="postal_code"
                onChange={handleChangeRegister}
              />
              <input
                type="file"
                id="addProductImage"
                hidden
                className="photoProduct"
                name="image"
                onChange={handleChangeRegister}
              />
              <label
                htmlFor="addProductImage"
                className={
                  previewName === "" ? "addProductImagee" : "previewNamee"
                }
              >
                {previewName === "" ? "Photo Profile" : previewName}
                <img src={paperClip} alt="paperClip" />
              </label>
              <button className="btnAuth" type="submit">
                Register
              </button>
              <p className="toRegist">
                Already have an account ? Click{" "}
                <strong onClick={handleSwitchLogin}>Here</strong>
              </p>
            </div>
          </form>
        </Modal>
      </>
    </>
  );
}
