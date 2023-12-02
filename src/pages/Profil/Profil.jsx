import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Profil.css";

function Profil() {
  const location = useLocation();
  const {
    id,
    nom,
    prenom,
    adresses,
    adresseEmail,
    mdp,
    numeroTel,
    iconProfil,
  } = location.state || {};
  const navigate = useNavigate();

  function deconnect() {
    localStorage.removeItem("id");
    navigate("/");
  }

  return (
    <div className="div-infos-client">
      <img src={iconProfil} alt="icone_profil"></img>
      <div className="navbar-profil">
        <a href="profil/infos-perso">Infos personnelles</a>
        <hr />
        <a href="profil/infos-perso">Mes adresses</a>
        <hr />
        <a href="profil/infos-perso">Mes commandes</a>
      </div>
      <div className="div-infos-perso">
        <h2>Identifiant {id}</h2>
        <h2>Nom : {nom}</h2>
        <h2>Prénom : {prenom}</h2>
        <h2>Adresse(s) : {adresses}</h2>
        <h2>Adresse Email : {adresseEmail}</h2>
        <h2>Mot de passe : {mdp}</h2>
        <h2>Numéro de téléphone : {numeroTel}</h2>
      </div>

      <button className="btn-sign-out" onClick={() => deconnect()}>
        Se déconnecter
        <FontAwesomeIcon className="icon-signOut" icon={faSignOutAlt} />
      </button>
    </div>
  );
}

export default Profil;
