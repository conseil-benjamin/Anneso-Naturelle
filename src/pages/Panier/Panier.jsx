import React, { useState, useEffect } from "react";
import "./Panier.css";
import CardPanier from "../../components/CardPanier/CardPanier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTag } from "@fortawesome/free-solid-svg-icons";

function Panier() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [total, setTotal] = useState(0);
  const [codePromoClique, setCodePromoClique] = useState(false);
  const [codePromo, setCodePromo] = useState("");
  const [codePromoAppliquer, setCodePromoAppliquer] = useState(false);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const newTotal = cart.reduce(
      (acc, plantType) => acc + plantType.amount * plantType.price,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    codePromoAppliquer && codePromo !== "salut"
      ? alert("Mauvais code !")
      : alert("Bon code !");
    setCodePromoAppliquer(false);
  }, [codePromoAppliquer]);

  const viderPanier = () => {
    localStorage.setItem("nbElement", JSON.stringify(0));
    updateCart([]);
  };

  return (
    <>
      <div className="body-element-panier">
        {cart.length > 0 ? (
          <>
            <div className="panier">
              <h3 id="title-panier">Mon panier</h3>
              <hr className="hr-custom" />
              {cart.map((cartElement, index) => (
                <CardPanier
                  key={`${cartElement.name}-${index}`}
                  cover={cartElement.cover}
                  name={cartElement.name}
                  price={cartElement.price}
                  amount={cartElement.amount}
                  index={index}
                  totalPanier={total}
                  setTotalPanier={setTotal}
                  removeFromCart={removeFromCart}
                />
              ))}
              {/**
             <button id="btn-vider-panier" onClick={viderPanier}>
              Vider le panier
            </button>
             */}
              <div className="div-code-promo">
                <span id="span-code-promo">
                  <FontAwesomeIcon
                    icon={faTag}
                    onClick={() => setCodePromoClique(true)}
                  />
                  {"\u00A0"} Saisir un code promo
                </span>
                {codePromoClique ? (
                  <>
                    <input
                      style={{ width: "25%", padding: "0.5em" }}
                      onChange={(e) => setCodePromo(e.target.value)}
                    ></input>
                    <button
                      style={{ padding: "0.5em" }}
                      onClick={() => setCodePromoAppliquer(true)}
                    >
                      Appliquer
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            <div className="panier-check-out">
              <h3>Résumé de la commande</h3>
              <hr />
              <h4>Sous-total : {total} €</h4>
              <h4>
                Estimation de la livraison :{" "}
                {total >= 50 ? <span>Offerts*</span> : "5 €"}
              </h4>
              <hr />
              <h2>Total : {total >= 50 ? total : total + 5} €</h2>
              <button>Passer commande</button>
              <p>
                <FontAwesomeIcon icon={faLock} />
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
