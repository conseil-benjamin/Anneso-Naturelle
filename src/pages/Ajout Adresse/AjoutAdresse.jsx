import "./AjoutAdresse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {Loader} from "../../utils/Loader";

function AjoutAdresse() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [adresseForm, setAdresse] = useState("");
  const [complementAdresse, setComplementAdresse] = useState("");
  const [pays, setPays] = useState("");
  const [erreurInputAdresse, setErreurInputAdresse] = useState(null);
  const [erreurInputNom, setErreurInputName] = useState(null);
  const [erreurInputPrenom, setErreurInputPrenom] = useState(null);
  const [erreurInputTelephone, setErreurInputTelephone] = useState(null);
  const [erreurInputCodePostal, setErreurInputCodePostal] = useState(null);
  const [erreurInputVille, setErreurInputVille] = useState(null);
  const [erreurInputPays, setErreurInputPays] = useState(null);
  const [isDataLoading, setDataLoading] = useState(false);
  const [isBtnCliquer, setBtnCliquer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isBtnCliquer){
        return;
    }
    const handleClickCreateAdresse = async () => {
      if (checkFormValidity() && isBtnCliquer) {
        const adresse = {
          nomPersonne: nom,
          prenomPersonne: prenom,
          adresse: adresseForm,
          codePostal: codePostal,
          ville: ville,
          complementAdresse: complementAdresse,
          pays: pays,
          numTel: telephone
        };
        try {
          setDataLoading(true)
          const response = await fetch(
              "http://localhost:5000/api/v1/adresses/insert",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
                body: JSON.stringify(adresse),
              }
          );
          if (response.ok) {
            console.log("Adresse créé avec succès !");
            Swal.fire({
              text: "Adresse créé avec succès !",
              icon: "success",
              showConfirmButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/profil/adresses")
              }
            });
          } else {
            Swal.fire({
              text: "Adresse non créée !",
              icon: "error",
              timer: 2000,
              showConfirmButton: true
            });
          }
        } catch (error) {
          console.error("Erreur de connexion au serveur:", error);
        }
        finally {
          setDataLoading(false);
        }
      } else {
        Swal.fire({
          text: "Erreur dans le formulaire de création de compte  ",
          icon: "error",
          confirmButtonText: "Ok",
        });
        !validator.isMobilePhone(telephone) ? setErreurInputTelephone("Format numéro de téléphone incorrecte") : setErreurInputTelephone(null);
        !prenom.length > 0 ? setErreurInputPrenom("Prénom non renseigné") : setErreurInputPrenom(null);
        !nom.length > 0 ? setErreurInputName("Nom non renseigné") : setErreurInputName(null);
        !ville.length > 0 ? setErreurInputVille("Ville non renseignée") : setErreurInputVille(null);
        !codePostal.length === 5 ? setErreurInputCodePostal("Code postal non valide") : setErreurInputCodePostal(null);
        !pays.length > 0 ? setErreurInputPays("Pays non renseigné") : setErreurInputPays(null);
        !adresseForm.length > 0 && validator.isInt(codePostal) ? setErreurInputAdresse("Adresse non renseignée") : setErreurInputAdresse(null);
      }
    }
    handleClickCreateAdresse();
  }, [isBtnCliquer])

  const checkFormValidity = () => {
    return (
        numeroTelVerif() &&
        firstNameLengthVerif() &&
        nameLengthVerif() &&
        villeVerif() &&
        codePostalVerif() &&
        paysVerif() &&
        adresseVerif()
    );
  };

  const handleBlurNameLength = () => {
    if (nom.length === 0) {
      setErreurInputName("Renseignez un nom s'il vous plaît");
    }
  };

  const handleBlurFirstNameLength = () => {
    if (prenom.length === 0) {
        setErreurInputPrenom("Renseignez un prénom s'il vous plaît");
    }
  };

  const handleBlurPays = () => {
    if (pays.length === 0) {
      setErreurInputPays("Pays non valide");
    }
  };

  const handleBlurTel = () => {
    const isNumeroTel = validator.isMobilePhone(telephone);
    if (!isNumeroTel) {
      setErreurInputTelephone("Numéro de téléphone incorrect");
    }
  };

  const handleBlurVille = () => {
    if (ville.length === 0) {
      setErreurInputVille("Ville non valide");
    }
  };

  const handleBlurCodePostal = () => {
    if (codePostal.length < 5) {
      setErreurInputCodePostal("Code postal non valide");
    }
  };

  const handleBlurAdresse = () => {
    if (adresseForm.length === 0) {
      setErreurInputAdresse("Adresse non valide");
    }
  };

  const nameLengthVerif = () => {
    return nom.length > 0;
  };

  const firstNameLengthVerif = () => {
    return prenom.length > 0;
  };

  const villeVerif = () => {
    return ville.length > 0;
  };

  const codePostalVerif = () => {
        return codePostal.length === 5 && validator.isInt(codePostal);
  };

  const numeroTelVerif = () => {
    return validator.isMobilePhone(telephone);
  };

  const paysVerif = () => {
      return pays.length > 0;
  };

const adresseVerif = () => {
    return adresseForm.length > 0;
  };


  return (
    <div className="body-page-addAdresse">
      <NavBarProfil></NavBarProfil>
      <div className="formulaire-ajout-adresse">
        <div className="formulaire-en-colonne" id="form1">
          <h1>Ajout d'une adresse</h1>
            <input
                className="input-login"
                value={adresseForm}
                placeholder="Adresse"
                onBlur={handleBlurAdresse}
                onChange={(e) => setAdresse(e.target.value)}
            />
            {erreurInputAdresse && !adresseVerif() && <p style={{color: "red", margin: "0"}}>{erreurInputAdresse}</p>}
          <input
              className="input-login"
              value={codePostal}
              placeholder="Code Postal"
              onBlur={handleBlurCodePostal}
              onChange={(e) => setCodePostal(e.target.value)}
          />
          {erreurInputCodePostal && !codePostalVerif() && <p style={{color: "red"}}>{erreurInputCodePostal}</p>}
          <input
              className="input-login"
              value={ville}
              placeholder="Ville"
              onBlur={handleBlurVille}
              onChange={(e) => setVille(e.target.value)}
          />
          {erreurInputVille && !villeVerif() && <p style={{color: "red"}}>{erreurInputVille}</p>}
          <input
              className="input-login"
              value={complementAdresse}
              placeholder="Complément d'adresse"
              onChange={(e) => setComplementAdresse(e.target.value)}
          />
            <input
                className="input-login"
                value={pays}
                placeholder="Pays"
                onBlur={handleBlurPays}
                onChange={(e) => setPays(e.target.value)}
            />
            {erreurInputPays && !paysVerif() && <p style={{color: "red"}}>{erreurInputPays}</p>}
        </div>
        <div className="formulaire-en-colonne">
          <input
            className="input-login"
            placeholder="Nom"
            value={nom}
            onBlur={handleBlurNameLength}
            onChange={(e) => setNom(e.target.value)}
          ></input>
          {erreurInputNom && !nameLengthVerif() && <p style={{color: "red"}}>{erreurInputNom}</p>}
          <input
            className="input-login"
            placeholder="Prénom"
            value={prenom}
            onBlur={handleBlurFirstNameLength}
            //onBlur={handleBlurFirstNameLength}
            onChange={(e) => setPrenom(e.target.value)}
          ></input>
          {erreurInputPrenom && !firstNameLengthVerif() && <p style={{color: "red"}}>{erreurInputPrenom}</p>}
          <input
            className="input-login"
            placeholder="Téléphone"
            value={telephone}
            onBlur={handleBlurTel}
            onChange={(e) => setTelephone(e.target.value)}
          ></input>
          {erreurInputTelephone && !numeroTelVerif() && <p style={{color: "red"}}>{erreurInputTelephone}</p>}
        </div>
        {isDataLoading ? <Loader></Loader> : <button onClick={() => setBtnCliquer(true)}>
          Ajouter l'adresse
          <FontAwesomeIcon className="icon-signIn"/>
        </button>}
      </div>
    </div>
  );
}

export default AjoutAdresse;
