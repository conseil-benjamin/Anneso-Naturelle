import "./Banner.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Banner({ logo, collection, aPropos, contact, panier }) {
  const isLoggedOrNot = localStorage.getItem("id");
  const [profilClique, setProfilClique] = useState(false);
  const navigate = useNavigate();

  const [clientId, setClientId] = useState(
    isLoggedOrNot ? JSON.parse(isLoggedOrNot) : null
  );

  useEffect(() => {
    if (clientId && profilClique) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/users");
          const users = await response.json();
          console.log(users);
          console.log(isLoggedOrNot);
          const clientFound = users.find(({ id }) => id === clientId);
          if (clientFound) {
            setProfilClique(false);
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
              },
            });
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    } else if (profilClique) {
      navigate("Login");
    }
  }, [profilClique]);

  return (
    <>
      <div className="lmj-banner">
        <Link to="/">{logo}</Link>
        <Link to="/collections">{collection}</Link>
        {aPropos}
        {contact}
        <div className="icon-header">
          <img
            src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1702409603/icon_user_white.png"
            onClick={() => setProfilClique(true)}
          />
          {panier}
        </div>
      </div>
    </>
  );
}

export default Banner;
