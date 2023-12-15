import "./FiltreTrie.css";

function FiltreTrie({
  setActiveCategory,
  categories,
  activeCategory,
  triageActive,
  setActiveTriage,
}) {
  return (
    <div className="divSelect">
      <select
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
        className="lmj-categories-select"
      >
        <option value="">Filtrer</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={triageActive}
        onChange={(e) => setActiveTriage(e.target.value)}
      >
        <option value="">Trier</option>
        <option value={"nom"}>Nom</option>
        <option value={"croissant"}>Prix croissant</option>
        <option value={"decroissant"}>Prix décroissant</option>
        <option value={"moinsArrosage"}>Moins d'arrosage</option>
        <option value={"plusArrosage"}>Plus d'arrosage</option>
        <option value={"moinsLumiere"}>Moins de lumière</option>
        <option value={"plusLumiere"}>Plus de lumière</option>
      </select>
      {triageActive ? (
        <button id="btn-trie" onClick={() => setActiveTriage("")}>
          Réinitialiser Trie
        </button>
      ) : null}
      {activeCategory ? (
        <button onClick={() => setActiveCategory("")}>
          Réinitialiser Filtre
        </button>
      ) : null}
    </div>
  );
}

export default FiltreTrie;
