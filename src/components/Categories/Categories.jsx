import "./Categories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
  return (
    <>
      {
        // faire du css in js pour appliquer une bordure bottom à l'élément qui est actuellement sélectionner
        // pour cela on récupère en props de composant le state qui stock le <a> qui est actuellement sélectionner
        // ou alors via l'url, on récupère l'url imaginons -> /collections/bracelets
      }
      <div className="main-div-categories">
        <span>Filtrer par </span>
        <hr className="hr-horizontal-categories" />
        <div className="categories-div">
          <span>Catégorie</span>
          {!categoriesClique ? (
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => setCategoriesClique(true)}
              className="icon-categories"
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              icon={faMinus}
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
                fontSize: 18,
              }}
            >
              Tout
            </a>
            <a
              onClick={() => setBraceletsClique(true)}
              style={{
                fontWeight: braceletClique ? "bold" : "300",
                fontSize: 18,
              }}
            >
              Bracelets
            </a>

            <a
              onClick={() => setBoucleOreilleClique(true)}
              style={{
                fontWeight: boucleOreilleClique ? "bold" : "300",
                fontSize: 18,
              }}
            >
              Boucles d'oreilles
            </a>
            <a
              onClick={() => setEncensClique(true)}
              style={{
                fontWeight: encensClique ? "bold" : "300",
                fontSize: 18,
              }}
            >
              Esotérique Support à encens
            </a>
            <a
              onClick={() => setAccesoiresClique(true)}
              style={{
                fontWeight: accesoiresClique ? "bold" : "300",
                fontSize: 18,
              }}
            >
              Acessoires
            </a>
          </>
        ) : null}
        <hr className="hr-horizontal-categories" />
        <span>Trier par </span>
      </div>
    </>
  );
}

export default Categories;
