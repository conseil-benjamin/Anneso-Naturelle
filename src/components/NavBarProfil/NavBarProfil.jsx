function NavBarProfil(
  setAdressesClique,
  setCommandesClique,
  setInfosPersoClique,
  adressesClique,
  infosPersoClique,
  commandesClique
) {
  const [infosPersoClique, setInfosPersoClique] = useState(true);
  const [commandesClique, setCommandesClique] = useState(false);
  const [adressesClique, setAdressesClique] = useState(false);
  return (
    <>
      <div className="navbar-profil">
        <a
          href="/Profil/infos-persos"
          onClick={() => setInfosPersoClique(true)}
        >
          Infos personnelles
        </a>
        <hr />
        <hr />
        <a href="">Mes commandes</a>
        <button onClick={() => setCommandesClique(true)}>Commandes</button>
      </div>
    </>
  );
}

export default NavBarProfil;
