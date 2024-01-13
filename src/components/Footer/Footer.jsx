import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const navigate = useNavigate();

  const handleClickContact = () => {
    navigate("Contact");
  };

  const handleClickSocials = (redirection) => {
    redirection === "facebook"
      ? window.open(
          "https://www.facebook.com/profile.php?id=100075994402255",
          "_blank"
        )
      : redirection === "instagram"
      ? window.open(
          "https://www.instagram.com/anneso2273/?igshid=OGQ5ZDc2ODk2ZA%3D%3D",
          "_blank"
        )
      : window.open("https://www.tiktok.com/@anneso2273", "_blank");
  };
  return (
    <footer className="lmj-footer">
      <div className="lmj-footer-elem">
        <div className="footer-text">
          <h2 className="titre-footer">Anne'so Naturelle</h2>
          <p className="titre-footer">Chaque bijou raconte une histoire</p>
          <button
            className="btn-footer-contact"
            onClick={() => handleClickContact(true)}
          >
            Me contacter
          </button>
          <p id="titre-footer">© 2024 - Anne-Shopie</p>
          <div className="div-lien-juridique">
            <a href="/mentions-legales" style={{ color: "#B23C00" }}>
              Mentions Légales -{" "}
            </a>
            <a href="/conditions-utilisations" style={{ color: "#B23C00" }}>
              Conditions d'Utilisation -
            </a>
            <a href="/conditions-generales" style={{ color: "#B23C00" }}>
              Conditions Générales
            </a>
          </div>
        </div>
        <div className="icon-socials">
          <FontAwesomeIcon
            className="iconSocial"
            icon={faFacebook}
            onClick={() => handleClickSocials("facebook")}
          />
          <FontAwesomeIcon
            className="iconSocial"
            icon={faInstagram}
            onClick={() => handleClickSocials("instagram")}
          />
          <FontAwesomeIcon
            className="iconSocial"
            icon={faTiktok}
            onClick={() => handleClickSocials("tiktok")}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
