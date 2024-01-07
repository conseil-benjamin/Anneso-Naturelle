import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./Banner";
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
import Favoris from "../pages/Favoris/Favoris";
import HomePage from "../pages/HomePage/HomePage";
import DetailsAdresses from "../pages/DetailsAdresses/DetailsAdresses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function App() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(cart);
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
              style={{ color: "#27393b" }}
            >
              Collections
            </a>
          }
          creationPersonalise={
            <a href="#" className="lmj-title" style={{ color: "#27393b" }}>
              Creation Personalisé
            </a>
          }
          aPropos={
            <a
              href="/Apropos"
              className="lmj-title"
              style={{ color: "#27393b" }}
            >
              A propos de moi
            </a>
          }
          contact={
            <a
              href="/Contact"
              className="lmj-title"
              style={{ color: "#27393b" }}
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
              element={<Details cart={cart} updateCart={updateCart} />}
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
              element={<ShoppingList cart={cart} updateCart={updateCart} />}
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
