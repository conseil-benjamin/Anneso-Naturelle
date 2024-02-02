import { useNavigate } from "react-router-dom";
import "./ProductItem.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeartCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/fontawesome-free-regular";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function ProductItem({
  id,
  cover,
  name,
  price,
  description,
  category,
    pierres
}) {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  const jwtToken = Cookies.get("auth_token");
  const [favoriteAddOrRemove, setFavoriteAddOrRemove] = useState(false);

  const handleDetailsClique = (
    cover,
    name,
    water,
    light,
    price,
    description,
    category, pierres
  ) => {
    navigate("/Details/" + id, {
      state: {
        id: id,
        cover: cover,
        name: name,
        price: price,
        description: description,
        category: category,
        pierres: pierres,
      },
    });
  };



  useEffect(() => {
    if (!jwtToken){
      return;
    }
    const getFavoriteStatus = async () => {
      try {
        const response = await fetch(
            `http://localhost:5000/api/v1/favoris/get-status-favori`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify({idProduct: id}),
            }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setFavorite(true);
          }
        }
        setFavoriteAddOrRemove(false);
      } catch (error) {
        console.error("Erreur de connexion au serveur:", error);
      }
    };
    getFavoriteStatus().then((r) => r);
  }, [favoriteAddOrRemove, jwtToken]);

  const handleClickFavoris = async (cover, price, name, id) => {
    const favori = {
      idClient: jwtToken,
      coverArticle: cover,
      prixArticle: price,
      idProduct: id,
      nomArticle: name,
    };

    if (favorite){
      try {
        const response = await fetch(
            "http://localhost:5000/api/v1/favoris/delete",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify({
                idProduct: id,
              }),
            }
        );

        if (response.ok) {
          setFavorite(false);
          Swal.fire({
            text: "Produit supprimé des favoris avec succès !",
            toast: true,
            showConfirmButton: false,
            background: "#22242a",
            timer: 2000,
            position: "top-start",
            padding: "0.5em",
            color: "#ffffff",
          });
        } else {
          console.error("Erreur lors de la suppression des données.");
        }
        setFavoriteAddOrRemove(true);
      } catch (error) {
        console.error("Erreur de connexion au serveur:", error);
      }
    } else{
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
          Swal.fire({
            text: "Produit ajouté au favoris avec succès.",
            toast: true,
            showConfirmButton: false,
            background: "#22242a",
            timer: 2000,
            padding: "0.5em",
            color: "#ffffff",
            position: "top-start",
            timerProgressBar: true,
            customClass: {
              timerProgressBar: "background-color: #ffffff !important",
            }
          });
          setFavoriteAddOrRemove(true);
        } else {
          Swal.fire({
            text: "Veuillez vous connecter ou créer un compte pour mettre des produits en favoris.",
            showConfirmButton: true,
            background: "#22242a",
            timer: 2500,
            padding: "0.5em",
            color: "#ffffff",
          });
        }
      } catch (error) {
        console.error("Erreur de connexion au serveur:", error);
      }
    }
  };

  return (
    <div className="lmj-plant-item">
      <img
        className="lmj-plant-item-cover"
        src={cover}
        alt={`${name} cover`}
        onClick={() =>
          handleDetailsClique(
            cover,
            name,
            price,
            description,
            category
          )
        }
      />
      <div className={"infos-product-cart-plus-heart"} style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
        <div className="product-item-infos">
          <div className="container-left-infos-product">{name}</div>
          <div>
            <span className="lmj-plant-item-price">{price}€</span>
          </div>
        </div>
        <div>
          {favorite ? (
              <FontAwesomeIcon
                  icon={faHeartCircleCheck}
                  className="icon-signIn"
                  onClick={() =>
                      handleClickFavoris(cover, price, name, id)
                  }
                  style={{fontSize: "1.25em", cursor: "pointer"}}
              />
          ) : (
              <FontAwesomeIcon
                  icon={faHeart}
                  className="icon-signIn"
                  onClick={() =>
                      handleClickFavoris(cover, price, name, id)
                  }
                  style={{fontSize: "1.25em", cursor: "pointer"}}
              />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
