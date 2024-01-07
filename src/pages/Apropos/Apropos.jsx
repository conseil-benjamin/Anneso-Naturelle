import "./Apropos.css";
import maman from "../../Images/maman.jpg";

function Apropos() {
  return (
    <>
      <div className="div-text-aPropos">
        <div className="a-propos-div-image">
          <h1>Anne-Sophie</h1>
          <img src={maman} alt="image_anne-sophie"></img>
        </div>
        <div className="a-propos-texte">
          <div className="container-left-text-a-propos">
            <div id="text-1">
              <p>
                Je me présente, je suis Anne-Sophie, une passionnée de 50 ans
                qui a plongé dans l'univers envoûtant des pierres naturelles il
                y a une décennie. Cette aventure a profondément transformé ma
                vie et m'a inspirée à explorer les innombrables possibilités
                créatives que ces trésors de la nature offrent.
              </p>
            </div>

            <div id="text-2">
              <p>
                <br /> Depuis les deux dernières années, j'ai embrassé ma
                passion en tant que créatrice de bijoux et d'accessoires
                confectionnés avec des pierres naturelles. Mon objectif est de
                vous offrir des pièces uniques qui transcendent le simple aspect
                esthétique pour devenir de véritables compagnons de votre
                quotidien. <br />
              </p>
            </div>

            <div id="text-3">
              <p>
                Chaque création que je façonne porte en elle une énergie
                spéciale, puisée dans les vibrations uniques de ces pierres,
                pour vous accompagner dans votre voyage personnel. C'est bien
                plus qu'une simple collection de bijoux. C'est une expérience
                holistique où la méditation et la relaxation se mêlent à
                l'esthétique, créant une harmonie entre le physique et le
                spirituel.
                <br />
              </p>
            </div>

            <div id="text-4">
              <p>
                Les pierres naturelles que j'utilise sont soigneusement
                sélectionnées non seulement pour leur beauté, mais aussi pour
                leurs propriétés énergétiques spécifiques. Chaque pièce devient
                ainsi une invitation à la contemplation, un pont entre le
                matériel et le spirituel.
              </p>
            </div>
          </div>
          <div className="div-fleches">
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1704293791/Assets/right-2.png"
              alt="fleche"
              width={250}
              height={96}
            ></img>
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1704294679/Assets/left-1.png"
              alt="fleche"
              width={250}
              height={96}
            ></img>
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1704293791/Assets/right-2.png"
              alt="fleche"
              width={250}
              height={96}
            ></img>
            <img
              src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1704294679/Assets/left-1.png"
              alt="fleche"
              width={250}
              height={96}
            ></img>
          </div>
          <div className="container-right-text-a-propos">
            <div id="text-5">
              <p>
                Les pierres naturelles que j'utilise sont soigneusement
                sélectionnées non seulement pour leur beauté, mais aussi pour
                leurs propriétés énergétiques spécifiques. Chaque pièce devient
                ainsi une invitation à la contemplation, un pont entre le
                matériel et le spirituel.
                <br />
              </p>
            </div>

            <div id="text-6">
              <p>
                Naviguez à travers les différentes rubriques de ma collection,
                et vous découvrirez bien plus qu'une simple gamme de bijoux.
                Vous trouverez des sections dédiées à l'amélioration de votre
                bien-être personnel, où je partage des conseils pratiques et des
                techniques de méditation.
              </p>
            </div>

            <div id="text-7">
              <p>
                Mais ce n'est pas tout, car je crois fermement que notre
                bien-être est intrinsèquement lié à celui de notre
                environnement. C'est pourquoi vous trouverez également des
                suggestions et des idées pour créer une atmosphère paisible et
                équilibrée autour de vous, en harmonie avec les énergies de la
                nature.
              </p>
            </div>

            <div id="text-8">
              <p>
                Au fil des pages, plongez dans un monde où la créativité, la
                spiritualité et le bien-être se rejoignent. Laissez-vous
                emporter par l'énergie positive des pierres naturelles et
                découvrez comment elles peuvent enrichir votre vie de manière
                profonde et significative. Bienvenue dans mon univers où chaque
                bijou, chaque accessoire, est une invitation à vous reconnecter
                avec vous-même et avec le monde qui vous entoure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Apropos;
