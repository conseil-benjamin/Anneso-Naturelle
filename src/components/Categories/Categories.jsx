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
        <span>Filtrer par </span>
        <hr className="hr-custom" />
        <span>Catégorie</span>
        <a
          onClick={() => setBraceletsClique(true)}
          style={{
            fontWeight: braceletClique ? "bold" : "300",
          }}
        >
          Bracelets
        </a>

        <a
          onClick={() => setBoucleOreilleClique(true)}
          style={{
            fontWeight: boucleOreilleClique ? "bold" : "300",
          }}
        >
          Boucles d'oreilles
        </a>
        <a
          onClick={() => setEncensClique(true)}
          style={{
            fontWeight: encensClique ? "bold" : "300",
          }}
        >
          Esotérique Support à encens
        </a>
        <a
          onClick={() => setAccesoiresClique(true)}
          style={{
            fontWeight: accesoiresClique ? "bold" : "300",
          }}
        >
          Acessoires
        </a>
        <hr className="hr-custom" />
      </div>
    </>
  );
}

export default Categories;
