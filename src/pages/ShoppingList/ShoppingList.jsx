import { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import Categories from "../../components/Categories/Categories";
import "./ShoppingList.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleCheck,
  faSearch,
  faFilter, faXmark
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/fontawesome-free-regular";
import { Loader } from "../../utils/Loader";
import Cookies from "js-cookie";
import login from "../Login/Login";

function ShoppingList({ cart, updateCart }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [triageActive, setActiveTriage] = useState("");
  const [isAddElement, setAddElement] = useState(false);
  const [productList, setproductList] = useState([]);
  const [toutClique, setToutClique] = useState(false);
  const [braceletsClique, setBraceletsClique] = useState(false);
  const [boucleOreilleClique, setBoucleOreilleClique] = useState(false);
  const [encensClique, setEncensClique] = useState(false);
  const [accesoiresClique, setAccesoiresClique] = useState(false);
  const [minPriceForThisCategory, setminPriceForThisCategory] = useState(0);
  const [maxPriceForThisCategory, setmaxPriceForThisCategory] = useState(1);
  const [filtreMobileOpen, setfiltreMobileOpen] = useState(false);
  const [filtreStatus, setFiltreStatus] = useState(true);
  const [cancelFiltre, setCancelFiltre] = useState(false);
  const [isBtnValiderfiltreMobileOpenClique, setBtnValiderfiltreMobileOpenClique] =
      useState(false);

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
          setproductList(productList);
          setBraceletsClique(false);
          setBoucleOreilleClique(false);
          setEncensClique(false);
          setAccesoiresClique(false);
          setDataLoading(false);
          setActiveCategory("tout");
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

  const trie = () => {
    nameTable = [...productList];

    const sortFunctions = {
      croissant: (a, b) => a.price - b.price,
      decroissant: (a, b) => b.price - a.price,
      nom: (a, b) => (a.name > b.name ? 1 : -1),
      /**
       *
       *       moinsArrosage: (a, b) => a.water - b.water,
       *       plusArrosage: (a, b) => b.water - a.water,
       *       moinsLumiere: (a, b) => a.light - b.light,
       *       plusLumiere: (a, b) => b.light - a.light,
       */
    };

    if (sortFunctions[triageActive]) {
      nameTable = [...nameTable].sort(sortFunctions[triageActive]);
    }
  }

  if (filtreMobileOpen && triageActive){
    nameTable = [...productList];
  }
  else if(triageActive) {
    trie();
  }

  function addToCart(cover, name, price, idProduct) {
    setProductAdd(true);
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      let amountTotal = currentPlantSaved.amount;
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateCart([
        ...cartFilteredCurrentPlant,
        { cover, name, price, idProduct, amount: amountTotal + 1 },
      ]);
      localStorage.setItem("nbElement", JSON.stringify(amountTotal + 1));
    } else {
      updateCart([...cart, { cover, name, price, idProduct, amount: 1 }]);
      localStorage.setItem("nbElement", JSON.stringify(1));
      const nbArticles = JSON.parse(localStorage.getItem("nbArticles"));
      localStorage.setItem("nbArticles", JSON.stringify(nbArticles + 1));
    }
    setAddElement(true);
  }

  const cancelAndClosefiltreMobileOpen = () => {
    console.log(triageActive + " " + " " + isBtnValiderfiltreMobileOpenClique);
    if (isBtnValiderfiltreMobileOpenClique) {
      setActiveTriage("");
      trie(); // Appliquer le tri ici si le bouton de validation a été cliqué
    } else {
      setActiveTriage(""); // Ne pas appliquer le tri si le bouton de validation n'a pas été cliqué
    }
    setBtnValiderfiltreMobileOpenClique(false);
    setfiltreMobileOpen(false);
  };


  const validerTrie = () => {
    setBtnValiderfiltreMobileOpenClique(true);
    console.log(triageActive + " " + " " + isBtnValiderfiltreMobileOpenClique);
    (triageActive && isBtnValiderfiltreMobileOpenClique) && trie();
    setfiltreMobileOpen(false);
  }

  const openfiltreMobileOpen = () => {
    setfiltreMobileOpen(true);
    setCancelFiltre(false);
    setBtnValiderfiltreMobileOpenClique(false);
    console.log(triageActive);
  }

  return (
<>
      {filtreMobileOpen ? (
          <>
            <div>
              <FontAwesomeIcon icon={faXmark} size="2x" id={"xmark-filtre-mobile"} onClick={() => cancelAndClosefiltreMobileOpen()} style={{cursor: "pointer"}}/>
            </div>
          <div className={"categories-div-mobile"}>
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
                productList={productList}
                setproductList={setproductList}
            ></Categories>
            <button onClick={() => validerTrie()}>Valider</button>
          </div>
          </>
            ) : (
      <div className="lmj-shopping-list">
        <div className="div-recherche-produit">
          <input style={{cursor: "default"}}></input>
          <FontAwesomeIcon
              icon={faSearch}
              className="search-bar-class"
          ></FontAwesomeIcon>
        </div>
        <div className="div-button-filtre-mobile-vue" onClick={() => openfiltreMobileOpen()
        }>
        <button>
          <FontAwesomeIcon icon={faFilter} style={{margin: "0 0.5em 0 0"}}></FontAwesomeIcon>
          Filtrer
        </button>
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
                productList={productList}
            ></Categories>
          </div>
          <ul className="lmj-plant-list">
            {isDataLoading ? (
                <div className="loader-div-shopping-list">
                  <Loader/>
                </div>
            ) : (
                console.log(nameTable),
                console.log(productList),
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
                              <ProductItem
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
                                    onClick={() => addToCart(cover, name, price, id)}
                                    id="btn-ajouter"
                                >
                                  Ajouter au panier
                                </button>
                                {favorite ? (
                                    <FontAwesomeIcon
                                        icon={faHeartCircleCheck}
                                        className="icon-signIn"
                                        onClick={() =>
                                            handleClickFavoris(cover, price, name, id)
                                        }
                                        style={{fontSize: "1.25em"}}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className="icon-signIn"
                                        onClick={() =>
                                            handleClickFavoris(cover, price, name, id)
                                        }
                                        style={{fontSize: "1.25em"}}
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
        )}
</>
  );
}

export default ShoppingList;
