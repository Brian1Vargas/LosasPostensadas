import { useState } from "react";
import "../Styles.css/NavBar.css";
import logo from '../Assets/logo-al_preview_rev_1.png';


function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img
              src={logo}
              alt="Logo"
              className="logo-img"
            />
          </a>
        </div>

        {/* Icono de hamburguesa */}
        <div className="burger">
          <label className="burger" htmlFor="burger">
            <input
              type="checkbox"
              id="burger"
              checked={isMenuOpen}
              onChange={toggleMenu}
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="/Home/Initial" className="nav-links" onClick={toggleMenu}>
              Inicio
            </a>
          </li>
          <li className="nav-item">
            <a
             
              className="nav-links"
              onClick={() => handleDropdownClick('projects')}
            >
              Proyectos
            </a>
            {activeDropdown === 'projects' && (
              <ul className="dropdown">
                <li className="nav-item">
                  <a href="/Proyecto/Crear" className="nav-links" onClick={toggleMenu}>
                    Crear Proyecto
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/Proyecto/Eliminar" className="nav-links" onClick={toggleMenu}>
                    Eliminar Proyecto
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/Proyecto/View" className="nav-links" onClick={toggleMenu}>
                    Ver Proyectos
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <a
             
              className="nav-links"
              onClick={() => handleDropdownClick('inspections')}
            >
              Inspecciones
            </a>
            {activeDropdown === 'inspections' && (
              <ul className="dropdown">
                <li className="nav-item">
                  <a href="/Crear/Inspeccion" className="nav-links" onClick={toggleMenu}>
                    Crear Inspeccion
                  </a>
                </li>
              
                <li className="nav-item">
                  <a href="/Proyectos-Inspeccionados" className="nav-links" onClick={toggleMenu}>
                  Ver Inspecciones
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <a href="/Configuracion" className="nav-links" onClick={toggleMenu}>
              Configuración
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
