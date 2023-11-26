import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Profil.css";

function Profil() {
  const location = useLocation();
  const {
    id,
    name,
    prenom,
    age,
    adresses,
    adresseEmail,
    mdp,
    numeroTel,
    statusClient,
    historiqueCommandes,
  } = location.state || {};
  const navigate = useNavigate();

  function deconnect() {
    localStorage.removeItem("id");
    navigate("/");
  }

  return (
    <div>
      <h1>Salut {id}</h1>
      <h1>Salut {name}</h1>
      <h1>Salut {prenom}</h1>
      <h1>Salut {age}</h1>
      <h1>Salut {adresses}</h1>
      <h1>Salut {adresseEmail}</h1>
      <h1>Salut {mdp}</h1>
      <h1>Salut {numeroTel}</h1>
      <h1>Salut {statusClient}</h1>
      <h1>Salut {historiqueCommandes}</h1>

      <button className="btn-sign-out" onClick={() => deconnect()}>
        Se déconnecter
        <FontAwesomeIcon className="icon-signOut" icon={faSignOutAlt} />
      </button>
    </div>
  );
}

export default Profil;
