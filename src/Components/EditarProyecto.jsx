import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import "../Styles.css/EditProyecto.css"

export default function EditarProyecto() {
  const { index } = useParams();
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    directorEngineer: '',
    residentEngineer: '',
    constructionCompany: '',
    postTensioningCompany: '',
    numberOfFloors: '',
    systemType: 'adherido'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    if (projects[index]) {
      setFormData(projects[index]);
    }
  }, [index]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
    existingProjects[index] = formData;
    localStorage.setItem('projects', JSON.stringify(existingProjects));
    navigate('/proyectos'); // Redirige a la vista de proyectos después de guardar
  };

  return (
    <>
      <NavBar />
      <div className="containerAll">
      <div className="container">
        <h1>Editar Proyecto</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="projectName">Nombre del Proyecto</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Ubicación</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="directorEngineer">Nombre del Ingeniero Director</label>
            <input
              type="text"
              id="directorEngineer"
              name="directorEngineer"
              value={formData.directorEngineer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="residentEngineer">Nombre del Ingeniero Residente</label>
            <input
              type="text"
              id="residentEngineer"
              name="residentEngineer"
              value={formData.residentEngineer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="constructionCompany">Nombre de la Empresa Constructora</label>
            <input
              type="text"
              id="constructionCompany"
              name="constructionCompany"
              value={formData.constructionCompany}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postTensioningCompany">Nombre de la Empresa del Sistema Postensado</label>
            <input
              type="text"
              id="postTensioningCompany"
              name="postTensioningCompany"
              value={formData.postTensioningCompany}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfFloors">Cantidad de Entrepisos</label>
            <input
              type="number"
              id="numberOfFloors"
              name="numberOfFloors"
              value={formData.numberOfFloors}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="systemType">Tipo de Sistema</label>
            <select
              id="systemType"
              name="systemType"
              value={formData.systemType}
              onChange={handleChange}
              required
            >
              <option value="adherido">Adherido</option>
              <option value="desadherido">Desadherido</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">Actualizar Proyecto</button>
        </form>
      </div>
      </div>
      
    </>
  );
}
