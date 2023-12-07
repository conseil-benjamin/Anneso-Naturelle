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
import Erreur404 from "../pages/Erreur404/Erreur404";
import Commandes from "../pages/Commandes/Commandes";
import Adresses from "../pages/Adresses/Adresses";
import Panier from "../pages/Panier/Panier";
import AjoutAdresse from "../pages/Ajout Adresse/AjoutAdresse";
import DetailsCommande from "../pages/DetailsCommande/DetailsCommande";

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
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1701819626/Logo1.png"
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
            <a href="/Apropos" className="lmj-title">
              A propos
            </a>
          }
          contact={
            <a href="/Contact" className="lmj-title">
              Contact
            </a>
          }
          panier={
            <a href="/Panier">
              <img
                src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1701431057/panier.png"
                alt="Panier"
                width={45}
                height={45}
                id="icone_panier"
              />
            </a>
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
              <Route path="/Profil/infos-persos" element={<Profil />} />
              <Route path="/Profil/commandes" element={<Commandes />} />
              <Route path="/Profil/adresses" element={<Adresses />} />
              <Route
                path="/Profil/adresses/addAdresse"
                element={<AjoutAdresse />}
              />
              <Route
                path="/Profil/commandes/:numOrder"
                element={<DetailsCommande />}
              />
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
            <Route
              path="panier"
              element={<Panier cart={cart} updateCart={updateCart} />}
            />
            <Route path="/*" element={<Erreur404 />} />
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
