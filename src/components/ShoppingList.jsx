import { useState } from "react";
import { plantList } from "../datas/plantList";
import PlantItem from "./PlantItem";
import Categories from "./Categories";
import "../styles/ShoppingList.css";
import { Link } from "react-router-dom";

function ShoppingList({ cart, updateCart }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [triageActive, setActiveTriage] = useState("");

  let nameTable = plantList;

  // Appliquer le tri si triageActive est défini
  if (triageActive) {
    nameTable = [...plantList]; // Créer une copie pour ne pas modifier plantList directement

    /* Mon code :
    if (triageActive === "croissant") {
      nameTable = nameTable.sort((a, b) => a.price - b.price);
    } else if (triageActive === "decroissant") {
      nameTable = nameTable.sort((a, b) => b.price - a.price);
    } else if (triageActive === "moinsArrosage") {
      nameTable = nameTable.sort((a, b) => a.water - b.water);
    } else if (triageActive === "plusArrosage") {
      nameTable = nameTable.sort((a, b) => b.water - a.water);
    } else if (triageActive === "moinsLumiere") {
      nameTable = nameTable.sort((a, b) => a.light - b.light);
    } else if (triageActive === "plusLumiere") {
      nameTable = nameTable.sort((a, b) => b.light - a.light);
    } else if (triageActive === "nom") {
      nameTable = nameTable.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
*/

    // code plus concis :
    const sortFunctions = {
      croissant: (a, b) => a.price - b.price,
      decroissant: (a, b) => b.price - a.price,
      moinsArrosage: (a, b) => a.water - b.water,
      plusArrosage: (a, b) => b.water - a.water,
      moinsLumiere: (a, b) => a.light - b.light,
      plusLumiere: (a, b) => b.light - a.light,
      nom: (a, b) => (a.name > b.name ? 1 : -1),
    };

    if (sortFunctions[triageActive]) {
      nameTable = [...nameTable].sort(sortFunctions[triageActive]);
    }
  }
  const categories = plantList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  );

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
    } else {
      updateCart([...cart, { name, price, amount: 1 }]);
    }
  }

  return (
    <div className="lmj-shopping-list">
      <Categories
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        triageActive={triageActive}
        setActiveTriage={setActiveTriage}
      />
      <ul className="lmj-plant-list">
        {nameTable.map(
          ({ id, cover, name, water, light, price, category, description }) =>
            !activeCategory || activeCategory === category ? (
              <div key={id} className="btn-plant">
                <PlantItem
                  cover={cover}
                  name={name}
                  water={water}
                  light={light}
                  price={price}
                  description={description}
                />
                <button onClick={() => addToCart(name, price)}>Ajouter</button>
                <Link
                  to={{
                    pathname: "/Details",
                    state: {
                      cover,
                      name,
                      water,
                      light,
                      price,
                      category,
                      description,
                    },
                  }}
                >
                  <button>Détails</button>
                </Link>
              </div>
            ) : null
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
