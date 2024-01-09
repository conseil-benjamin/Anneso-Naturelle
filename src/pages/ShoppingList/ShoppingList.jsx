import { useEffect, useState } from "react";
import PlantItem from "../../components/ProductItem/ProductItem";
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
  const [activeCategory, setActiveCategory] = useState("");
  const [triageActive, setActiveTriage] = useState("");
  const [isAddElement, setAddElement] = useState(false);
  const [productList, setproductList] = useState([]);
  const [toutClique, setToutClique] = useState(true);
  const [braceletsClique, setBraceletsClique] = useState(false);
  const [boucleOreilleClique, setBoucleOreilleClique] = useState(false);
  const [encensClique, setEncensClique] = useState(false);
  const [accesoiresClique, setAccesoiresClique] = useState(false);
  const [minPriceForThisCategory, setminPriceForThisCategory] = useState(0);
  const [maxPriceForThisCategory, setmaxPriceForThisCategory] = useState(1);

  const navigate = useNavigate();
  const [productAdd, setProductAdd] = useState(false);
  let nameTable = productList;
  const [favorite, setFavorite] = useState(false);
  const jwtToken = Cookies.get("auth_token");
  const [isDataLoading, setDataLoading] = useState(false);

  const setMinAndMaxPrice = (productList) => {
    const minPrice = Math.min(...productList.map((product) => product.price));
    const maxPrice = Math.max(...productList.map((product) => product.price));
    setminPriceForThisCategory(minPrice);
    setmaxPriceForThisCategory(maxPrice);
  };

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const response = await fetch(
          "https://anneso-naturelle-api.onrender.com/api/v1/products"
        );
        const productList = await response.json();
        setMinAndMaxPrice(productList);
        setproductList([]);
        setActiveCategory("tout");
        setproductList(productList);
        console.log(productList);
        setDataLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (braceletsClique) {
      const fetchData = async () => {
        setDataLoading(true);
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products/bracelets"
          );
          const productList = await response.json();
          setMinAndMaxPrice(productList);
          setproductList([]);
          setActiveCategory("bracelet");
          setproductList(productList);
          setAccesoiresClique(false);
          setBoucleOreilleClique(false);
          setEncensClique(false);
          setToutClique(false);
          setDataLoading(false);
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
        setDataLoading(true);
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products/accessoires"
          );
          const productList = await response.json();
          setMinAndMaxPrice(productList);
          setproductList([]);
          setMinAndMaxPrice(productList);
          setActiveCategory("accessoire");
          setproductList(productList);
          setBraceletsClique(false);
          setBoucleOreilleClique(false);
          setEncensClique(false);
          setToutClique(false);
          setDataLoading(false);
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
        setDataLoading(true);
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products"
          );
          const productList = await response.json();
          setMinAndMaxPrice(productList);
          setproductList([]);
          setActiveCategory("tout");
          setproductList(productList);
          setMinAndMaxPrice(productList);
          setBraceletsClique(false);
          setBoucleOreilleClique(false);
          setEncensClique(false);
          setAccesoiresClique(false);
          setDataLoading(false);
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
        setDataLoading(true);
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products/encens"
          );
          const productList = await response.json();
          setMinAndMaxPrice(productList);
          setproductList([]);
          setActiveCategory("encen");
          setproductList(productList);
          setMinAndMaxPrice(productList);
          setBraceletsClique(false);
          setBoucleOreilleClique(false);
          setAccesoiresClique(false);
          setToutClique(false);
          setDataLoading(false);
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
        setDataLoading(true);
        try {
          const response = await fetch(
            "https://anneso-naturelle-api.onrender.com/api/v1/products/boucles-oreilles"
          );
          const productList = await response.json();
          setMinAndMaxPrice(productList);
          setproductList([]);
          setActiveCategory("boucleOreille");
          setproductList(productList);
          setBraceletsClique(false);
          setAccesoiresClique(false);
          setEncensClique(false);
          setToutClique(false);
          setDataLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [boucleOreilleClique]);

  useEffect(() => {
    if (productAdd) {
      navigate("/panier");
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
    navigate("/details/" + id, {
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
            Authorization: `Bearer ${jwtToken}`,
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
      <div className="div-recherche-produit">
        <input></input>
        <FontAwesomeIcon
          icon={faSearch}
          className="search-bar-class"
        ></FontAwesomeIcon>
      </div>
      <div className="div-categories-plus-products-list">
        <div className="categories-and-filtre-and-trie">
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
            setproductList={setproductList}
            activeCategory={activeCategory}
            minPriceForThisCategory={minPriceForThisCategory}
            maxPriceForThisCategory={maxPriceForThisCategory}
          ></Categories>
        </div>
        <ul className="lmj-plant-list">
          {isDataLoading ? (
            <div className="loader-div-shopping-list">
              <Loader />
            </div>
          ) : (
            nameTable.map(
              ({
                id,
                cover,
                name,
                water,
                light,
                price,
                category,
                description,
              }) =>
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
                    <div className="button-add-to-basket-plus-heart">
                      <button
                        onClick={() => addToCart(cover, name, price)}
                        id="btn-ajouter"
                      >
                        Ajouter
                      </button>
                      {favorite ? (
                        <FontAwesomeIcon
                          icon={faHeartCircleCheck}
                          className="icon-signIn"
                          onClick={() =>
                            handleClickFavoris(cover, price, name, id)
                          }
                          style={{ fontSize: "1.25em" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="icon-signIn"
                          onClick={() =>
                            handleClickFavoris(cover, price, name, id)
                          }
                          style={{ fontSize: "1.25em" }}
                        />
                      )}
                    </div>
                  </div>
                ) : null
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingList;
