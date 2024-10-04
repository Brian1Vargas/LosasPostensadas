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
            Utilizando esta herramienta, podrás llevar a cabo inspecciones
            detalladas, registrar observaciones y generar reportes de manera
            eficiente.
          </p>
       
        </div>
      </div>
    </>
  );
}
