import PropTypes from "prop-types"; // ES6
import "./CardAdresses.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import Toast from "../Toast/toast";

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
    setAdresses,
}) {
  const navigate = useNavigate();
  const [btnDelete, setBtnDelete] = useState(false);
  const [toast, setToast] = useState({icon: '', text: ''});

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

  useEffect(() => {
     if (!btnDelete){
       return;
     }
    const handleDeleteAdress = async () => {
      //setDataLoading(true);
      console.log(adresseId)
      try{
        const response = await fetch("http://localhost:5000/api/v1/adresses/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
          body: JSON.stringify({idAdresse: adresseId})
        });
        if (response.ok){
          const adresses = await response.json();
          console.log("Adresse supprimée");
          setToast({icon: 'success', text: 'Adresse supprimée avec succès.'});
          setAdresses(adresses);
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        //setDataLoading(false);
      }
    };
    handleDeleteAdress();
  }, [btnDelete, adresseId]);


  return (
      <>
      {toast.text && <Toast icon={toast.icon} text={toast.text}></Toast>}
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
        <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setBtnDelete(true)}
            className="fa-2x"
        />
          <FontAwesomeIcon
              icon={faEdit}
              onClick={() => handleClickEditAdresse()}
              className="fa-2x" // Ou "fa-2x", "fa-3x", etc.
          />
      </div>
    </div>
        </>
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
