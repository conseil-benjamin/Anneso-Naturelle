import imgAccueil from "../../Images/img_accueil.png";
import braceletAccueil from "../../Images/bracelet_accueil.jpeg";
import "./HomePage.scss";
import {useEffect, useState} from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const get1_example_of_each = async () => {
        try{
          const response = await fetch(`${process.env.REACT_APP_API_URL}products/1-example-of-each`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          });
          if (response.ok){

          }
        } catch (error){
          console.log(error)
        }
    }
    get1_example_of_each();
  }, []);

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
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "5em 0 5em 0"}}>
            <img src={imgAccueil} width={300}
                 height={350}/>
            <p style={{margin: "0 5em 0 5em", fontSize: "1.5em"}}>Bien être</p>
            <img src={imgAccueil} width={300}
                 height={350}/>
          <p style={{margin: "0 0 0 5em", fontSize: "1.5em"}}>Bien être</p>
        </div>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
          <img src={imgAccueil} width={300} height={350}/>
          <p style={{fontSize: "1.5em"}}>Bien être</p>
        </div>
        <h2 style={{textAlign: "center"}}>Exemple de produits</h2>
      </div>
    </>
  );
}

export default HomePage;
