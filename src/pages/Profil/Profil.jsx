import { useLocation } from "react-router-dom";
import "./Profil.css";
import { useState, useEffect, useRef } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";

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
  const [IconProfil, setIconProfil] = useState("");

  // changer son mot de passe
  useEffect(() => {
    setNumeroTelephone(numeroTel);
    setPrenom(prenom);
    setNom(nom);
    setAdresseEmail(adresseEmail);
    setCivilite(civilite);
    setIconProfil(iconProfil);
    // attribuer check au bon bouton radio (marche pas pour l'instant)
   // option1.current.value === Civilite ? 
  }, []);
  return (
    <>
      <div className="div-main-profil">
        <NavBarProfil></NavBarProfil>
        <div className="div-infos-client">
          <div className="image-profil-modifier">
            <img
              src={iconProfil}
              alt="icone_profil"
              width={130}
              height={130}
            ></img>
            <input
              type="file"
              onChange={(e) => setIconProfil(e.target.value)}
            ></input>
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1701823970/Icons/modifier.png"
              width={24}
              height={24}
              id="iconModifier"
              alt="icone_modifier"
            ></img>
          </div>

          <div className="div-infos-perso">
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
            <button>Enregistrer Informations</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profil;
