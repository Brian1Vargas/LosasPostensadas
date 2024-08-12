import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Styles.css/Register.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault(); 

 
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);


    alert("Registro exitoso"); 
    navigate("/User/Login/");
  };


  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <div className="enter-app-container">
      <div className="form-container">
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleRegister}>
          <label>
            Usuario:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" >Registrar</button>
        </form>
        <button className="back-button" onClick={handleBack}>
          Volver Atrás
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
