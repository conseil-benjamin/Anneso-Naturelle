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
    <div className="lmj-plant-item">
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
      <div className="product-item-infos">
       {name}
       <span className="lmj-plant-item-price">{price}€</span>
      </div>
    </div>
  );
}

export default PlantItem;
