import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./Adresses.css";

function Adresses() {
  const location = useLocation();
  const {
    idClient,
    nom,
    prenom,
    adresse,
    codePostal,
    ville,
    complementAdresse,
    pays,
  } = location.state || {};

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
      <div className="div-main-page-adresses">
        <NavBarProfil></NavBarProfil>
        <div className="div-adresses">
          <div className="div-une-adresse">
            <h1>Vos Adresses</h1>
            <p>Nom :{nom}</p>
            <p>Prenom : {prenom}</p>
            <p>Adresse : {adresse}</p>
            <p>Code Postal: {codePostal}</p>
            <p>ville: {ville}</p>
            <p>Complément adresse : {complementAdresse}</p>
            <p>Pays : {pays}</p>
            <button>Ajouter une adresse</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adresses;
