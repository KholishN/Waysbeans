// dependencies
import React, { useState } from "react";
import Rupiah from "rupiah-format";

// style
import cartModules from "../styles/cart.module.css";

// file
import trash from "../assets/bin_waybeens.png";

// component
import ModalCart from "../components/modal/modalCart";
import Navbar from "../components/navbar/navbar";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/Api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  // title
  const title = "Cart";
  document.title = "Waysbeans | " + title;

  const navigate = useNavigate;
  // modal
  const [showTrans, setShowTrans] = useState(false);
  const handleClose = () => setShowTrans(false);

  // cart
  let { data: cart, refetch } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts-id");
    return response.data.data;
  });

  // subtotal
  let resultTotal = cart?.reduce((a, b) => {
    return a + b.qty * b.subtotal;
  }, 0);

  // qty
  let resultQty = cart?.reduce((a, b) => {
    return a + b.qty;
  }, 0);

  // remove
  let handleDelete = async (id) => {
    await API.delete(`/cart/` + id);
    refetch();
  };

  // update
  const increaseCart = async (idProduct) => {
    try {
      const result = cart.find(({ id }) => id === idProduct);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Basic " + localStorage.token,
        },
      };

      const body = JSON.stringify({
        qty: result.qty + 1,
      });

      await API.patch("/cart/" + idProduct, body, config);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCart = async (idProduct) => {
    try {
      const result = cart.find(({ id }) => id === idProduct);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Basic " + localStorage.token,
        },
      };

      const body = JSON.stringify({
        qty: result.qty - 1,
      });

      await API.patch("/cart/" + idProduct, body, config);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // pay midtrans
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // handlebuy

  const form = {
    total: resultTotal,
  };
  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(form);
    const response = await API.post("/transaction", body, config);
    const token = response.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        console.log(result);
      },
      onClose: function () {
        alert("you closed the popup without finishing the payment");
      },
    });
    await API.patch("/cart", body, config);
  });

  return (
    <>
      <Navbar />
      <div className={cartModules.container}>
        <section>
          <p className={cartModules.titlePage}>My Cart</p>
          <p className={cartModules.subtitlePage}>Review Your Order</p>
          <div className={cartModules.wrap}>
            <div className={cartModules.wrap}>
              {/*  */}
              <div className={cartModules.left}>
                {cart?.map((item, index) => (
                  <div className={cartModules.warpProduct} key={index}>
                    <img
                      src={item?.product?.image}
                      className={cartModules.imgProduct}
                      alt="cartimage"
                    />
                    <div className={cartModules.con_wrap}>
                      <span className={cartModules.tex_left}>
                        <p className={cartModules.price}>
                          {item.product.title}
                        </p>
                        <p className={cartModules.price1}>
                          {Rupiah.convert(item?.qty * item?.product?.price)}
                        </p>
                      </span>
                      <span className={cartModules.tex_left1}>
                        <p>
                          <span>
                            <button
                              className={cartModules.btnIncDec}
                              onClick={() => decreaseCart(item.id)}
                            >
                              -
                            </button>
                          </span>
                          <span>
                            <p className={cartModules.IncDec}>{item?.qty}</p>
                          </span>
                          <span>
                            <button
                              className={cartModules.btnIncDec}
                              onClick={() => increaseCart(item.id)}
                            >
                              +
                            </button>
                          </span>
                        </p>
                        <img
                          className={cartModules.trash}
                          src={trash}
                          onClick={() => handleDelete(item.id)}
                          alt="#"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={cartModules.right}>
                <div className={cartModules.rightline}>
                  <span>
                    <p>Subtotal</p>
                    <p>{Rupiah.convert(resultTotal)}</p>
                  </span>
                  <span>
                    <p>Qty</p>
                    <p>{resultQty}</p>
                  </span>
                </div>
                <span className={cartModules.price}>
                  <p>Total</p>
                  <p>{Rupiah.convert(resultTotal)}</p>
                </span>
                <div className={cartModules.btn_grp}>
                  <button onClick={(e) => handleSubmit.mutate(e)}>Pay</button>
                </div>
              </div>
            </div>
          </div>
          <ModalCart showTrans={showTrans} close={handleClose} />
        </section>
      </div>
    </>
  );
}
