import "./Categories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function Categories({
  braceletClique,
  boucleOreilleClique,
  encensClique,
  accesoiresClique,
  setBraceletsClique,
  setBoucleOreilleClique,
  setEncensClique,
  setAccesoiresClique,
  setToutClique,
  toutClique,
  triageActive,
  setActiveTriage,
  setproductList,
  activeCategory,
  minPriceForThisCategory,
  maxPriceForThisCategory,
}) {
  const [categoriesClique, setCategoriesClique] = useState(false);
  const [prixClique, setPrixClique] = useState(false);
  const [trieClique, setTrieClique] = useState(false);
  const [range, setRange] = useState([
    minPriceForThisCategory,
    maxPriceForThisCategory,
  ]);
  const [min, setMin] = useState(minPriceForThisCategory);
  const [max, setMax] = useState(maxPriceForThisCategory);
  const [changePriceClique, setChangePriceClique] = useState(false);
  const [hasPriceChanged, setPriceChanged] = useState(false);

  const handleSliderChange = (minParam, maxParam, range) => {
    setMin(minParam);
    setMax(maxParam);
    setRange(range);
    minParam !== min || maxParam !== max
      ? setPriceChanged(true)
      : setPriceChanged(false);
  };

  useEffect(
    () =>
      async function () {
        try {
          console.log(min, max);
          console.log(activeCategory);
          const response = await fetch(
            `http://localhost:5000/api/v1/products/${min}/${max}/${activeCategory}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
          } else {
            console.error("Erreur lors de l'insertion des données.");
          }
          const productList = await response.json();
          console.log(productList);
          setproductList(productList);
        } catch (error) {
          console.error("Erreur de connexion au serveur:", error);
        }
        setChangePriceClique(false);
      },
    [changePriceClique]
  );

  const handleDivClique = (filter) => {
    if (filter === "category" && !categoriesClique) {
      setCategoriesClique(true);
    } else if (filter === "category" && categoriesClique) {
      setCategoriesClique(false);
    } else if (filter === "prix" && !prixClique) {
      setPrixClique(true);
    } else if (filter === "prix" && prixClique) {
      setPrixClique(false);
    } else if (filter === "trie" && !trieClique) {
      setTrieClique(true);
    } else if (filter === "trie" && trieClique) {
      setTrieClique(false);
    }
    /**
     * ! Marche pas totalement
     * ! Marche bien pour la div mais pas pour les chevrons
         if (filter === "category") {
          setCategoriesClique((prev) => !prev);
        } else if (filter === "prix") {
          setPrixClique((prev) => !prev);
        }
     */
  };

  const trackStyle = {
    backgroundColor: "#434748", // Remplacez par la couleur que vous souhaitez
    height: 7,
  };

  return (
    <>
      <div className="main-div-categories">
        <div style={{ margin: "0 0 1em 0" }}>
          <FontAwesomeIcon icon={faFilter} style={{ fontSize: "1.25em" }} />
          <span style={{ margin: "0 0 0 0.5em", fontSize: "1.25em" }}>
            Filtrer
          </span>
        </div>
        <div className="categories-div">
          <div
            className="header-categories"
            onClick={() => handleDivClique("trie")}
          >
            <span>Trier par</span>
            {!trieClique ? (
              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() => setTrieClique(true)}
                className="icon-categories"
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faChevronUp}
                onClick={() => setTrieClique(false)}
                className="icon-categories"
              ></FontAwesomeIcon>
            )}
          </div>
          {trieClique ? (
            <>
              <div className="radio-trie-div">
                <label>
                  <input
                    type="radio"
                    value="nom"
                    checked={triageActive === "nom"}
                    onChange={(e) => setActiveTriage(e.target.value)}
                  ></input>
                  Nom
                </label>
              </div>
              <div className="radio-trie-div">
                <label>
                  <input
                    type="radio"
                    value="croissant"
                    checked={triageActive === "croissant"}
                    onChange={(e) => setActiveTriage(e.target.value)}
                  ></input>
                  Prix croissant
                </label>
              </div>
              <div className="radio-trie-div">
                <label>
                  <input
                    type="radio"
                    value="decroissant"
                    checked={triageActive === "decroissant"}
                    onChange={(e) => setActiveTriage(e.target.value)}
                  ></input>
                  Prix décroissant
                </label>
              </div>
            </>
          ) : null}
        </div>
        <div className="categories-div">
          <div
            className="header-categories"
            onClick={() => handleDivClique("category")}
          >
            <span>Catégorie</span>
            {!categoriesClique ? (
              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() => setCategoriesClique(true)}
                className="icon-categories"
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faChevronUp}
                onClick={() => setCategoriesClique(false)}
                className="icon-categories"
              ></FontAwesomeIcon>
            )}
          </div>

          {categoriesClique ? (
            <>
              <a
                onClick={() => setToutClique(true)}
                style={{
                  fontWeight: toutClique ? "bold" : "300",
                  fontSize: 16,
                }}
              >
                Tout
              </a>
              <a
                onClick={() => setBraceletsClique(true)}
                style={{
                  fontWeight: braceletClique ? "bold" : "300",
                  fontSize: 16,
                }}
              >
                Bracelets
              </a>

              <a
                onClick={() => setBoucleOreilleClique(true)}
                style={{
                  fontWeight: boucleOreilleClique ? "bold" : "300",
                  fontSize: 16,
                }}
              >
                Boucles d'oreilles
              </a>
              <a
                onClick={() => setEncensClique(true)}
                style={{
                  fontWeight: encensClique ? "bold" : "300",
                  fontSize: 16,
                }}
              >
                Esotérique Support à encens
              </a>
              <a
                onClick={() => setAccesoiresClique(true)}
                style={{
                  fontWeight: accesoiresClique ? "bold" : "300",
                  fontSize: 16,
                }}
              >
                Acessoires
              </a>
            </>
          ) : null}
        </div>
        <div className="categories-div">
          <div
            className="header-categories"
            onClick={() => handleDivClique("prix")}
          >
            <span>Prix</span>
            {!prixClique ? (
              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() => setPrixClique(true)}
                className="icon-categories"
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faChevronUp}
                onClick={() => setPrixClique(false)}
                className="icon-categories"
              ></FontAwesomeIcon>
            )}
          </div>
          {prixClique ? (
            <>
              <div className="div-max-and-min-filter">
                <input
                  onChange={(newRange) => setMin(newRange)}
                  value={min}
                ></input>
                <input
                  onChange={(newRange) => setMax(newRange)}
                  value={max}
                ></input>
              </div>
              <div className="slider-div">
                <Slider
                  range
                  defaultValue={[
                    minPriceForThisCategory,
                    maxPriceForThisCategory,
                  ]}
                  min={minPriceForThisCategory}
                  max={maxPriceForThisCategory}
                  value={range}
                  onChange={(range) =>
                    handleSliderChange(range[0], range[1], range)
                  }
                  trackStyle={[trackStyle]}
                />
                {hasPriceChanged ? (
                  <button
                    onClick={() => setChangePriceClique(true)}
                    id="btn-valider-filtre-prix"
                  >
                    Valider
                  </button>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Categories;
