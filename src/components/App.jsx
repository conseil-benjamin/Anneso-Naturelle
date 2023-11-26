import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./Banner";
import Cart from "./Cart";
import Footer from "./Footer";
import ShoppingList from "./ShoppingList";
import Details from "./Details";
import Login from "./Login";
import Profil from "./Profil";
import PrivateRoutes from "../utils/PrivateRoutes";
import Register from "./Register";

function App() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div>
        <Banner
          logo={
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322942/Logo.png"
              alt="icon_user"
              className="lmj-logo"
            />
          }
          clientIcon={
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1700332931/Icon_user.png"
              alt="La maison jungle"
              className="lmj-logo"
            />
          }
          titre={<h1 className="lmj-title">La maison jungle</h1>}
        />
        <div className="lmj-layout-inner">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home cart={cart} updateCart={updateCart} />}
            />{" "}
            <Route path="/Details" element={<Details />} />
            <Route path="/Login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/Profil" element={<Profil />} />
            </Route>
            <Route path="Register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function Home({ cart, updateCart }) {
  return (
    <>
      <Cart cart={cart} updateCart={updateCart} />
      <ShoppingList cart={cart} updateCart={updateCart} />
    </>
  );
}

export default App;
