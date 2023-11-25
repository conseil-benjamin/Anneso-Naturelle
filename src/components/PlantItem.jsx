import CareScale from "./CareScale";
import "../styles/PlantItem.css";

function PlantItem({ cover, name, water, light, price }) {
  return (
    <li className="lmj-plant-item">
      <img className="lmj-plant-item-cover" src={cover} alt={`${name} cover`} />
      {name}
      <span className="lmj-plant-item-price">{price}€</span>
      <div>
        <CareScale careType="water" scaleValue={water} />
        <CareScale careType="light" scaleValue={light} />
      </div>
    </li>
  );
}

export default PlantItem;
