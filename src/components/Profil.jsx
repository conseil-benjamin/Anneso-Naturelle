import { useLocation } from "react-router-dom";

function Profil() {
  const location = useLocation();
  const {
    id,
    name,
    prenom,
    age,
    adresses,
    adresseEmail,
    mdp,
    numeroTel,
    statusClient,
    historiqueCommandes,
  } = location.state || {};

  return (
    <div>
      <h1>Salut {id}</h1>
      <h1>Salut {name}</h1>
      <h1>Salut {prenom}</h1>
      <h1>Salut {age}</h1>
      <h1>Salut {adresses}</h1>
      <h1>Salut {adresseEmail}</h1>
      <h1>Salut {mdp}</h1>
      <h1>Salut {numeroTel}</h1>
      <h1>Salut {statusClient}</h1>
      <h1>Salut {historiqueCommandes}</h1>
    </div>
  );
}

export default Profil;
