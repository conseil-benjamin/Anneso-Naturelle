import "./CardFavoris.css";

function CardFavoris({ coverArticle, prixArticle, nomArticle }) {
  return (
    <div className="div-commande">
      <div className="container-left">
        <img src={coverArticle} width={150} height={150}></img>
        <h4>{prixArticle} €</h4>
      </div>
      <div className="container-right">
        <h4>{nomArticle}</h4>
        <button>Supprimer</button>
      </div>
    </div>
  );
}

export default CardFavoris;
