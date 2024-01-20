import { useState, useEffect } from "react";
import "./CardFavoris.css";
import "../../styles/colors.scss";
import PropTypes from "prop-types"; // ES6
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import RedirectToProductDetails from "../RedirectToProductsDetails/RedirectToProductDetails";
function CardFavoris({ coverArticle, prixArticle, nomArticle, idProduct }) {
  const [imageClique, setImageClique] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");

  const handleDeleteFavorite = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/favoris/delete/" + idProduct,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Données supprimé avec succès!");
        Swal.fire({
          text: "Produit supprimé des favoris avec succès !",
          toast: true,
          showConfirmButton: false,
          background: "#22242a",
          timer: 2000,
          position: "top-start",
          padding: "0.5em",
          color: "#ffffff",
          customClass: {
            toast: 'toast-custom'
          }
        });
      } else {
        console.error("Erreur lors de la suppression des données.");
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur:", error);
    }
  };

  return (
    <div className="div-favori">
      <div className="container-left">
        <img src={coverArticle} onClick={() => setImageClique(true)}></img>
        {imageClique && (
            <RedirectToProductDetails
                idProduct={idProduct}
                imageClique={imageClique}
            />
        )}
      </div>
      <div className="infos-produit-favoris-card">
        <h4>{nomArticle}</h4>
        <h4>{prixArticle} €</h4>
      </div>
      <div className="container-right">
        <FontAwesomeIcon
          icon={faXmark}
          className="fa-2x"
          onClick={() => handleDeleteFavorite()}
          style={{ margin: "0.3em 0.3em 0 0", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
CardFavoris.propTypes = {
  coverArticle: PropTypes.string.isRequired,
  prixArticle: PropTypes.number.isRequired,
  nomArticle: PropTypes.string.isRequired,
  idProduct: PropTypes.string.isRequired,
};

export default CardFavoris;
