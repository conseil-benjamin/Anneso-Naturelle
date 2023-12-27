import React, { useState, useEffect } from "react";
import "./Panier.css";
import CardPanier from "../../components/CardPanier/CardPanier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function Panier() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [total, setTotal] = useState(0);

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

  const viderPanier = () => {
    localStorage.setItem("nbElement", JSON.stringify(0));
    updateCart([]);
  };

  return (
    <>
      <div className="body-element-panier">
        <h3>Mon panier</h3>
        {cart.length > 0 ? (
          <div className="panier">
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
            <hr />
            {/**
             <button id="btn-vider-panier" onClick={viderPanier}>
              Vider le panier
            </button>
             */}
            <span>Saisir un code promo</span>
          </div>
        ) : (
          <div className="div-panier-vide">
            <h2>Votre panier est vide</h2>
          </div>
        )}
        <div className="panier-check-out">
          <h3>Résumé de la commande</h3>
          <hr />
          <h4>Sous-total {total} €</h4>
          <h4>
            Estimation de la livraison :{" "}
            {total >= 50 ? <span>Offerts*</span> : "5 €"}
          </h4>
          <hr />
          <h2>Total {total >= 50 ? total : total + 5} €</h2>
          <button>Passer commande</button>
          <p>
            <FontAwesomeIcon icon={faLock} />
            {"\u00A0"} Paiement sécurisé
          </p>
        </div>
      </div>
    </>
  );
}

export default Panier;
