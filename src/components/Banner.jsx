import "../styles/Banner.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Banner({ logo, clientIcon, titre }) {
  const isLoggedOrNot = localStorage.getItem("id");
  const [chemin, setChemin] = useState(isLoggedOrNot ? "/Profil" : "/Login");

  return (
    <>
      <div className="lmj-banner">
        <Link to="/">{logo}</Link>
        {titre}
        <Link to={chemin}>{clientIcon}</Link>
      </div>
    </>
  );
}

export default Banner;
