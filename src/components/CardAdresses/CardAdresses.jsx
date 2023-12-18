import PropTypes from "prop-types"; // ES6
import "./CardAdresses.css";
import { useLocation, useNavigate } from "react-router-dom";

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
  const handleUpdateAdresse = () => {
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
      <div className="container-left">
        {adresse}
        <br />
        {ville} {"\u00A0"}
        {codePostal}
      </div>
      <div className="container-right">
        {pays}
        <button onClick={() => handleUpdateAdresse()}>Modifier</button>
      </div>
    </div>
  );
}

CardAdressses.propTypes = {
  adresse: PropTypes.string.isRequired,
  ville: PropTypes.string.isRequired,
  codePostal: PropTypes.string.isRequired,
  pays: PropTypes.string.isRequired,
};
export default CardAdressses;
