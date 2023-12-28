import { useEffect, useState } from "react";
import "./CardPanier.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function CardPanier({
  name,
  price,
  amount,
  index,
  cover,
  setTotalPanier,
  removeFromCart,
}) {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [selectedValue, setSelectedValue] = useState("");
  localStorage.setItem("cart", JSON.stringify(cart));

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
    selectedValue &&
      localStorage.setItem("nbElement", JSON.stringify(selectedValue));
    const selectedValueFromLocal = JSON.parse(
      localStorage.getItem("nbElement")
    );
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    const updatedCart = currentPlantSaved
      ? cart.filter((plant) => plant.name !== name)
      : [...cart, { cover, name, price, amount: 0 }];
    updateCart([
      ...updatedCart,
      {
        cover,
        name,
        price,
        amount: selectedValueFromLocal,
      },
    ]);
    setTotalPanier(total);
  }, [selectedValue]);

  return (
    <>
      <div className="main-panier-page">
        <img src={cover} height={125} width={125}></img>
        {"\u00A0"} {"\u00A0"}
        <h4 className="name-element">{name}</h4>
        <h4>{price} €</h4>
        <select
          value={selectedValue}
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
        <a href="#">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => removeFromCart(index)}
            alt="icon supprimer"
            className="custom-size"
          ></FontAwesomeIcon>
        </a>
      </div>
      <hr className="hr-custom" />
    </>
  );
}

export default CardPanier;
