import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./NavBarProfil.css";
import ButtonDeconnect from "../../components/Button Deconnect/ButtonDeconnect";
import Cookies from "js-cookie";

function NavBarProfil() {
  const [infosPersoClique, setInfosPersoClique] = useState(false);
  const [commandesClique, setCommandesClique] = useState(false);
  const [adressesClique, setAdressesClique] = useState(false);
  const [favorisClique, setFavorisClique] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");

  const userName = Cookies.get("name");
  const [name, setName] = useState(userName);
  const jwtToken = Cookies.get("auth_token");

  //isLogged ? navigate("/Profil/infos-persos") : console.log("dada");

  useEffect(() => {
    if (commandesClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/v1/commandes/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          const commandes = await response.json();
          commandes
            ? navigate("/profil/commandes", {
                state: {
                  commandes: commandes,
                },
              })
            : navigate("/profil/commandes");
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
          const response = await fetch(
            "http://localhost:5000/api/v1/adresses/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          const adresses = await response.json();
          adresses
            ? navigate("/profil/adresses/", {
                state: {
                  adresses: adresses,
                },
              })
            : navigate("/profil/adresses/");
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
          const response = await fetch("http://localhost:5000/api/v1/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          });

          const user = await response.json();
          if (user) {
            navigate("/profil/infos-persos", {
              state: {
                nom: user.nom,
                prenom: user.prenom,
                adresseEmail: user.adresseEmail,
                civilite: user.civilite,
                numeroTel: user.numeroTel
              },
            });
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
            "http://localhost:5000/api/v1/favoris/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          const favoris = await response.json();
          console.log(favoris);
          favoris
            ? navigate("/profil/favoris/", {
                state: {
                  favoris: favoris,
                },
              })
            : navigate("/profil/favoris/");
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
        <h3>Bonjour {name}</h3>
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
