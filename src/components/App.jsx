import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./Banner";
import Cart from "./Cart/Cart";
import Footer from "./Footer/Footer";
import ShoppingList from "../pages/ShoppingList/ShoppingList";
import Details from "../pages/Details/Details";
import Login from "../pages/Login/Login";
import Profil from "../pages/Profil/Profil";
import PrivateRoutes from "../utils/PrivateRoutes";
import Register from "../pages/Register/Register";
import Apropos from "../pages/Apropos/Apropos";
import Contact from "../pages/Contact/Contact";
import MentionsLegales from "../pages/MentionsLegales/MentionsLegales";
import ConditionsUtilisations from "../pages/ConditionsUtilisation/ConditionsUtilisation";
import ConditionsGenerales from "../pages/ConditionsGenerales/ConditionsGenerales";

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
              alt="logo"
              className="lmj-logo"
            />
          }
          clientIcon={
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1700332931/Icon_user.png"
              alt="icon_profil"
              className="lmj-logo"
            />
          }
          collection={
            <a href="/" className="lmj-title">
              Collections
            </a>
          }
          aPropos={
            <a href="Apropos" className="lmj-title">
              A propos
            </a>
          }
          contact={
            <a href="Contact" className="lmj-title">
              Contact
            </a>
          }
          panier={
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1701431057/panier.png"
              alt="La maison jungle"
              className="lmj-logo"
            />
          }
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
            <Route path="Apropos" element={<Apropos />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route
              path="conditions-utilisations"
              element={<ConditionsUtilisations />}
            />
            <Route
              path="conditions-generales"
              element={<ConditionsGenerales />}
            />
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
