import { useState, useEffect } from "react";
import "./Panier.css";
import CardPanier from "../../components/CardPanier/CardPanier";

function Panier() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const total = cart.reduce(
    (acc, plantType) => acc + plantType.amount * plantType.price,
    0
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [total]);

  return (
    <>
      <div className="body-element-panier">
        <h1>Votre panier</h1>
        {cart.length > 0 ? (
          <div className="panier">
            <ul>
              {cart.map((cartElement, index) => (
                <CardPanier
                  key={`${cartElement.name}-${index}`}
                  name={cartElement.name}
                  price={cartElement.price}
                  amount={cartElement.amount}
                  index={index}
                ></CardPanier>
              ))}
            </ul>
            <h3>Total :{total}€</h3>
            <button>Passer commande</button>
            <button onClick={() => updateCart([])}>Vider le panier</button>
          </div>
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
