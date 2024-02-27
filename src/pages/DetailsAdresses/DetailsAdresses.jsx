import { useLocation, useParams } from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./DetailsAdresses.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function DetailsAdresses() {
  const location = useLocation();
  const {
    adresse,
    ville,
    codePostal,
    pays,
    complementAdresse,
    nomPersonne,
    prenomPersonne,
    numTel,
  } = location.state || {};
  const { numAdresse } = useParams();

  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [CodePostal, setCodePostal] = useState("");
  const [Ville, setVille] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [ComplementAdresse, setComplementAdresse] = useState("");
  const [Pays, setPays] = useState("");
  const [hasChanged, setHasChanged] = useState(false);
  const [btnUpdateAdresseClique, setBtnUpdateAdresseClique] = useState(false);
  useEffect(() => {
    setNom(nomPersonne);
    setPrenom(prenomPersonne);
    setTelephone(numTel);
    setCodePostal(codePostal);
    setVille(ville);
    setAdresse(adresse);
    setComplementAdresse(complementAdresse);
    setPays(pays);
  }, []);

  useEffect(() => {
      if(!btnUpdateAdresseClique){
        return;
      }
      try{
        const adresse = {
          adresse: Adresse,
          codePostal: CodePostal,
          ville: Ville,
          complementAdresse: ComplementAdresse,
          pays: Pays,
          nomPersonne: Nom,
          prenomPersonne: Prenom,
          numTel: Telephone,
        };
        const handleClickUpdateAdress = async () => {
          const response = await fetch(
              `${process.env.REACT_APP_API_URL}adresses/update`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
              body: JSON.stringify(adresse)
              }
          );
          if (response.ok){
            Swal.fire({
              toast: true,
              text: "Adresse mise à jour avec succès.",
              icon: "success"
            })
            setBtnUpdateAdresseClique(false);
            setHasChanged(false);
          } else{
            Swal.fire({
              toast: true,
              text: "Erreur lors de la mise à jour de l'adresse.",
              icon: "error"
            })
          }
        }
      } catch (error) {
        console.log(error);
      }
  }, [btnUpdateAdresseClique]);

  return (
    <div className="div-main-details-adresse">
      <NavBarProfil></NavBarProfil>
      <div className="div-infos-adresse">
        <h1>Modifier votre adresse</h1>
        <div className="infos-details-adresse">
          <div className="container-adresse-left">
            <label>Adresse</label>
            <input
              className="input-login"
              value={Adresse}
              placeholder="Adresse"
              //onBlur={handleBlurPassword}
              onChange={(e) => setAdresse(e.target.value)}
            />
            <label>Code postal</label>
            <input
              className="input-login"
              value={CodePostal}
              placeholder="Code Postal"
              //onBlur={handleBlurPassword}
              onChange={(e) => setCodePostal(e.target.value)}
            />
            <label>Ville</label>
            <input
              className="input-login"
              value={Ville}
              placeholder="Ville"
              //onBlur={handleBlurPassword}
              onChange={(e) => setVille(e.target.value)}
            />
            <label>Complément d'adresse</label>
            <input
              className="input-login"
              value={ComplementAdresse}
              placeholder="Complément d'adresse"
              //onBlur={handleBlurPassword}
              onChange={(e) => setComplementAdresse(e.target.value)}
            />
            <label>Pays</label>
            <input
              className="input-login"
              value={Pays}
              placeholder="Pays"
              //onBlur={handleBlurPassword}
              onChange={(e) => setPays(e.target.value)}
            />
          </div>
          <div className="div-infos-perso">
            <label>Nom</label>
            <input
              className="input-login"
              placeholder="Nom"
              value={Nom}
              //onBlur={handleBlurNameLength}
              onChange={(e) => setNom(e.target.value)}
            ></input>
            <label>Prénom</label>
            <input
              className="input-login"
              placeholder="Prénom"
              value={Prenom}
              //onBlur={handleBlurFirstNameLength}
              onChange={(e) => setPrenom(e.target.value)}
            ></input>
            <label>Téléphone</label>
            <input
              className="input-login"
              placeholder="Téléphone"
              value={Telephone}
              //onBlur={handleBlurEmail}
              onChange={(e) => setTelephone(e.target.value)}
            ></input>
          </div>
        </div>
        <button className="btn-save" disabled={!hasChanged} onClick={() => setBtnUpdateAdresseClique()}>
          Enregistrer Changement
          <FontAwesomeIcon className="icon-signIn" />
        </button>
      </div>
    </div>
  );
}

export default DetailsAdresses;
