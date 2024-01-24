import { useLocation } from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./Favoris.css";
import CardFavoris from "../../components/CardFavoris/CardFavoris";
import PropTypes from "prop-types";
import {useEffect} from "react";

function Favoris() {
  const location = useLocation();
  const { favoris } = location.state || {};

  const tableauObjet = Object.values(favoris);

  useEffect(() => {

  }, [favoris]);

  return (
    <div className="body-page-favoris">
      <NavBarProfil></NavBarProfil>
      <div>
        <div>
          <h1>Mes Favoris</h1>
        </div>
        <div className="container-right-favoris">
          {favoris.length > 0 ? (
              console.log(favoris),
            tableauObjet.map((favori) => (
              <CardFavoris
                key={favori.clientId}
                coverArticle={favori.coverArticle}
                prixArticle={favori.prixArticle}
                nomArticle={favori.nomArticle}
                idProduct={favori.idProduct}
              ></CardFavoris>
            ))
          ) : (
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <h2>Aucun favoris pour le moment</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favoris;
