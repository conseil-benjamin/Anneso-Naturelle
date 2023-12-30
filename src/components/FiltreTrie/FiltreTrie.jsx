import "./FiltreTrie.css";

function FiltreTrie({
  triageActive,
  setActiveTriage,
}) {
  return (
    <div className="divSelect">
      <select
        value={triageActive}
        onChange={(e) => setActiveTriage(e.target.value)}
      >
        <option value="">Trier</option>
        <option value={"nom"}>Nom</option>
        <option value={"croissant"}>Prix croissant</option>
        <option value={"decroissant"}>Prix décroissant</option>
      </select>
      {triageActive ? (
        <button id="btn-trie" onClick={() => setActiveTriage("")}>
          Réinitialiser Trie
        </button>
      ) : null}
    </div>
  );
}

export default FiltreTrie;
