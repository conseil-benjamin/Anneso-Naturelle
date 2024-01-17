import { useLocation } from "react-router-dom";
import "./Profil.css";
import { useState, useEffect } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";

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
          <button>Confirmer changement mot de passe</button>
        </div>
      </div>
    </>
  );
}

export default Profil;
