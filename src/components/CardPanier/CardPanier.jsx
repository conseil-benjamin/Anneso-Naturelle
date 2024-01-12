import { useEffect, useState } from "react";
import "./CardPanier.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer/Footer";
import RedirectToProductDetails from "../RedirectToProductsDetails/RedirectToProductDetails";

function CardPanier({
  name,
  price,
  amount,
  index,
  cover,
  setTotalPanier,
  removeFromCart,
                      idProduct,
}) {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [selectedValue, setSelectedValue] = useState("");
  const [imageClique, setImageClique] = useState(false);
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
      : [...cart, { cover, name, price, idProduct, amount: 0 }];
    updateCart([
      ...updatedCart,
      {
        cover,
        name,
        price,
        idProduct,
        amount: selectedValueFromLocal,
      },
    ]);
    setTotalPanier(total);
  }, [selectedValue]);

  return (
    <>
      <div className="main-panier-page">
        <div className={"card-panier-mobile-container-up"}>
          <div className={"card-panier-mobile-container-up-left"}>
            <img src={cover} height={150} width={150} onClick={() => setImageClique(true)}></img>
            {imageClique && (
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
