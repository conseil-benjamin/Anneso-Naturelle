import "./Categories.css";

function Categories({
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
        <a onClick={() => setBraceletsClique(true)}>Bracelets</a>
        <a onClick={() => setBoucleOreilleClique(true)}>Boucles d'oreilles</a>
        <a onClick={() => setEncensClique(true)}>Esotérique Support à encens</a>
        <a onClick={() => setAccesoiresClique(true)}>Acessoires</a>
      </div>
    </>
  );
}

export default Categories;
