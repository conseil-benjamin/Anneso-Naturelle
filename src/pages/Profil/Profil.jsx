import { useLocation } from "react-router-dom";
import "./Profil.css";
import { useState, useEffect, useRef } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import Cookies from "js-cookie";

function Profil() {
  const location = useLocation();
  const { nom, prenom, adresseEmail, numeroTel, iconProfil, civilite } =
    location.state || {};
  const option1 = useRef();
  const option2 = useRef();

  const [NumeroTelephone, setNumeroTelephone] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Nom, setNom] = useState("");
  const [AdresseEmail, setAdresseEmail] = useState("");
  const [Civilite, setCivilite] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [idClient, setIdClient] = useState("");
  const [nomPrenom, setNomPrenom] = useState("");

  const cookieIdClient = Cookies.get("userId");
  const cookieNomPrenom = Cookies.get("firstAndLastName");

  localStorage.setItem("name", nom + " " + prenom);
  /*
  cookieNomPrenom
    ? setIdClient(cookieNomPrenom)
    : Cookies.set("firsAndLastName", nom + "" + prenom, {
        expires: 14,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });
*/
  /*
  cookieIdClient
    ? setIdClient(cookieIdClient)
    : Cookies.set("userId", id, {
        expires: 14,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });
*/
  // changer son mot de passe
  useEffect(() => {
    setNumeroTelephone(numeroTel);
    setPrenom(prenom);
    setNom(nom);
    setAdresseEmail(adresseEmail);
    setCivilite(civilite);

    // attribuer check au bon bouton radio (marche pas pour l'instant)
    // option1.current.value === Civilite ?
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
              <label>Madame</label>
              <input
                type="radio"
                id="option1"
                name="options"
                value="Madame"
                ref={option1}
              ></input>
              <label>Monsieur</label>
              <input
                type="radio"
                id="option2"
                name="options"
                value="Monsieur"
                ref={option2}
              ></input>
            </div>
            <button>Enregistrer modifications</button>
          </div>
        </div>
        <div className="div-change-password">
        <h2>Modifier mon mot de passe</h2>
          <input
            className="input-login"
            value={password}
            placeholder="Mot de passe actuel"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input-login"
            value={newPassword}
            placeholder="Nouveau mot de passe"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="input-login"
            value={confirmNewPassword}
            placeholder="Confirmer nouveau mot de passe"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Profil;
