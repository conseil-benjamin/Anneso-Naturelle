import React, {useEffect, useState} from "react";
import "./Panier.css";
import CardPanier from "../../components/CardPanier/CardPanier";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faTag, faXmark} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Toast from "../../components/Toast/toast";
import {Loader} from "../../utils/Loader";

function Panier({cart, updateCart}) {
    const [total, setTotal] = useState(0);
    const [codePromoClique, setCodePromoClique] = useState(false);
    const [codePromo, setCodePromo] = useState("");
    const [codePromoAppliquer, setCodePromoAppliquer] = useState(false);
    const [panierBDD, setPanierBDD] = useState([]);
    const [panierUpdated, setPanierUpdated] = useState([]);
    const jwtToken = Cookies.get("auth_token");
    const [codePromoCorrecte, setCodePromoCorrecte] = useState(false);
    const [toast, setToast] = useState({icon: '', text: ''});
    const codePromoLocalStorage = localStorage.getItem("codePromoActif");
    const [reduc, setReduc] = useState(codePromoLocalStorage ? JSON.parse(codePromoLocalStorage) : []);
    const [isDataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        if (!jwtToken) {
            return;
        }
        const getBasketClientFromDatabase = async () => {
            setDataLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}panier`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Panier du client " + data);
                    setPanierBDD(data.contenuPanier);
                    console.log("panierBDD", panierBDD);
                    localStorage.setItem("nbArticles", JSON.stringify(data.contenuPanier.length));
                } else {
                    console.error("Panier non trouvé");
                }
            } catch (error) {
                console.error("Erreur de connexion au serveur:", error);
            }
        }
        getBasketClientFromDatabase().then(r => console.log(r));
    }, []);

    useEffect(() => {
        console.log("panierBDD", panierBDD);
        if (panierBDD.length > 0 && jwtToken) {
            const panierLocalStorage = JSON.parse(localStorage.getItem("cart"));
            if (JSON.parse(localStorage.getItem("basketConcated")) === true) {
                return;
            }
            console.log("panierAvantUpdated", panierUpdated);
            const newPanierUpdated = [...panierLocalStorage, ...panierBDD].filter((item, index, self) =>
                    index === self.findIndex((t) => (
                        t.idProduct === item.idProduct && t.name === item.name
                    ))
            )
            setPanierUpdated(newPanierUpdated);
            console.log("panierUpdated", panierUpdated);
        }
        setDataLoading(false);
    }, [panierBDD]);

    useEffect(() => {
        updateCart(panierUpdated);
    }, [panierUpdated]);

    useEffect(() => {
        console.log(panierUpdated && jwtToken && JSON.parse(localStorage.getItem("basketConcated")) === false);
        if (panierUpdated && jwtToken) {
            console.log("panierUpdated : ", panierUpdated);
            updateCart(panierUpdated);
            localStorage.setItem("cart", JSON.stringify(panierUpdated));
            const insertLocaleStorageProductInsideDatabase = async () => {
                localStorage.setItem("bastekConcated", JSON.stringify(true));
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}panier/insert-many-products`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({panierUpdated})
                    });
                    if (response.ok) {
                        console.log("Panier inséré dans la base de données");
                    } else {
                        console.error("Panier non trouvé");
                    }
                } catch (error) {
                    console.error("Erreur de connexion au serveur:", error);
                }
            }
            insertLocaleStorageProductInsideDatabase().then(r => console.log(r));
        }
    }, [panierUpdated]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        let newTotal = cart.reduce(
            (acc, product) => acc + product.amount * product.price,
            0
        );
        const reduc = JSON.parse(localStorage.getItem("codePromoActif"));
        if (reduc){
            newTotal = newTotal - reduc.reduction * newTotal;
        }
        console.log(newTotal)
        setTotal(newTotal);
    }, [cart, codePromoLocalStorage]);

    useEffect(() => {
        if (!codePromoAppliquer){
            return;
        }
        const handleClickCodePromo = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}codePromo/${codePromo}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                if (response.ok){
                    const reduction = await response.json();
                    console.log(reduction)
                    localStorage.setItem("codePromoActif", JSON.stringify(reduction));
                    setCodePromoCorrecte(true);
                } else{
                    Swal.fire({
                        text: "Code promo non valide ou bien expiré.",
                        icon: "error"
                    })
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setCodePromoAppliquer(false);
            }
        }
        handleClickCodePromo();
    }, [codePromoAppliquer]);

    useEffect(() => {
        if (!codePromoCorrecte){
            return;
        }
        setToast({
            icon: 'success',
            text: 'Code promo appliqué'
        })
    }, [codePromoCorrecte]);

    const removeCodePromo = () =>{
        localStorage.removeItem("codePromoActif");
        setReduc([]);
        setCodePromoCorrecte(false);
    }

    useEffect(() => {
        const codePromoLocalStorage = localStorage.getItem("codePromoActif");
        if (codePromoLocalStorage) {
            setReduc(JSON.parse(codePromoLocalStorage));
        } else {
            setReduc([]);
        }
    }, [codePromoLocalStorage]);

    return (
        <>
            {/* TODO: Toast s'affiche même quand on supprime le code promo*/}
            {toast.text && <Toast icon={toast.icon} text={toast.text}></Toast>}
            <div className="body-element-panier">
                {isDataLoading ? <Loader></Loader> :
                    cart.length > 0 ? (
                        <>
                            <div className="panier">
                                <h3 id="title-panier">Mon panier</h3>
                                <hr className="hr-custom"/>
                                {cart.map((cartElement, index) => (
                                    <CardPanier
                                        key={`${cartElement.name}-${index}`}
                                        idProduct={cartElement.idProduct}
                                        cover={cartElement.cover}
                                        name={cartElement.name}
                                        price={cartElement.price}
                                        amount={cartElement.amount}
                                        index={index}
                                        totalPanier={total}
                                        setTotalPanier={setTotal}
                                        cart={cart}
                                        updateCart={updateCart}
                                    />
                                ))}
                                <div className={"div-main-code-promo"}>
                                    <div className="div-code-promo-left" onClick={() => setCodePromoClique(true)}
                                    >
                <span id="span-code-promo">
                  <FontAwesomeIcon
                      icon={faTag}
                  />
                    {"\u00A0"} Saisir un code promo
                </span>
                                    </div>
                                    <div className={"div-code-promo-right"}>
                                        {codePromoClique ? (
                                            <>
                                                <input
                                                    style={{width: "40%", padding: "0.5em"}}
                                                    onChange={(e) => setCodePromo(e.target.value)}
                                                ></input>
                                                <button
                                                    style={{padding: "0.5em"}}
                                                    onClick={() => setCodePromoAppliquer(true)}
                                                >
                                                    Appliquer
                                                </button>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                { codePromoLocalStorage ?
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <p style={{backgroundColor: "#DCF5D3", color: "#287834", margin: "1em", padding: "0.3em"}}>Code promo
                                            appliqué : {reduc.reductionValeurEntier} % de remise</p>
                                        <FontAwesomeIcon icon={faXmark} style={{cursor: "pointer"}} onClick={() => removeCodePromo()}></FontAwesomeIcon>
                                    </div> : null
                                }
                            </div>
                            <div className="panier-check-out">
                                <h3>Résumé de la commande</h3>
                                <hr/>
                                <div style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                                    <p>Sous-total : {total} €</p>
                                    {codePromoLocalStorage ? <p>au lieu de <del>{total / (1 - reduc.reduction)}</del> €</p> : null}
                                </div>
                                <p>
                                    Frais de livraison :{" "}
                                    {total >= 50 ? <span>Offerts*</span> : "5 €"}
                                </p>
                                <hr/>
                                <h2>Total : {total >= 50 ? total : total + 5} €</h2>
                                <button>Passer commande</button>
                                <p>
                                    <FontAwesomeIcon icon={faLock}/>
                                    {"\u00A0"} Paiement sécurisé
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="div-panier-vide">
                            <h2>Votre panier est vide</h2>
                        </div>
                    )}
            </div>
        </>
    );
}

export default Panier;
