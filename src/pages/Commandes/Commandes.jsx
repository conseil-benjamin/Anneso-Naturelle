import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import ButtonDeconnect from "../../components/Button Deconnect/ButtonDeconnect";

function Commandes() {
  const location = useLocation();
  const { idCommande, date, prixTotal, contenuCommande } = location.state || {};

  const isLogged = localStorage.getItem("id");

  // faire en sorte que quand le client arrive sur cette page sans cliquer sur un bouton qui l'anmmène (un navigate)
  // on récupère son id, et on refais une requete api pour récupérer les données du client connecté
  // a voir plus tard - pas essentielle maintenant
  const [clientId, setClientId] = useState(
    isLogged ? JSON.parse(isLogged) : null
  );
  //!location.state && isLogged ?

  return (
    <>
      <div className="div-main-profil">
        <NavBarProfil></NavBarProfil>
        <div className="div-commandes">
          {idCommande ? (
            <div className="div-une-commande">
              <h1>Vos Commandes</h1>
              <h2>Id :{idCommande}</h2>
              <h2>Date : {date}</h2>
              <h2>Contenu commande : {contenuCommande}</h2>
              <h2>Prix total : {prixTotal}</h2>
            </div>
          ) : (
            <div>
              <h1>Aucune commande pour le moment.</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Commandes;
