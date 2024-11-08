import NavBar from "../Components/NavBar";
import "../Styles.css/Home.css"
export default function Home() {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="content">
          <h1>Bienvenido a la Aplicación</h1>
          <p>
            Esta aplicación es desarrollada por el estudiante Brayan Alpízar
            Carvajal de la carrera de ingeniería civil en la Universidad de Costa
            Rica. El objetivo principal de la aplicación es facilitar el proceso
            de inspección de las losas postensadas de entrepiso y cada uno de los
            componentes de este sistema.
          </p>
          <p>
          Cedo los derechos de actualización de este trabajo a la Universidad de Costa Rica para fines académicos, 
          de docencia, investigación, acción social y divulgación. 
          Ni la Universidad de Costa Rica, ni los miembros del comité asesor, 
          ni ninguna persona que haya participado en la elaboración de este proyecto, 
          se hacen responsables del uso de la información proporcionada en esta página.
          </p>
       
        </div>
      </div>
    </>
  );
}
