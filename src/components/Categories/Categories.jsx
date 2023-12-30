import "./Categories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
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
}) {
  const [categoriesClique, setCategoriesClique] = useState(false);
  const [prixClique, setPrixClique] = useState(false);
  const [trieClique, setTrieClique] = useState(false);
  const [range, setRange] = useState([0, 100]); // Valeurs initiales du slider
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const handleSliderChange = (min, max, range) => {
    setMin(min);
    setMax(max);
    setRange(range);
  };

  const handleDivClique = (filter) => {
    if (filter === "category" && !categoriesClique) {
      setCategoriesClique(true);
    } else if (filter === "category" && categoriesClique) {
      setCategoriesClique(false);
    } else if (filter === "prix" && !prixClique) {
      setPrixClique(true);
    } else if (filter === "prix" && prixClique) {
      setPrixClique(false);
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
          <FontAwesomeIcon icon={faFilter} />
          <span style={{ margin: "0 0 0 0.5em" }}>Filtrer</span>
        </div>
        <div className="categories-div">
          <div className="header-categories">
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
              <div>
                <Slider
                  range
                  defaultValue={[0, 100]}
                  min={0}
                  max={100}
                  value={range}
                  onChange={(range) =>
                    handleSliderChange(range[0], range[1], range)
                  }
                  trackStyle={[trackStyle]}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Categories;
