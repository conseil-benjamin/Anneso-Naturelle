import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAndroidAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Contact() {
  const [email, setEmail] = useState("");
  const [nomPrenom, setNomPrenom] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="body-page-contact">
      <img
        className="img-contact"
        src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1701177724/Contact/contact.jpg"
      ></img>
      <div className="input-contact">
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
        <input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button className="btn-login">
          Me contacter
          <FontAwesomeIcon icon={faMobileAndroidAlt} className="icon-signIn" />
        </button>
      </div>
    </div>
  );
}

export default Contact;
