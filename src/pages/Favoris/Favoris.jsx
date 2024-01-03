import { useLocation } from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./Favoris.css";
import CardFavoris from "../../components/CardFavoris/CardFavoris";
import PropTypes from "prop-types";

function Favoris() {
  const location = useLocation();
  const { favoris } = location.state || {};

  const tableauObjet = Object.values(favoris);
  console.log(tableauObjet);

  return (
    <div className="body-page-favoris">
      <NavBarProfil></NavBarProfil>
      <div>
        <div>
          <h1>Mes Favoris</h1>
        </div>
        <div className="container-right-favoris">
          {favoris ? (
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
            <div>
              <h1>Aucun favoris pour le moment</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favoris;
