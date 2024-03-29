import {useEffect, useState} from "react";
import "./CardPanier.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import RedirectToProductDetails from "../RedirectToProductsDetails/RedirectToProductDetails";
import Cookies from "js-cookie";

function CardPanier({
                        name,
                        price,
                        amount,
                        index,
                        cover,
                        setTotalPanier,
                        idProduct,
                        cart, updateCart,
                    }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [imageClique, setImageClique] = useState(false);
    localStorage.setItem("cart", JSON.stringify(cart));
    const jwtToken = Cookies.get("auth_token");
    const nbArticles = JSON.parse(localStorage.getItem("nbArticles"));

    const removeFromCart = (index) => {
        if (jwtToken) {
            const getBasketClientFromDatabase = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}panier/delete`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({index: index}),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        updateCart(data.contenuPanier);
                        localStorage.setItem("nbArticles", JSON.stringify(nbArticles - 1));
                    } else {
                        console.error("Panier non trouvé");
                    }
                } catch (error) {
                    console.error("Erreur de connexion au serveur:", error);
                }
            }
            getBasketClientFromDatabase().then(r => console.log(r));
        } else {
            console.log(index);
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            updateCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            if (nbArticles > 0) {
                localStorage.setItem("nbArticles", JSON.stringify(nbArticles - 1));
            }
        }
    };

    const total = cart.reduce(
        (acc, plantType) => acc + plantType.amount * plantType.price,
        0
    );
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("total", JSON.stringify(total));
        setTotalPanier(total);
    }, [total]);

    useEffect(() => {
        if (jwtToken && selectedValue !== "") {
            const panierInfos = {
                idProduct: idProduct,
                amount: selectedValue,
            }
            localStorage.setItem("nbElement", JSON.stringify(selectedValue));
            const patchAmountOfThisProductInDatabase = async () => {
                //setDataLoading(true);
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}panier/update`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${jwtToken}`
                            },
                            body: JSON.stringify({panierInfos}),
                        },
                    );
                    if (response.ok) {
                        const panier = await response.json();
                        console.log(panier);
                        updateCart(panier.contenuPanier);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    //setProductAdd(true);
                    //setDataLoading(false);
                }
            };
            patchAmountOfThisProductInDatabase().then(r => console.log(r));
        } else {
            if (selectedValue !== "") {
                const updatedCart = [...cart];
                const productIndex = updatedCart.findIndex((product) => product.name === name);
                if (productIndex !== -1) {
                    updatedCart[productIndex] = {
                        ...updatedCart[productIndex],
                        amount: selectedValue,
                    };
                    updateCart(updatedCart);
                    setTotalPanier(total);
                }
            }
            setTotalPanier(total);
        }
    }, [selectedValue]);

    return (
        <>
            <div className="main-panier-page">
                <div className={"card-panier-mobile-container-up"}>
                    <div className={"card-panier-mobile-container-up-left"}>
                        <img src={cover} height={150} width={150} onClick={() => setImageClique(true)}></img>
                        {imageClique && (
                            console.log(idProduct, imageClique),
                                <RedirectToProductDetails
                                    idProduct={idProduct}
                                    imageClique={imageClique}
                                />
                        )}
                        {"\u00A0"} {"\u00A0"}
                    </div>
                </div>
                <div className={"card-panier-div-name-and-price-mobile"}>
                    <h4 className="name-element">{name}</h4>
                    <h4>{price} €</h4>
                </div>
                <div className={"card-panier-mobile-container-up-right"}>
                    <div>
                        <select
                            value={selectedValue}
                            onChange={(e) => setSelectedValue(parseInt(e.target.value))}
                        >
                            <option value={amount}>{amount}</option>
                            <hr></hr>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </div>

                    <div>
                        <a href="#">
                            <FontAwesomeIcon
                                icon={faXmark}
                                onClick={() => removeFromCart(index)}
                                alt="icon supprimer"
                                className="custom-size"
                            ></FontAwesomeIcon>
                        </a>
                    </div>

                </div>
            </div>
            <hr className="hr-custom"/>
        </>
    );
}

export default CardPanier;
