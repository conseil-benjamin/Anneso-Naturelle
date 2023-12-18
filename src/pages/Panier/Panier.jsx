import React, { useState, useEffect } from "react";
import "./Panier.css";
import CardPanier from "../../components/CardPanier/CardPanier";

function Panier() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [total, setTotal] = useState(0);

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

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  return (
    <div className="body-element-panier">
      <h1>Votre panier</h1>
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
          <button id="btn-vider-panier" onClick={viderPanier}>
            Vider le panier
          </button>
          <h3>Total : {total}€</h3>
          <div>
            <button>Passer commande</button>
          </div>
        </div>
      ) : (
        <div className="div-panier-vide">
          <h2>Votre panier est vide</h2>
        </div>
      )}
    </div>
  );
}

export default Panier;
