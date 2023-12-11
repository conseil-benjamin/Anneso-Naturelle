import { useEffect, useState } from "react";
import "./CardPanier.scss";

function CardPanier({ name, price, amount, index }) {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
    window.location.reload();
  };
  const [amountElement, setSelectedValue] = useState("");
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
    /**
     * ! Problème choix nombre plantes, total n'incrémente pas
     */
    <>
      <div className="main-panier-page">
        <h4 className="name-element">{name}</h4>
        <h4>{price} €</h4>
        <select
          value={amountElement}
          onChange={(e) => setSelectedValue(e.target.value)}
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
        <img
          src={
            "https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322942/Icon_Supprimer.png"
          }
          alt="icon supprimer"
          onClick={() => removeFromCart(index)}
          width={25}
          height={25}
        />
      </div>
    </>
  );
}

export default CardPanier;
