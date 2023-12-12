import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Details.css";
import CareScale from "../../components/CareScale/CareScale";
import { useState } from "react";

function Details({ cart, updateCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [productAdd, setProductAdd] = useState(false);
  const [isAddElement, setAddElement] = useState(false);

  const { cover, name, water, light, price, category, description } =
    location.state || {};

  function addToCart(name, price) {
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateCart([
        ...cartFilteredCurrentPlant,
        { name, price, amount: currentPlantSaved.amount + 1 },
      ]);
      setProductAdd(true);
    } else {
      updateCart([...cart, { name, price, amount: 1 }]);
      setProductAdd(true);
    }
    setAddElement(true);
    productAdd && navigate("/Panier");
    setProductAdd(false);
  }

  return (
    <div className="bodyElementDetails">
      <div className="return-to-collection">
        <Link to="/collections">
          <img
            src={
              "https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322943/Icon_retour_arriere.png"
            }
            alt="Description de l'image"
            width={25}
            height={25}
          />
        </Link>
      </div>
      <div className="container-left-details">
        <img
          src={cover}
          width={250}
          height={250}
          alt="Image plante"
          id="image_produit"
        ></img>
      </div>
      <div className="details-list">
        <h1>{name}</h1>
        <p>Nom : {name}</p>
        <p>Plante {category}</p>
        <div className="careScaleDetails">
          <p> Echelle d'arrosage nécessaire : (1-3) </p>
          <CareScale careType="water" scaleValue={water} />
        </div>
        <div className="careScaleDetails">
          <p> Echelle de luminosité nécessaire : (1-3) </p>
          <CareScale careType="light" scaleValue={light} />
        </div>
        <p>Prix : {price} €</p>
        <p className="description">{description}</p>
        <button
          class="button-56"
          role="button"
          onClick={() => addToCart(name, price)}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default Details;
