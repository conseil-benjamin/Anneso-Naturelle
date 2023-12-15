import { useEffect, useState } from "react";
import PlantItem from "../../components/PlantItem/PlantItem";
import FiltreTrie from "../../components/FIltreTrie/FiltreTrie";
import Categories from "../../components/Categories/Categories";
import "./ShoppingList.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

function ShoppingList({ cart, updateCart }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [triageActive, setActiveTriage] = useState("");
  const [isAddElement, setAddElement] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [btnClique, setBtnDetailsClique] = useState(false);
  const navigate = useNavigate();
  const idClientStorage = localStorage.getItem("id");
  const [idClient, setIdClient] = useState(
    idClientStorage ? JSON.parse(idClientStorage) : []
  );
  const [productAdd, setProductAdd] = useState(false);
  let nameTable = plantList;
  const [favorite, setFavorite] = useState(false);
  /*
  const [favorite, setFavorite] = useState(
    nameTable.map(() => ({ isFavorite: false }))
  );
  console.log(favorite);
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/products");
        const plantList = await response.json();
        setPlantList(plantList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (productAdd) {
      navigate("/Panier");
      setProductAdd(false);
    }
  }, [productAdd]);

  const handleDetailsClique = (
    id,
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

  const handleClickFavoris = async (cover, price, name, id) => {
    /*
    setFavorite((prevEtats) => {
      const nouveauxEtats = [...prevEtats];
      nouveauxEtats[index] = { isFavorite: true };
      return nouveauxEtats;
    });
    setFavorite(true);
    */
    const favori = {
      idClient: idClient,
      coverArticle: cover,
      prixArticle: price,
      idProduct: id,
      nomArticle: name,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/favoris/insert/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favori),
        }
      );

      if (response.ok) {
        console.log("Données insérées avec succès!");
      } else {
        console.error("Erreur lors de l'insertion des données.");
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur:", error);
    }
  };

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
    setProductAdd(true);
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
    setAddElement(true);
  }

  return (
    <div className="lmj-shopping-list">
      <div className="categories-and-filtre-and-trie">
        <div className="categories">
          <Categories></Categories>
        </div>
        <div className="filtre-and-trie">
          <FiltreTrie
            categories={categories}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            triageActive={triageActive}
            setActiveTriage={setActiveTriage}
          />
        </div>
      </div>

      <ul className="lmj-plant-list">
        {nameTable.map(
          ({ id, cover, name, water, light, price, category, description }) =>
            !activeCategory || activeCategory === category ? (
              <div key={id} className="btn-plant">
                <PlantItem
                  id={id}
                  cover={cover}
                  name={name}
                  water={water}
                  light={light}
                  price={price}
                  description={description}
                  category={category}
                />
                <button onClick={() => addToCart(name, price)} id="btn-ajouter">
                  Ajouter
                </button>
                <button
                  id="btn-details-plant"
                  onClick={() =>
                    handleDetailsClique(
                      id,
                      cover,
                      name,
                      water,
                      light,
                      price,
                      description,
                      category
                    )
                  }
                >
                  Détails
                </button>
                {favorite ? (
                  <FontAwesomeIcon
                    icon={faHeartCircleCheck}
                    className="icon-signIn"
                    onClick={() => handleClickFavoris(cover, price, name, id)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeartCircleCheck}
                    className="icon-signIn"
                    onClick={() => handleClickFavoris(cover, price, name, id)}
                  />
                )}
              </div>
            ) : null
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
