import { Link, useLocation } from "react-router-dom";
import "../styles/Details.css";
import CareScale from "./CareScale";

function Details() {
  const location = useLocation();
  const { state } = location;
  console.log(state);

  const { cover, name, water, light, price, category, description } =
    state || {};

  return (
    <div className="bodyElementDetails">
      <div className="return">
        <Link to="/">
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

      <div className="details-list">
        <h1>Détails plante : {cover}</h1>
        <img src={cover} width={250} height={250} alt="Image plante"></img>
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
      </div>
      <div className="div-Btn-Commande">
        <button class="button-56" role="button">
          Commander
        </button>
      </div>
    </div>
  );
}

export default Details;
