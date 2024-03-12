import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import CartContex from "../utils/CartContex";
import ButtonDeconnect from "./Button Deconnect/ButtonDeconnect";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Admin from "../pages/Admin/Admin";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminCodePromo from "../pages/Admin/AdminCodePromo";
import AdminAddProduct from "../pages/Admin/AdminAddProduct";

function App() {

    const jwtToken = Cookies.get("auth_token");
    const savedCart = localStorage.getItem("cart");
    const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(cart);
    }, [cart]);

    return (
        <Router>
            <div>
                <Banner/>
                <div className="lmj-layout-inner">
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>{" "}
                        <Route
                            path="/Details/:id"
                            element={<DetailsProduct cart={cart} updateCart={updateCart}/>}
                        />
                        <Route path="/auth/login" element={<Login/>}/>
                        <Route element={<PrivateRoutes/>}>
                            <Route path="/profil/infos-persos" element={<Profil/>}/>
                            <Route path="/profil/commandes" element={<Commandes/>}/>
                            <Route path="/profil/adresses" element={<Adresses/>}/>
                            <Route path="/profil/favoris" element={<Favoris/>}/>
                            <Route path={"/admin"} element={<Admin/>}/>
                            <Route
                                path="/Profil/adresses/ajoutAdresse"
                                element={<AjoutAdresse/>}
                            />
                            <Route path="/admin/orders" element={<AdminOrders/>}/>
                            <Route path="/admin/promo-code" element={<AdminCodePromo/>}/>
                            <Route path={"/admin/add-product"} element={<AdminAddProduct/>}/>
                            <Route
                                path="/Profil/adresses/:numAdresse"
                                element={<DetailsAdresses/>}
                            />
                            <Route
                                path="/Profil/commandes/:idCommande"
                                element={<DetailsCommande/>}
                            />
                        </Route>
                        <Route path="/auth/reset-password/:token" element={<ResetPassword/>}/>
                        <Route path="/auth/register" element={<Register/>}/>
                        <Route path="apropos" element={<Apropos/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="mentions-legales" element={<MentionsLegales/>}/>
                        <Route
                            path="conditions-utilisations"
                            element={<ConditionsUtilisations/>}
                        />
                        <Route
                            path="conditions-generales"
                            element={<ConditionsGenerales/>}
                        />
                        <Route
                            path="panier"
                            element={<Panier cart={cart} updateCart={updateCart}/>}
                        />
                        <Route
                            path="collections"
                            element={<ShoppingList/>}
                        />
                        <Route path="/*" element={<Erreur404/>}/>
                    </Routes>
                </div>
                <Footer/>
                <SpeedInsights />
                <Analytics/>
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
