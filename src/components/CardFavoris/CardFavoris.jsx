import { useState, useEffect } from "react";
import "./CardFavoris.css";
import PropTypes from "prop-types"; // ES6
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
      } else {
        console.error("Erreur lors de la suppression des données.");
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur:", error);
    }
  };

  useEffect(() => {
    if (imageClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/v1/products/" + idProduct
          );
          console.log(response);
          const product = await response.json();
          console.log(product);
          if (product) {
            navigate("/Details/" + idProduct, {
              state: {
                cover: product.cover,
                name: product.nom,
                water: product.water,
                light: product.light,
                price: product.price,
                description: product.description,
                category: product.category,
              },
            });
          } else {
            Swal.fire({
              text: "Erreur lors de la récupération de vos données ",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [imageClique]);

  return (
    <div className="div-commande">
      <div className="container-left">
        <img
          src={coverArticle}
          width={150}
          height={150}
          onClick={() => setImageClique(true)}
        ></img>
      </div>
      <div>
        <h4>{nomArticle}</h4>
        <h4>{prixArticle} €</h4>
      </div>
      <div className="container-right">
        <FontAwesomeIcon
          icon={faXmark}
          className="fa-2x"
          onClick={() => handleDeleteFavorite()}
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
