import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./Banner";
import Footer from "./Footer/Footer";
import ShoppingList from "../pages/ShoppingList/ShoppingList";
import DetailsProduct from "../pages/DetailsProduct/DetailsProduct";
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
import Favoris from "../pages/Favoris/Favoris";
import HomePage from "../pages/HomePage/HomePage";
import DetailsAdresses from "../pages/DetailsAdresses/DetailsAdresses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import CartContex from "../utils/CartContex";
import ButtonDeconnect from "./Button Deconnect/ButtonDeconnect";

function App() {

  const jwtToken = Cookies.get("auth_token");
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (!jwtToken){
      updateCart(cart);
    }
  }, [cart]);

  return (
    <Router>
      <div>
        <Banner
          logo={
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1703114666/logo1.png"
              alt="logo"
              className="lmj-logo"
            />
          }
          collection={
            <a
              href="/collections"
              className="lmj-title"
            >
              Collections
            </a>
          }
          creationPersonalise={
            <a href="#" className="lmj-title">
              Creation Personalisé
            </a>
          }
          aPropos={
            <a
              href="/Apropos"
              className="lmj-title"
            >
              A propos de moi
            </a>
          }
          contact={
            <a
              href="/Contact"
              className="lmj-title"
            >
              Contact
            </a>
          }
          panier={
            <a href="/Panier">
              <FontAwesomeIcon
                icon={faShoppingCart}
                alt="Panier"
                id="icone_panier"
                size="2x"
              />
            </a>
          }
        />
        <div className="lmj-layout-inner">
          <Routes>
            <Route exact path="/" element={<Home />} />{" "}
            <Route
              path="/Details/:id"
              element={<DetailsProduct cart={cart} updateCart={updateCart} />}
            />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/profil/infos-persos" element={<Profil />} />
              <Route path="/profil/commandes" element={<Commandes />} />
              <Route path="/profil/adresses" element={<Adresses />} />
              <Route path="/profil/favoris" element={<Favoris />} />
              <Route
                path="/Profil/adresses/ajoutAdresse"
                element={<AjoutAdresse />}
              />
              <Route
                path="/Profil/adresses/:numAdresse"
                element={<DetailsAdresses />}
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
            <Route
              path="collections"
              element={<ShoppingList />}
            />
            <Route path="/*" element={<Erreur404 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <HomePage></HomePage>
    </>
  );
}

export default App;
