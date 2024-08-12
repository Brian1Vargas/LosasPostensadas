import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import "../Styles.css/Delete.css"

export default function EliminarProyecto() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  }, []);

  const handleDelete = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  return (
    <>
      <NavBar />
      <div className="containerAll">
      <div className="container">
        <h1>Eliminar Proyecto</h1>
        {projects.length > 0 ? (
          <ul className="project-list">
            {projects.map((project, index) => (
              <li key={index} className="project-item">
                <div className="project-info">
                  <p><strong>Nombre del Proyecto:</strong> {project.projectName}</p>
                  <p><strong>Ubicación:</strong> {project.location}</p>
                  <p><strong>Ingeniero Director:</strong> {project.directorEngineer}</p>
                  <p><strong>Ingeniero Residente:</strong> {project.residentEngineer}</p>
                  <p><strong>Empresa Constructora:</strong> {project.constructionCompany}</p>
                  <p><strong>Empresa del Sistema Postensado:</strong> {project.postTensioningCompany}</p>
                  <p><strong>Cantidad de Entrepisos:</strong> {project.numberOfFloors}</p>
                  <p><strong>Tipo de Sistema:</strong> {project.systemType}</p>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay proyectos guardados.</p>
        )}
      </div>
      </div>
     
    </>
  );
}
