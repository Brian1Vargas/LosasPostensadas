import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import PdfViewer from '../Components/PdfViewer';
import Modal from 'react-modal';
import "../Styles.css/Proyectos.css";

Modal.setAppElement('#root'); // Configurar el elemento raíz para el modal

export default function CrearInspeccionView() {
    const [projects, setProjects] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(storedProjects);
    }, []);

    const handleEdit = (index) => {
        navigate(`/editar-proyecto/${index}`);
    };

    const handleInspeccion = (index) => {
        setSelectedProjectIndex(index);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedProjectIndex(null);
    };

    const goToFormulario = (type) => {
        navigate(`/Inspeccion/${selectedProjectIndex}?type=${type}`);
        closeModal();
    };

    const generatePdf = (index) => {
        const project = projects[index];
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text(`Proyecto: ${project.projectName}`, 10, 10);

        doc.setFontSize(12);
        doc.text(`Nombre del Proyecto: ${project.projectName}`, 10, 20);
        doc.text(`Ubicación: ${project.location}`, 10, 30);
        doc.text(`Ingeniero Director: ${project.directorEngineer}`, 10, 40);
        doc.text(`Ingeniero Residente: ${project.residentEngineer}`, 10, 50);
        doc.text(`Empresa Constructora: ${project.constructionCompany}`, 10, 60);
        doc.text(`Empresa del Sistema Postensado: ${project.postTensioningCompany}`, 10, 70);
        doc.text(`Cantidad de Entrepisos: ${project.numberOfFloors}`, 10, 80);
        doc.text(`Tipo de Sistema: ${project.systemType}`, 10, 90);

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setSelectedPdf(pdfUrl);
    };

    const closePdfViewer = () => {
        setSelectedPdf(null);
    };

    return (
        <>
            <NavBar />

            <div className="containerAll">
                <div className="container">
                    <h1>Proyectos para inspeccionar</h1>
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
                                        onClick={() => handleInspeccion(index)}
                                        className="btn-inspeccionar"
                                    >
                                        Inspeccionar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay proyectos guardados.</p>
                    )}
                    {selectedPdf && <PdfViewer pdfUrl={selectedPdf} onClose={closePdfViewer} />}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Seleccionar Tipo de Inspección"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Seleccionar Tipo de Inspección</h2>
                <button onClick={() => goToFormulario('adherido')}>Formulario Adherido</button>
                <button onClick={() => goToFormulario('deshaderido')}>Formulario Deshaderido</button>
                <button onClick={closeModal}>Cancelar</button>
            </Modal>
        </>
    );
}
