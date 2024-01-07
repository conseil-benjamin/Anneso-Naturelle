import PropTypes from "prop-types"; // ES6
import "./CardAdresses.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function CardAdressses({
  adresseId,
  adresse,
  ville,
  codePostal,
  pays,
  complementAdresse,
  nomPersonne,
  prenomPersonne,
  numTel,
}) {
  const navigate = useNavigate();

  const handleClickEditAdresse = () => {
    navigate(`/Profil/adresses/${adresseId}`, {
      state: {
        adresseId: adresseId,
        adresse: adresse,
        ville: ville,
        codePostal: codePostal,
        pays: pays,
        complementAdresse: complementAdresse,
        nomPersonne: nomPersonne,
        prenomPersonne: prenomPersonne,
        numTel: numTel,
      },
    });
  };

  return (
    <div className="card-adresse-main">
      <div className="container-left-adresses">
        <h4>{adresse}</h4>
        <br />
        <div className="div-ville-cp">
          <h4>
            {ville} {"\u00A0"}
          </h4>
          <h4>{codePostal}</h4>
        </div>
        <br />
        <h4>{pays}</h4>
      </div>
      <div className="container-right-adresses">
        <button id="btn-modifer-adresse">
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => handleClickEditAdresse()}
            className="fa-2x" // Ou "fa-2x", "fa-3x", etc.
          />
        </button>
      </div>
    </div>
  );
}

CardAdressses.propTypes = {
  adresse: PropTypes.string.isRequired,
  ville: PropTypes.string.isRequired,
  codePostal: PropTypes.string.isRequired,
  pays: PropTypes.string.isRequired,
  complementAdresse: PropTypes.string.isRequired,
  nomPersonne: PropTypes.string,
  numTel: PropTypes.string.isRequired,
};
export default CardAdressses;
