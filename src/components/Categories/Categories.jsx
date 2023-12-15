function Categories() {
  return (
    <>
      {
        // faire du css in js pour appliquer une bordure bottom à l'élément qui est actuellement sélectionner
        // pour cela on récupère en props de composant le state qui stock le <a> qui est actuellement sélectionner
        // ou alors via l'url, on récupère l'url imaginons -> /collections/bracelets
      }
      <a>Bracelets</a>
      <a>Boucles d'oreilles</a>
      <a>Esotérique Support à encens</a>
      <a>Acessoires</a>
    </>
  );
}

export default Categories;
