import "./Categories.css";

function Categories({
  braceletClique,
  boucleOreilleClique,
  encensClique,
  accesoiresClique,
  setBraceletsClique,
  setBoucleOreilleClique,
  setEncensClique,
  setAccesoiresClique,
}) {
  return (
    <>
      {
        // faire du css in js pour appliquer une bordure bottom à l'élément qui est actuellement sélectionner
        // pour cela on récupère en props de composant le state qui stock le <a> qui est actuellement sélectionner
        // ou alors via l'url, on récupère l'url imaginons -> /collections/bracelets
      }
      <div className="main-div-categories">
        <a
          onClick={() => setBraceletsClique(true)}
          style={{
            borderBottom: braceletClique ? "2px solid #606c38ff" : null,
          }}
        >
          Bracelets
        </a>
        <a
          onClick={() => setBoucleOreilleClique(true)}
          style={{
            borderBottom: boucleOreilleClique ? "2px solid #606c38ff" : null,
          }}
        >
          Boucles d'oreilles
        </a>
        <a
          onClick={() => setEncensClique(true)}
          style={{
            borderBottom: encensClique ? "2px solid #606c38ff" : null,
          }}
        >
          Esotérique Support à encens
        </a>
        <a
          onClick={() => setAccesoiresClique(true)}
          style={{
            borderBottom: accesoiresClique ? "2px solid #283618ff" : null,
          }}
        >
          Acessoires
        </a>
      </div>
    </>
  );
}

export default Categories;
