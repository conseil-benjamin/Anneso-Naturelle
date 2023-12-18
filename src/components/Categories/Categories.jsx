import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Categories.css";

function Categories() {
  return (
    <>
      {
        // faire du css in js pour appliquer une bordure bottom à l'élément qui est actuellement sélectionner
        // pour cela on récupère en props de composant le state qui stock le <a> qui est actuellement sélectionner
        // ou alors via l'url, on récupère l'url imaginons -> /collections/bracelets
      }
      <div className="main-div-categories">
        <div className="div-icon-search">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </div>
        <div>
          <a>Bracelets</a>
          <a>Boucles d'oreilles</a>
          <a>Esotérique Support à encens</a>
          <a>Acessoires</a>
        </div>
      </div>
    </>
  );
}

export default Categories;
