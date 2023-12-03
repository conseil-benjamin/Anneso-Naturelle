import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleClickContact = () => {
    navigate("Contact");
  };

  return (
    <footer className="lmj-footer">
      <div className="lmj-footer-elem">
        <div className="footer-text">
          <h2>Anne'so Naturelle</h2>
          <p>Pour les passionné·e·s de pierres 💎💎</p>
          <button
            className="btn-footer-contact"
            onClick={() => handleClickContact(true)}
          >
            Me contacter
          </button>
          <p>© 2023 - Anne-Shopie</p>
          <div className="div-lien-juridique">
            <a href="Mentions-Legales">Mentions Légales - </a>
            <a href="conditions-utilisations">Conditions d'Utilisation -</a>
            <a href="conditions-generales">Conditions Générales</a>
          </div>
        </div>
        <div className="icon-socials">
          <FontAwesomeIcon
            className="iconSocial"
            icon={faFacebook}
            //onClick="https://instagram.com"
          />
          <FontAwesomeIcon className="iconSocial" icon={faInstagram} />
          <FontAwesomeIcon className="iconSocial" icon={faTiktok} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
