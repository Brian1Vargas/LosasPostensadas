

import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../Styles.css/Configuracion.css"
import NavBar from '../Components/NavBar';
const Configuracion = () => {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  const [username] = useState(storedUsername);
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const CerrarSesion = () =>{
    navigate("/");
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (currentPassword !== storedPassword) {
      setError("La contraseña actual no es correcta.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Las nuevas contraseñas no coinciden.");
      return;
    }

    localStorage.setItem("password", newPassword);
    setSuccess("Contraseña cambiada exitosamente.");
    setTimeout(() => {
      navigate("/User/Login/");
    }, 2000);
  };

  return (
    <>
    <NavBar/>
    <div className="configuracion-container">
      <h1>Configuración de Usuario</h1>
      <div className="user-info">
        <p><strong>Nombre de usuario:</strong> {username}</p>
      </div>
      <div className="password-section">
        <p>
          <strong>Contraseña actual:</strong> 
          {showPassword ? storedPassword : '********'}
          <button className="toggle-button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </p>
      </div>
      <button className="change-password-button" onClick={() => setShowChangePassword(!showChangePassword)}>
        {showChangePassword ? "Cancelar cambio de contraseña" : "Cambiar contraseña"}
      </button>
      <button className="change-password-button"  onClick={()=>CerrarSesion()} >
      Cerrar Sesión
      </button>
      {showChangePassword && (
        <form className="password-form" onSubmit={handlePasswordChange}>
          <div>
            <label>Contraseña actual:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nueva contraseña:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar nueva contraseña:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button className="submit-button" type="submit">Guardar nueva contraseña</button>
        </form>
      )}
    </div>
    </>
    
  );
};

export default Configuracion;

