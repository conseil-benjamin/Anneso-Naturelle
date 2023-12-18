import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./NavBarProfil.css";
import ButtonDeconnect from "../../components/Button Deconnect/ButtonDeconnect";

function NavBarProfil() {
  const [infosPersoClique, setInfosPersoClique] = useState(false);
  const [commandesClique, setCommandesClique] = useState(false);
  const [adressesClique, setAdressesClique] = useState(false);
  const [favorisClique, setFavorisClique] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");

  const isLogged = localStorage.getItem("id");
  const isName = localStorage.getItem("name");
  const [name, setName] = useState(isName ? isName : null);
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
          const commandesFound = commandes.filter(
            ({ idClient }) => clientId === idClient
          );
          commandesFound
            ? navigate("/Profil/commandes", {
                state: {
                  commandes: commandesFound,
                },
              })
            : navigate("/Profil/commandes");
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
          const adressesFound = adresses.filter(
            ({ userId }) => clientId === userId
          );
          adressesFound
            ? navigate("/Profil/adresses/", {
                state: {
                  adresses: adressesFound,
                },
              })
            : navigate("/Profil/adresses/");
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
            navigate("/Profil/infos-persos", {
              state: {
                nom: clientFound.nom,
                prenom: clientFound.prenom,
                adresseEmail: clientFound.adresseEmail,
                mdp: clientFound.mdp,
                numeroTel: clientFound.numeroTel,
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

  useEffect(() => {
    if (favorisClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/v1/favoris/" + clientId
          );
          const favoris = await response.json();
          console.log(favoris);
          favoris
            ? navigate("/Profil/favoris/", {
                state: {
                  favoris: favoris,
                },
              })
            : navigate("/Profil/favoris/");
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [favorisClique]);

  return (
    <>
      <div className="navbar">
        <h3>
          <u>Bonjour {name}</u>
        </h3>
        <button onClick={() => setInfosPersoClique(true)}>
          Mes Informations
        </button>
        <hr />
        <button onClick={() => setCommandesClique(true)}>Commandes</button>
        <hr />
        <button onClick={() => setFavorisClique(true)}>Favoris</button>
        <hr />
        <button onClick={() => setAdressesClique(true)}>Adresse</button>
        <hr />
        <ButtonDeconnect></ButtonDeconnect>
      </div>
    </>
  );
}

export default NavBarProfil;
