import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./NavBarProfil.css";
import ButtonDeconnect from "../../components/Button Deconnect/ButtonDeconnect";

function NavBarProfil() {
  const [infosPersoClique, setInfosPersoClique] = useState(false);
  const [commandesClique, setCommandesClique] = useState(false);
  const [adressesClique, setAdressesClique] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");

  const [name, setName] = useState("");
  const isLogged = localStorage.getItem("id");
  const [clientId, setClientId] = useState(
    isLogged ? JSON.parse(isLogged) : null
  );

  //isLogged ? navigate("/Profil/infos-persos") : console.log("dada");

  useEffect(() => {
    if (commandesClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/v1/commandes"
          );
          const commandes = await response.json();
          const commandesFound = commandes.find(
            ({ idClient }) => clientId === idClient
          );
          navigate("/Profil/commandes", {
            state: {
              idCommande: commandesFound.idCommande,
              date: commandesFound.date,
              // marche pas fait crash
              //contenuCommande: commandesFound.contenuCommande,
              prixTotal: commandesFound.prixTotal,
            },
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [commandesClique]);

  useEffect(() => {
    if (adressesClique) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/adresses");
          const adresses = await response.json();
          const adressesFound = adresses.find(
            ({ userId }) => clientId === userId
          );
          navigate("/Profil/adresses", {
            state: {
              idClient: adressesFound.userId,
              nom: adressesFound.nomPersonne,
              prenom: adressesFound.prenomPersonne,
              adresse: adressesFound.adresse,
              codePostal: adressesFound.codePostal,
              ville: adressesFound.ville,
              complementAdresse: adressesFound.complementAdresse,
              pays: adressesFound.adressesFound,
            },
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [adressesClique]);

  useEffect(() => {
    if (infosPersoClique) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/users");
          const users = await response.json();
          console.log(users);
          const clientFound = users.find(({ id }) => clientId === id);
          if (clientFound) {
            setName(clientFound.prenom + " " + clientFound.nom);
            navigate("/Profil/infos-persos", {
              state: {
                id: clientFound.id,
                nom: clientFound.nom,
                prenom: clientFound.prenom,
                adresses: clientFound.adresses,
                adresseEmail: clientFound.adresseEmail,
                mdp: clientFound.mdp,
                numeroTel: clientFound.numeroTel,
                iconProfil: clientFound.iconProfil,
                civilite: clientFound.civilite,
              },
            });
            localStorage.setItem("id", JSON.stringify(clientFound.id));
          } else {
            Swal.fire({
              text: "Erreur lors de la récupération de vos données ",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [infosPersoClique]);

  return (
    <>
      <div className="navbar">
        <p>Bonjour {name}</p>
        <button onClick={() => setInfosPersoClique(true)}>
          Informations Personnelles
        </button>
        <hr />
        <button onClick={() => setCommandesClique(true)}>Commandes</button>
        <hr />
        <button onClick={() => setAdressesClique(true)}>Adresse</button>
        <hr />
        <ButtonDeconnect></ButtonDeconnect>
      </div>
    </>
  );
}

export default NavBarProfil;
