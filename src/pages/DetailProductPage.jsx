// dependencies
import { useNavigate, useParams } from "react-router-dom";
import Rupiah from "rupiah-format";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

// style
import productModules from "../styles/product.module.css";

// component
import Navbar from "../components/navbar/navbar";
import { API } from "../config/Api";

export default function DetailProductPage() {
  const navigate = useNavigate();

  // fatching
  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  // title
  const title = product?.title;
  document.title = "Waysbeans | " + title;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({
        product_id: parseInt(id),
        qty: 1,
        subtotal: product?.price,
      });
      await API.post("/cart", body, config);

      // navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <section>
          <div className={productModules.wrap}>
            <div className={productModules.left}>
              <img src={product?.image} alt="oke" />
            </div>
            <div className={productModules.right}>
              <span className={productModules.name}>
                <p className={productModules.titleProduct}>{product?.title}</p>
                <p className={productModules.priceBrown}>
                  Stock : {product?.stock}
                </p>
                <div className={productModules.desc}>
                  <p className="">{product?.desc}</p>
                </div>
              </span>
              <div className={productModules.price}>
                <p></p>
                <p>{Rupiah.convert(product?.price)}</p>
              </div>
              <div className={productModules.btn_grp}>
                <button className={productModules.btn} onClick={handleSubmit}>
                  {" "}
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
