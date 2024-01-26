import React, {useEffect, useState} from "react";
import "./Panier.css";
import CardPanier from "../../components/CardPanier/CardPanier";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faTag} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

function Panier({cart, updateCart}) {
    const [total, setTotal] = useState(0);
    const [codePromoClique, setCodePromoClique] = useState(false);
    const [codePromo, setCodePromo] = useState("");
    const [codePromoAppliquer, setCodePromoAppliquer] = useState(false);
    const [panierBDD, setPanierBDD] = useState([]);
    const [panierUpdated, setPanierUpdated] = useState([]);
    const jwtToken = Cookies.get("auth_token");

    useEffect(() => {
        const getBasketClientFromDatabase = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/v1/panier/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    /**
                     * TODO # Faire un map sur data pour récupérer contenu commande et le concaténé avec le panier existant en localstorage.
                     */
                    /**
                     * TODO # Si j'ai un panier en localStorage et que je me connecte je vide le panier en localStorage
                     */
                    setPanierBDD(data.contenuPanier);
                } else {
                    console.error("Panier non trouvé");
                }
            } catch (error) {
                console.error("Erreur de connexion au serveur:", error);
            }
        }
        getBasketClientFromDatabase().then(r => console.log(r));
    }, [], jwtToken);

    useEffect(() => {
        if (panierBDD.length > 0) {
            console.log("panierBDD", panierBDD);
            panierBDD.map((panierBDDElement) => {
                const panierLocalStorage = JSON.parse(localStorage.getItem("cart"));

                setPanierUpdated(panierLocalStorage.concat(panierBDDElement.cover));
            });
            updateCart(...[panierUpdated]);
            console.log(panierUpdated);
        }
    }, [panierBDD]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        const newTotal = cart.reduce(
            (acc, plantType) => acc + plantType.amount * plantType.price,
            0
        );
        setTotal(newTotal);
    }, [cart]);

    /**
     *   useEffect(() => {
     codePromoAppliquer && codePromo !== "salut"
     ? alert("Mauvais code !")
     : alert("Bon code !");
     setCodePromoAppliquer(false);
     }, [codePromoAppliquer]);
     */

    return (
        <>
            <div className="body-element-panier">
                {cart.length > 0 ? (
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
                                     onClick={() => setCodePromoClique(true)}
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

                        </div>
                        <div className="panier-check-out">
                            <h3>Résumé de la commande</h3>
                            <hr/>
                            <h4>Sous-total : {total} €</h4>
                            <h4>
                                Frais de livraison :{" "}
                                {total >= 50 ? <span>Offerts*</span> : "5 €"}
                            </h4>
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
