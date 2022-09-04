// dependencies
import {  Route, Routes, useNavigate } from "react-router-dom";
import { API,setAuthToken } from "./config/Api";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

// style
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

// pages
import LandingPage from "./pages/LandingPage";
import DetailProduct from "./pages/DetailProductPage";
import Cart from "./pages/CartPage";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct"
import UpdateProduct from "./pages/UpdateProduct";
import ListProduct from "./pages/ListProduct";
import Transaction from "./pages/Transaction";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail-product/:id" element={<DetailProduct/>}/>
        <Route path="/cart" element={<Cart/>}/>
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/list-product" element={<ListProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
  );
}

export default App;
