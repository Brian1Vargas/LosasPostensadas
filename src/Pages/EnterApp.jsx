import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Login";
import RegisterForm from "../Components/Register";
import "../Styles.css/Register.css";
import ucrImg from "../Assets/ucr.jpg";
import eicImg from "../Assets/EIC.jpg";
const EnterApp = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleRegister = () => {
    navigate("/User/Register");
  };

  const handleLogin = () => {
    navigate("/User/Login");
  };

  const handleLoginSubmit = (username, password) => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
    <div className="enter-app-container">
      {!isLoggedIn && !isRegistering && !isLoggingIn ? (
        <div className="welcome-container">
          <h2>
            Aplicación para la inspección de losas postensadas de entrepiso
          </h2>
          <p>
            Esta página web forma parte del proyecto final de graduación del
            estudiante <strong>Brayan Alpízar Carvajal, cedula 2-0798-0990, estudiante
            de la carrera de Ingeniería Civil de la Universidad de Costa Rica.</strong><br></br>
            Los derechos de autor de la presente página y sus resultados son
            compartidos con los siguientes ingenieros miembros del comité
            asesor. <br></br>
            <strong>Director: Ing. Allan Rojas Ramírez Asesor: Robert Anglin
            Fonseca Asesor: Sergio Aragón Masis </strong>Asimismo, cedo los derechos de
            actualización de este trabajo a la Universidad de Costa Rica para
            fines académicos, de docencia, investigación, acción social y
            divulgación. Ni la Universidad de Costa Rica, ni los miembros del
            comité asesor, ni ninguna persona que haya participado en la
            elaboración de este proyecto, se hacen responsables del uso de la
            información proporcionada en esta página.
          </p>
          <img src={ucrImg} alt="UCR" />
          <img src={eicImg} alt="EIC" />
        
          <div className="button-container">
            <button onClick={handleRegister}>Registrar Usuario</button>
            <button onClick={handleLogin}>Iniciar Sesión</button>
          </div>
        </div>
      ) : isLoggedIn ? (
        <div className="welcome-container">
          <h2>Bienvenido de vuelta</h2>
        </div>
      ) : isRegistering ? (
        <RegisterForm onRegister={() => navigate("/")} />
      ) : (
        <Login onLogin={handleLoginSubmit} />
      )}
    </div>

    </>
    
  );
};

export default EnterApp;
