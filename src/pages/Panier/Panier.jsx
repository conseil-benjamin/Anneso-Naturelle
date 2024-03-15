import React, {useEffect, useState} from "react";
import "./Panier.css";
import CardPanier from "../../components/CardPanier/CardPanier";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faTag, faXmark} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Toast from "../../components/Toast/toast";
import {Loader} from "../../utils/Loader";
import {useNavigate} from "react-router-dom";

function Panier({cart, updateCart}) {
    const [total, setTotal] = useState(0);
    let [totalWithReduction, setotalWithReduction] = useState(0);
    const [codePromoClique, setCodePromoClique] = useState(false);
    const [codePromo, setCodePromo] = useState("");
    const [codePromoAppliquer, setCodePromoAppliquer] = useState(false);
    const [panierUpdated, setPanierUpdated] = useState([]);
    const jwtToken = Cookies.get("auth_token");
    const [codePromoCorrecte, setCodePromoCorrecte] = useState(false);
    const [toast, setToast] = useState({icon: '', text: ''});
    const codePromoLocalStorage = localStorage.getItem("codePromoActif");
    const [reduc, setReduc] = useState(codePromoLocalStorage ? JSON.parse(codePromoLocalStorage) : []);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!jwtToken) {
            return;
        }
        const getBasketClientFromDatabase = async () => {
            setIsDataLoaded(true);
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
                    const panierBDD = data.contenuPanier;
                    const panierLocalStorage = JSON.parse(localStorage.getItem("cart"));
                    console.log(JSON.parse(localStorage.getItem("basketConcated")) === true);
                    return new Promise(resolve => {
                        setPanierUpdated(prevState => {
                            const updatedState = panierLocalStorage;
                            resolve(updatedState);
                            return updatedState;
                        });
                    });
                } else {
                    console.error("Panier non trouvé");
                }
            } catch (error) {
                console.error("Erreur de connexion au serveur:", error);
            } finally {
                setIsDataLoaded(false);
                setIsDataFetched(true);
            }
        }
        getBasketClientFromDatabase().then(r => console.log(r));
    }, []);

    useEffect(() => {
        if (isDataFetched) {
            console.log(panierUpdated && jwtToken && JSON.parse(localStorage.getItem("basketConcated")) === false);
            console.log(panierUpdated);
            if (panierUpdated && jwtToken && JSON.parse(localStorage.getItem("basketConcated")) === false) {
                const insertLocaleStorageProductInsideDatabase = async () => {
                    localStorage.setItem("basketConcated", JSON.stringify(true));
                    try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}panier/insert-many-products`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${jwtToken}`
                            },
                            body: JSON.stringify({ panierUpdated })
                        });
                        if (response.ok) {
                            console.log("Panier inséré dans la base de données");
                            const data = await response.json();
                            updateCart(data.contenuPanier);
                            localStorage.setItem("nbArticles", JSON.stringify(data.contenuPanier.length));
                        } else {
                            console.error("Panier non trouvé");
                        }
                    } catch (error) {
                        console.error("Erreur de connexion au serveur:", error);
                    }
                    finally {
                        setIsDataFetched(false);
                    }
                }
                insertLocaleStorageProductInsideDatabase().then(r => console.log(r));
            }
        }
    }, [panierUpdated, isDataFetched]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        let newTotal = cart.reduce(
            (acc, product) => acc + product.amount * product.price,
            0
        );
        const reduc = JSON.parse(localStorage.getItem("codePromoActif"));
        if (reduc){
            setotalWithReduction(newTotal - reduc.reduction * newTotal);
        }
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
        setToast({icon: '', text: ''});
    }

    useEffect(() => {
        const codePromoLocalStorage = localStorage.getItem("codePromoActif");
        if (codePromoLocalStorage) {
            setReduc(JSON.parse(codePromoLocalStorage));
        } else {
            setReduc([]);
        }
    }, [codePromoLocalStorage]);

    useEffect(() => {
        const newTotal = (total >= 50 && reduc.reduction ? total * (1 - reduc.reduction) : total < 50 && reduc.reduction ? total * (1 - reduc.reduction) + 5 : total < 50 ? total + 5 : total);
        setotalWithReduction(newTotal);
    }, [total, reduc]);

    return (
        <>
            {/* TODO: Toast s'affiche même quand on supprime le code promo*/}
            {toast.text && <Toast icon={toast.icon} text={toast.text}></Toast>}
            <div className="body-element-panier">
                {isDataLoaded ? (
                    <Loader></Loader>
                ) :
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
                            <div className={"div-summary-command"}>
                                <p>Sous-total</p>
                                <p>{total.toFixed(2)} €</p>
                            </div>
                            <div className={"div-summary-command"}>
                                {codePromoLocalStorage ? <p>Promotion</p> : null}
                                {codePromoLocalStorage ? <p style={{color: "#008000"}}>-{(total * reduc.reduction).toFixed(2)} €</p> : null}
                            </div>
                            <div className={"div-summary-command"}>
                                <p>Frais de livraison
                                </p>
                                <p>{total >= 50 ? <span>Offert</span> : "5.00 €"}</p>
                            </div>
                            <hr/>
                            <div className={"div-summary-command"}>
                                <h3>Total</h3>
                                <h3>{totalWithReduction.toFixed(2)} €</h3>
                            </div>
                            <button onClick={()=> {jwtToken ? navigate("/checkout/delivery") : navigate("/auth/login")}}>Passer commande</button>
                            <p style={{textAlign: "center"}}>
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