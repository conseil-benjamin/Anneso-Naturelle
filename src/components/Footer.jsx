import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="lmj-footer">
      <div className="lmj-footer-elem">
        <div className="footer-text">
          <h2>GemBracelets</h2>
          <p>Pour les passionné·e·s de plantes 🌿🌱🌵</p>
          <button className="btn-footer-contact">Me contacter</button>
          <p>© 2023 - Anne-Shopie</p>
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
