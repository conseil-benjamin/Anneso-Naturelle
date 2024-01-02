import { useEffect, useState } from "react";
import PlantItem from "../../components/PlantItem/PlantItem";
import FiltreTrie from "../../components/FiltreTrie/FiltreTrie";
import Categories from "../../components/Categories/Categories";
import "./ShoppingList.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleCheck,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/fontawesome-free-regular";
import { Loader } from "../../utils/Loader";
import Cookies from "js-cookie";

function ShoppingList({ cart, updateCart }) {
  // console.log(cart);
  const [activeCategory, setActiveCategory] = useState("");
  const [triageActive, setActiveTriage] = useState("");
  const [isAddElement, setAddElement] = useState(false);
  const [productList, setproductList] = useState([]);
  const [btnClique, setBtnDetailsClique] = useState(false);
  const [toutClique, setToutClique] = useState(true);
  const [braceletsClique, setBraceletsClique] = useState(false);
  const [boucleOreilleClique, setBoucleOreilleClique] = useState(false);
  const [encensClique, setEncensClique] = useState(false);
  const [accesoiresClique, setAccesoiresClique] = useState(false);

  const navigate = useNavigate();
  const [productAdd, setProductAdd] = useState(false);
  let nameTable = productList;
  const [favorite, setFavorite] = useState(false);
  const jwtToken = Cookies.get("auth_token");

  /*
  const [favorite, setFavorite] = useState(
    nameTable.map(() => ({ isFavorite: false }))
  );
  console.log(favorite);
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://anneso-naturelle-api.onrender.com/api/v1/products"
        );
        const productList = await response.json();
        setproductList([]);
        setproductList(productList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (braceletsClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products/bracelets"
          );
          const productList = await response.json();
          setproductList([]);
          setproductList(productList);
          setAccesoiresClique(false);
          setBoucleOreilleClique(false);
          setEncensClique(false);
          setToutClique(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [braceletsClique]);

  useEffect(() => {
    if (accesoiresClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products/accessoires"
          );
          const productList = await response.json();
          setproductList([]);
          setproductList(productList);
          setBraceletsClique(false);
          setBoucleOreilleClique(false);
          setEncensClique(false);
          setToutClique(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [accesoiresClique]);

  useEffect(() => {
    if (toutClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products"
          );
          const productList = await response.json();
          setproductList([]);
          setproductList(productList);
          setBraceletsClique(false);
          setBoucleOreilleClique(false);
          setEncensClique(false);
          setAccesoiresClique(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [toutClique]);

  useEffect(() => {
    if (encensClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products/encens"
          );
          const productList = await response.json();
          setproductList([]);
          setproductList(productList);
          setBraceletsClique(false);
          setBoucleOreilleClique(false);
          setAccesoiresClique(false);
          setToutClique(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [encensClique]);

  useEffect(() => {
    if (boucleOreilleClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products/boucles-oreilles"
          );
          const productList = await response.json();
          setproductList([]);
          setproductList(productList);
          setBraceletsClique(false);
          setAccesoiresClique(false);
          setEncensClique(false);
          setToutClique(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [boucleOreilleClique]);

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
      idClient: jwtToken,
      coverArticle: cover,
      prixArticle: price,
      idProduct: id,
      nomArticle: name,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/favoris/insert",
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

  if (triageActive) {
    nameTable = [...productList]; // Créer une copie pour ne pas modifier productList directement

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

  function addToCart(cover, name, price) {
    setProductAdd(true);
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      let amountTotal = currentPlantSaved.amount;
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateCart([
        ...cartFilteredCurrentPlant,
        { cover, name, price, amount: amountTotal + 1 },
      ]);
      localStorage.setItem("nbElement", JSON.stringify(amountTotal + 1));
    } else {
      updateCart([...cart, { cover, name, price, amount: 1 }]);
      localStorage.setItem("nbElement", JSON.stringify(1));
      const nbArticles = JSON.parse(localStorage.getItem("nbArticles"));
      localStorage.setItem("nbArticles", JSON.stringify(nbArticles + 1));
    }
    setAddElement(true);
  }

  return (
    <div className="lmj-shopping-list">
      <div className="categories-and-filtre-and-trie">
        {/* <div className="div-recherche-produit">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          <input></input>
        </div> */}
        <Categories
          braceletClique={braceletsClique}
          boucleOreilleClique={boucleOreilleClique}
          encensClique={encensClique}
          accesoiresClique={accesoiresClique}
          setBraceletsClique={setBraceletsClique}
          setAccesoiresClique={setAccesoiresClique}
          setBoucleOreilleClique={setBoucleOreilleClique}
          setEncensClique={setEncensClique}
          setToutClique={setToutClique}
          toutClique={toutClique}
          triageActive={triageActive}
          setActiveTriage={setActiveTriage}
        ></Categories>
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
                <button
                  onClick={() => addToCart(cover, name, price)}
                  id="btn-ajouter"
                >
                  Ajouter
                </button>
                {/**
                   
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
                  */}

                {favorite ? (
                  <FontAwesomeIcon
                    icon={faHeartCircleCheck}
                    className="icon-signIn"
                    onClick={() => handleClickFavoris(cover, price, name, id)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
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
