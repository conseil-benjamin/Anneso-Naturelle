import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./ButtonSignOut.css";
import Cookies from "js-cookie";

function ButtonDeconnect() {
  const navigate = useNavigate();
  function deconnect() {
    Cookies.remove("auth_token");
    Cookies.remove("name");
    navigate("/");
  }

  return (
    <>
      <div className="div-btn-signOut" onClick={() => deconnect()} style={{cursor: "pointer"}}>
        <FontAwesomeIcon className="icon-signOut" icon={faSignOutAlt} />
        <a className="btn-sign-out" style={{margin: "0 0 0 0.5em"}}>
          Déconnexion
        </a>
      </div>
    </>
  );
}

export default ButtonDeconnect;
