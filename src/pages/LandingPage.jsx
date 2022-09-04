// dependencies
import { useContext, useState } from "react";
import Rupiah from "rupiah-format";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

// context
import { UserContext } from "../context/UserContext";

// style
import cssModules from "../styles/home.module.css";

// file
import landing_2 from "../assets/HeroWaysbeans.svg";
import logo from "../assets/logo_waysbeans.svg";

// component
import Navbar from "../components/navbar/navbar";

// config
import { API } from "../config/Api";

export default function LandingPage() {
  // title
  document.title = "Waysbeans  ";
  // user data
  const [state] = useContext(UserContext);
  // modal login
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(true);

  // Fatching product
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  return (
    <>
      <Navbar setShow={setShow} show={show} />
      <div>
        <section>
          <div className={cssModules.landing_page}>
            <div className={cssModules.reactangle}>
              <span className={cssModules.text_inside}>
                <h3>
                  <img src={logo} alt="" />
                </h3>
                <span>
                  <p className={cssModules.p1}>
                    BEST QUALITY COFFEE BEANS
                    <br />
                  </p>
                  <br />
                  <p>
                    Quality freshly roasted coffee made just for you.
                    <br />
                    Pour, brew and enjoy
                    <br />
                  </p>
                </span>
              </span>
              <div>
                <img className={cssModules.pitc} src={landing_2} alt="ok" />
              </div>
            </div>
          </div>
        </section>
        {/* <hr /> */}
        <section>
          <span className={cssModules.textofdown}>
            <p></p>
          </span>
          <div className={cssModules.landofdown}>
            {products?.map((item, index) => (
              <div className={cssModules.card} key={index}>
                <div className={cssModules.card1}>
                  <Link
                    to={
                      state.isLogin === true ? `/detail-product/${item.id}` : ""
                    }
                    onClick={state.isLogin === false ? handleClick : ""}
                  >
                    <Card.Img variant="top" src={item.image} />
                  </Link>
                  <div className={cssModules.card2}>
                    <p className={cssModules.text1}>
                      {item.title.substring(0, 20)}
                    </p>
                    <p className={cssModules.text2}>
                      {Rupiah.convert(item.price)}
                    </p>
                    <p className={cssModules.text2}>Stock : {item.stock}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
