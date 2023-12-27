import imgAccueil from "../../Images/img_accueil.png";
import braceletAccueil from "../../Images/bracelet_accueil.jpeg";
import "./HomePage.scss";

function HomePage() {
  return (
    <>
      <div className="first-page-accueil-body">
        <div className="background-text-accueil">
          <div className="img-div-accueil">
            <img
              src={imgAccueil}
              alt="img_accueil"
              width={250}
              height={300}
              className="img_accueil"
            ></img>
            <img
              src={braceletAccueil}
              alt="braceletAccueil"
              width={100}
              height={100}
              className="braceletAccueil"
            ></img>
          </div>

          <div className="text-div-accueil">
            <h2>Chaque bijou Raconte une histoire</h2>
            <h3>
              Emportez un peu plus d'éclat avec vous partous où vous allez.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
