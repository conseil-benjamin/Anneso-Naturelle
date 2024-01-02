import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./ButtonSignOut.css";
import Cookies from "js-cookie";

function ButtonDeconnect() {
  const navigate = useNavigate();
  function deconnect() {
    Cookies.remove("auth_token");
    navigate("/");
  }

  return (
    <>
      <div className="div-btn-signOut">
        <button className="btn-sign-out" onClick={() => deconnect()}>
          Se déconnecter
          <FontAwesomeIcon className="icon-signOut" icon={faSignOutAlt} />
        </button>
      </div>
    </>
  );
}

export default ButtonDeconnect;
