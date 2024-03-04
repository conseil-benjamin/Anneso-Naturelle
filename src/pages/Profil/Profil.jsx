import { useLocation } from "react-router-dom";
import "./Profil.css";
import { useState, useEffect } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import validator from "validator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Loader} from "../../utils/Loader";

function Profil() {
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
  const [isDataLoading, setDataLoading] = useState(false);
  const jwtToken = Cookies.get("auth_token");
  const [hasChanged, setHasChanged] = useState(false);

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

  const checkFormInfosPersosValidity = () => {
    return (
        Nom.length > 2 && Prenom.length > 2 && validator.isEmail(AdresseEmail) && validator.isMobilePhone(NumeroTelephone) && NumeroTelephone.length === 10
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
              `${process.env.REACT_APP_API_URL}users/get-password-clear/${password}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
              }
          );
          if (actualPassword.ok) {
            setActualPasswordCorrect(true);
          } else {
           Swal.fire({
             text: "Mot de passe actuel non correct.",
                icon: "error",
           })
            setBtnResetPassword(false);
          }
        } catch (error) {
          console.error("Erreur de connexion au serveur:", error);
          setBtnResetPassword(false);
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
      console.log(btnResetPassword);
      if(!btnResetPassword){
        return;
      }
      console.log(checkFormValidity() && btnResetPassword);
      if (checkFormValidity() && btnResetPassword) {
        setDataLoading(true)
        const handleResetPassword = async () => {
          try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}users/reset-password`,
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
            setDataLoading(false);
          }
        }
        handleResetPassword();
      } else if (actualPasswordCorrect){
        Swal.fire({
          text: "Le nouveau mot de passe ne respecte pas les contraintes de sécurité. Au minimum 1 majuscule, minuscule, chiffre, caractère spécial et une longueur de 8 caractères au total.",
          icon: "error",
          showConfirmButton: true
        });
        setBtnResetPassword(false);
      }
    }, [actualPasswordCorrect, btnResetPassword]);


  useEffect(() => {
    if (!isInformationChanged){
      return
    }
    if (checkFormInfosPersosValidity()) {
      setDataLoading(true)
      const user = {
        nom: Nom,
        prenom: Prenom,
        adresseEmail: AdresseEmail,
        numeroTel: NumeroTelephone,
        civilite: Civilite,
      };
      const handlePersonnalInformationChange = async () => {
        try {
          const response = await fetch(
              `${process.env.REACT_APP_API_URL}users/patch-user-informations`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
                body: JSON.stringify(user),
              }
          );
          if (response.ok) {
            console.log("Informations mise à jours.");
            Swal.fire({
              text: "Informations de compte mise à jour avec succès.",
              icon: "success",
              showConfirmButton: true
            });
            setIsInformationChanged(false);
            setHasChanged(false);
          } else {
            Swal.fire({
              text: "Erreur lors de la modification de vos données. Si cela persiste veuillez nous contacter via la rubrique Contact.",
              icon: "error",
              showConfirmButton: true
            });
            setIsInformationChanged(false);
          }
        } catch (error) {
          console.error("Erreur de connexion au serveur:", error);
          setIsInformationChanged(false);
        } finally {
          setDataLoading(false);
        }
      }
      handlePersonnalInformationChange();
    } else {
      Swal.fire({
        text: "Erreur dans le formulaire.",
        icon: "error",
        showConfirmButton: true
      });
      setIsInformationChanged(false);
    }
  }, [isInformationChanged]);

  useEffect(() => {
      const fetchData = async () => {
        setDataLoading(true);
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}users`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          const user = await response.json();
          if (user) {
            setNom(user.nom);
            setPrenom(user.prenom);
            setAdresseEmail(user.adresseEmail);
            setNumeroTelephone(user.numeroTel);
            setCivilite(user.civilite);
          } else {
            Swal.fire({
              text: "Erreur lors de la récupération de vos données",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
            setDataLoading(false);
        }
      };

      fetchData();
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
              onChange={(e) => {
                setNom(e.target.value);
                setHasChanged(true);
              }}            />
            <label>Prénom</label>
            <input
              className="input-login"
              value={Prenom}
              onChange={(e) => {
                setPrenom(e.target.value); setHasChanged(true)
              }}
            />
            <label>Adresse Email</label>
            <input
              className="input-login"
              value={AdresseEmail}
              onChange={(e) => {setAdresseEmail(e.target.value);
                setHasChanged(true)}
            }
            />
            <label>Numéro de téléphone</label>
            <input
              className="input-login"
              value={NumeroTelephone}
              placeholder="Numéro de téléphone"
              onChange={(e) => {setNumeroTelephone(e.target.value); setHasChanged(true)}}
            />
            <div className="radio-btn-genre">
              {Civilite === "Monsieur" ? (
                <>
                  <button
                    className="btn-genre"
                    style={{ backgroundColor: "white", color: "black" }}
                    onClick={() => {setCivilite("Madame"); setHasChanged(true)}}
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
                    onClick={() => {setCivilite("Monsieur"); setHasChanged(true)}}
                  >
                    Monsieur
                  </button>
                </>
              )}
            </div>
            <button onClick={() => setIsInformationChanged(true)} disabled={!hasChanged}>Enregistrer modifications</button>
          </div>
        </div>
        <div className="div-change-password">
          <div style={{display: "flex", flexDirection: "column"}}>
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
            {isDataLoading ? <Loader></Loader> :
                <button onClick={() => setBtnResetPassword(true)}>Confirmer changement mot de passe</button>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Profil;
