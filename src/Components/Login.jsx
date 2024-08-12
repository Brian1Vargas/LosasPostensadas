import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    // Comprobar los datos en localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      alert("Inicio de sesión exitoso!");
      navigate("/Home/Initial");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleBack = () => {
    navigate("/"); // Navega hacia la página anterior
  };

  return (
    <div className="enter-app-container">
      <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button className="back-button" onClick={handleBack}>
          Volver Atrás
        </button>
      </div>
    </div>
  );
};

export default Login;
