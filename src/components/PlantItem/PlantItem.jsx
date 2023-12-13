import { useNavigate } from "react-router-dom";
import CareScale from "../CareScale/CareScale";
import "./PlantItem.css";

function PlantItem({
  id,
  cover,
  name,
  water,
  light,
  price,
  description,
  category,
}) {
  const navigate = useNavigate();
  const handleDetailsClique = (
    cover,
    name,
    water,
    light,
    price,
    description,
    category
  ) => {
    navigate("/Details/" + id, {
      state: {
        id: id,
        cover: cover,
        name: name,
        water: water,
        light: light,
        price: price,
        description: description,
        category: category,
      },
    });
  };
  return (
    <li className="lmj-plant-item">
      <img
        className="lmj-plant-item-cover"
        src={cover}
        alt={`${name} cover`}
        onClick={() =>
          handleDetailsClique(
            cover,
            name,
            water,
            light,
            price,
            description,
            category
          )
        }
      />
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
