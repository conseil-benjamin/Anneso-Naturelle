import ButtonDeconnect from "../../components/Button Deconnect/ButtonDeconnect";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";

function Admin(){
    const [seeAllOrders, setSeeAllOrders] = useState(false);
    const [addPromoCode, setAddPromoCode] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("role") !== "admin") {
            window.location.href = "/auth/login";
        }
    }, []);

    useEffect(() => {
        if (seeAllOrders) {
           navigate("/admin/orders");
        }
        setSeeAllOrders(false);
    }, [seeAllOrders]);

    useEffect(() => {
        if (addPromoCode) {
            navigate("/admin/promo-code");
        }
        setAddPromoCode(false);
    }, [addPromoCode]);

    useEffect(() => {
        if (addProduct){
            navigate("/admin/add-product");
        }
        setAddProduct(false);
    }, [addProduct]);

    return(
        <div>
            <h1>Admin</h1>
            <button onClick={() => setSeeAllOrders(true)}>Voir toutes les commandes</button>
            <h2>Ajouter un produit</h2>
            <h2>Modifier les commandes</h2>
            <button onClick={() => setAddPromoCode(true)}>Ajouter un code promo, modifier un existant</button>
            <button onClick={() => setAddProduct(true)}>Ajouter un produit</button>
            <ButtonDeconnect></ButtonDeconnect>
        </div>
    )
}

export default Admin;