import { useLocation } from "react-router-dom";
import "./Profil.css";
import { useState, useEffect } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import validator from "validator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

function Profil() {
  const location = useLocation();
  const { nom, prenom, adresseEmail, numeroTel, civilite } =
    location.state || {};

  const [NumeroTelephone, setNumeroTelephone] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Nom, setNom] = useState("");
  const [AdresseEmail, setAdresseEmail] = useState("");
  const [Civilite, setCivilite] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isInformationChanged, setIsInformationChanged] = useState(false);
  const [btnResetPassword, setBtnResetPassword] = useState(false);
  const [actualPasswordCorrect, setActualPasswordCorrect] = useState(false);
  const [inputType, setInputType] = useState("password");

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const newPasswordMatch =  () => {
    return newPassword === confirmNewPassword;
  }

  const checkFormValidity = () => {
    return (
        actualPasswordCorrect === true && validator.isStrongPassword(newPassword) && newPasswordMatch()
    );
  };

  const checkFormValidityBeforeRequest = () => {
    return (
      password.length > 0 && newPassword.length > 0 && confirmNewPassword.length > 0
    );
  };

  useEffect(() => {
    console.log(btnResetPassword);
      if(!btnResetPassword){
        return;
      }
    if (checkFormValidityBeforeRequest() && btnResetPassword) {
      const handleGetActualUserPassword = async () => {
        try {
          const actualPassword = await fetch(
              `http://localhost:5000/api/v1/users/get-password-clear/${password}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
              }
          );
          if (actualPassword.ok) {
            /**
             * TODO : Ajouter une popup quand le mot de passe de base ne correspond pas
             */
            setActualPasswordCorrect(true);
          } else {
            setActualPasswordCorrect(false);
          }
        } catch (error) {
          console.error("Erreur de connexion au serveur:", error);
        } finally {
          setBtnResetPassword(false);
          console.log(actualPasswordCorrect);
        }
      }
      handleGetActualUserPassword();
    } else{
      Swal.fire({
        text: "Veuillez remplir tous les champs !",
        icon: "error",
        showConfirmButton: true
      });
      setBtnResetPassword(false);
    }
      }, [btnResetPassword]);

          useEffect(() => {
            if(!btnResetPassword){
              return;
            }
            if (!actualPasswordCorrect){
              Swal.fire({
                text: "Mot de passe actuel non correcte.",
                icon: "error",
                showConfirmButton: true
              })
              setBtnResetPassword(false);
            }
            console.log(checkFormValidity() && btnResetPassword);
            if (checkFormValidity() && btnResetPassword) {
              const handleResetPassword = async () => {
                try {
                  const response = await fetch(
                      "http://localhost:5000/api/v1/users/reset-password",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${Cookies.get("auth_token")}`,
                        },
                        body: JSON.stringify({newPassword: newPassword}),
                      }
                  );
                  if (response.ok) {
                    console.log("Mot de passe modifié avec succès.");
                    Swal.fire({
                      text: "Mot de passe modifié avec succès.",
                      icon: "success",
                      showConfirmButton: true
                    });
                    setPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                  } else {
                    Swal.fire({
                      text: "Mot de passe non modifié",
                      icon: "error",
                      showConfirmButton: true
                    });
                  }
                } catch (error) {
                  console.error("Erreur de connexion au serveur:", error);
                } finally {
                  setBtnResetPassword(false);
                }
              }
              handleResetPassword();
            } else{
              Swal.fire({
                text: "Le nouveau mot de passe ne respecte pas les contraintes de sécurité. Au minimum 1 majuscule, minuscule, chiffre, caractère spécial et une longueur de 8 caractères au total.",
                icon: "error",
                showConfirmButton: true
              });
              setBtnResetPassword(false);
            }
          }, [actualPasswordCorrect]);

  useEffect(() => {
    setNumeroTelephone(numeroTel);
    setPrenom(prenom);
    setNom(nom);
    setAdresseEmail(adresseEmail);
    setCivilite(civilite);
  }, []);
  return (
    <>
      <div className="div-main-profil">
        <NavBarProfil></NavBarProfil>
        <div className="div-infos-client">
          <div className="div-infos-perso">
            <h2>Informations principales</h2>
            <label>Nom</label>
            <input
              className="input-login"
              value={Nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <label>Prénom</label>
            <input
              className="input-login"
              value={Prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            <label>Adresse Email</label>
            <input
              className="input-login"
              value={AdresseEmail}
              onChange={(e) => setAdresseEmail(e.target.value)}
            />
            <label>Numéro de téléphone</label>
            <input
              className="input-login"
              value={NumeroTelephone}
              placeholder="Numéro de téléphone"
              onChange={(e) => setNumeroTelephone(e.target.value)}
            />
            <div className="radio-btn-genre">
              {Civilite === "Monsieur" ? (
                <>
                  <button
                    className="btn-genre"
                    style={{ backgroundColor: "white", color: "black" }}
                    onClick={() => setCivilite("Madame")}
                  >
                    Madame
                  </button>
                  <button className="btn-genre">Monsieur</button>
                </>
              ) : (
                <>
                  <button className="btn-genre">Madame</button>
                  <button
                    className="btn-genre"
                    style={{ backgroundColor: "white", color: "black" }}
                    onClick={() => setCivilite("Monsieur")}
                  >
                    Monsieur
                  </button>
                </>
              )}
            </div>
            <button disabled={isInformationChanged}>Enregistrer modifications</button>
          </div>
        </div>
        <div className="div-change-password">
          <h2>Modifier mon mot de passe</h2>
          <div className={"div-password"}>
            <input
                className="input-login"
                value={password}
                type={inputType}
                placeholder="Mot de passe actuel"
                onChange={(e) => setPassword(e.target.value)}
            />
            {inputType === "password" ? (
                <FontAwesomeIcon icon={faEye} id={"icon-eye-see-password"}
                                 onClick={togglePasswordVisibility}></FontAwesomeIcon>
            ) : (
                <FontAwesomeIcon icon={faEyeSlash} id={"icon-eye-see-password"}
                                 onClick={togglePasswordVisibility}></FontAwesomeIcon>
            )}
          </div>
          <input
            className="input-login"
            value={newPassword}
            type={inputType}
            placeholder="Nouveau mot de passe"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="input-login"
            value={confirmNewPassword}
            type={inputType}
            placeholder="Confirmer nouveau mot de passe"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button onClick={() => setBtnResetPassword(true)}>Confirmer changement mot de passe</button>
        </div>
      </div>
    </>
  );
}

export default Profil;
