import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAndroidAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import dame from "../../Images/dame_assise.png";
import cactus from "../../Images/cactus.png";
function Contact() {
  const [email, setEmail] = useState("");
  const [nomPrenom, setNomPrenom] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="body-page-contact">
      <div className="images">
        <img src={cactus} alt="cactus" width={150} height={300}></img>
        <img src={dame} alt="image_dame" width={500} height={500}></img>
      </div>
      <div className="input-contact">
        <h1>Me contacter</h1>

        <input
          placeholder="Nom Prénom"
          value={nomPrenom}
          onChange={(e) => setNomPrenom(e.target.value)}
        ></input>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="btn-login">
          Me contacter
          <FontAwesomeIcon icon={faEnvelope} className="icon-signIn" />
        </button>
      </div>
    </div>
  );
}

export default Contact;
