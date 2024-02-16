import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAndroidAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import dame from "../../Images/dame_assise.png";
import cactus from "../../Images/cactus.png";
import { components } from "react-select";
import validator from "validator";
import Swal from "sweetalert2";
import Toast from "../../components/Toast/toast";
import { Loader } from "../../utils/Loader";

function Contact() {
  const [email, setEmail] = useState("");
  const [nomPrenom, setNomPrenom] = useState("");
  const [message, setMessage] = useState("");
  const [objetMessage, setObjetMessage] = useState("");
  const [btnContactCliquer, setBtnContactCliquer] = useState(false);
  const [formulaireValide, setFormulaireValide] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);

  const emailVerif = () => {
    return validator.isEmail(email);
  };
  const verificationFormulaire = () => {
    message.length > 0 && emailVerif() && nomPrenom.length > 0 && objetMessage.length > 0 ?
        setBtnContactCliquer(true) : Swal.fire({
      text: "Erreur, champs non remplis"
        });
  }

  useEffect(() => {
    if (btnContactCliquer === false) return;
    const sendEmail = async () => {
      const emailInfos = {
        name: nomPrenom,
        email: email,
        message: message,
        objetMessage: objetMessage
      }
      console.log(emailInfos)
      try {
        setDataLoading(true)
        const response = await fetch(
            `http://localhost:5000/api/v1/mail/client-to-seller`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({emailInfos}),
            },
        );
        if (response.ok){
          Swal.fire({
            title: "Email envoyé",
            text: "Votre email à été correctement envoyé au vendeur. Vous recevrez une réponse dans les plus brefs délais. Merci de votre confiance.",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      else {
        Swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite lors de l'envoi de l'email",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      } catch (error) {
        console.error(error);
      } finally {
        setDataLoading(false)
      }
    };
    sendEmail().then(r => console.log(r));
  }, [btnContactCliquer])


  return (
      <>
        {formulaireValide && <Toast icon={"sucess"} text={"Email envoyé avec succès"} />}
    <div className="body-page-contact">
      <div className="images">
        <img src={cactus} alt="cactus" width={150} height={300} id={"img_cactus_contact_page"}></img>
        <img src={dame} alt="image_dame" width={500} height={500}></img>
      </div>
      <div className="input-contact">
        <h2>Me contacter</h2>

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
            placeholder="Objet email"
            value={objetMessage}
            onChange={(e) => setObjetMessage(e.target.value)}
        ></input>
        <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{fontSize: 20, margin: "0 0 10px 0"}}
        ></textarea>
        {isDataLoading ? <Loader></Loader> : <button id={"btn_contact"} onClick={() => verificationFormulaire()}>
          Me contacter
          <FontAwesomeIcon icon={faEnvelope} className="icon-signIn"/>
        </button>}
      </div>
    </div>
      </>
  );
}

export default Contact;
