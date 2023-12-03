import { useState, useEffect } from "react";
import "./Panier.css";

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
  const [selectedValue, setSelectedValue] = useState("");

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [total]);

  return (
    <>
      <h1>Votre panier</h1>
      {cart.length > 0 ? (
        <div className="panier">
          <ul>
            {cart.map(({ name, price, amount }, index) => (
              <div key={`${name}-${index}`} className="div-1-element-panier">
                {name} {price}€
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  <option value={selectedValue}>{selectedValue}</option>
                  <hr></hr>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {selectedValue != amount
                  ? updateCart([{ name, price, amount: selectedValue }])
                  : null}
                <img
                  src={
                    "https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322942/Icon_Supprimer.png"
                  }
                  alt="icon supprimer"
                  onClick={() => removeFromCart(index)}
                />
              </div>
            ))}
          </ul>
          <h3>Total :{total}€</h3>
          <button onClick={() => updateCart([])}>Vider le panier</button>
        </div>
      ) : (
        <div>Votre panier est vide</div>
      )}
    </>
  );
}

export default Panier;
