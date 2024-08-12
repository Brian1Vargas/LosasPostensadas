// src/Components/ProyectosInspeccionados.jsx
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "../Styles.css/ProyectosInspeccionados.css";
import NavBar from "./NavBar";
import PdfViewer from "./PdfViewer"; // Asegúrate de importar PdfViewer

export default function ProyectosInspeccionados() {
  const [projects, setProjects] = useState([]);
  const [inspecciones, setInspecciones] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const storedInspecciones =
      JSON.parse(localStorage.getItem("inspecciones")) || [];

    setProjects(storedProjects);
    setInspecciones(storedInspecciones);


  }, []);

  const getProjectByIndex = (index) => {
    const projectIndex = Number(index);
    if (
      !isNaN(projectIndex) &&
      projectIndex >= 0 &&
      projectIndex < projects.length
    ) {
      return projects[projectIndex];
    } else {
      return undefined;
    }
  };

  const handleDelete = (idx) => {
    const updatedInspecciones = inspecciones.filter(
      (_, index) => index !== idx
    );
    setInspecciones(updatedInspecciones);
    localStorage.setItem("inspecciones", JSON.stringify(updatedInspecciones));
  };

  const generatePdf = (inspeccion, project, index) => {
    const doc = new jsPDF();


    const margin = 10;
    const lineHeight = 10; 

 
    doc.setFontSize(14);
    doc.text(`Información del Proyecto:`, 10, 10);
    let yPosition = 20; // Reiniciar posición vertical
  
    const detailsv2 = [
      `Nombre del Proyecto: ${project.projectName}`,
      `Ubicacion: ${project.location}`,
      `Ingeniero Director: ${project.directorEngineer}`,
      `Ingeniero Residente: ${project.residentEngineer}`,
      `Compañía Constructora: ${project.constructionCompany}`,
      `Compañía de Postensado: ${project.postTensioningCompany}`,
      `Número de Pisos: ${project.numberOfFloors}`,
    ];
  
    detailsv2.forEach((detail) => {
      // Comprobar si el texto se desborda
      if (yPosition + lineHeight > doc.internal.pageSize.height - margin) {
        doc.addPage(); 
        yPosition = margin; 
      }
      doc.text(detail, 10, yPosition);
      yPosition += lineHeight;
    });
  
    doc.addPage();







    doc.setFontSize(20);
    doc.text(`Inspección ${index + 1}`, 10, 10);
  
    doc.setFontSize(12);
    doc.text(
      `Nombre del Inspector: ${inspeccion.inspeccion.inspectorName}`,
      10,
      20
    );
    doc.text(
      `Fecha de Inspección: ${inspeccion.inspeccion.inspectionDate}`,
      10,
      30
    );
    doc.text(`Tipo de Sistema: ${inspeccion.inspeccion.systemType}`, 10, 40);
  
    doc.setFontSize(14);
    doc.text(`Detalles de Inspección:`, 10, 50);
    yPosition = 60;
    // Altura de cada línea
    // Margen
  
    const details = [
      `Tipo de Sistema: ${project.systemType}`, 
      `Estado de Soporte: ${inspeccion.inspeccion.items.soporteEstado}`,
      `Puntales Colocados: ${inspeccion.inspeccion.items.puntalesColocados}`,
      `Superficie Adecuada: ${inspeccion.inspeccion.items.superficieAdecuada}`,
      `Estado de Formaleta: ${inspeccion.inspeccion.items.formaletaEstado}`,
      `Formaleta Apoyada: ${inspeccion.inspeccion.items.formaletaApoyada}`,
      `Formaleta Ubicada: ${inspeccion.inspeccion.items.formaletaUbicada}`,
      `Cantidad de Tendones: ${inspeccion.inspeccion.items.tendonesCantidad}`,
      `Fichas Técnicas de Tendones: ${inspeccion.inspeccion.items.tendonesFichasTecnicas}`,
      `Tendones Almacenados: ${inspeccion.inspeccion.items.tendonesAlmacenados}`,
      `Recubrimiento de Tendones: ${inspeccion.inspeccion.items.tendonesRecubrimiento}`,
      `Estado de Anclajes: ${inspeccion.inspeccion.items.anclajesEstado}`,
      `Ubicación de Tendones: ${inspeccion.inspeccion.items.tendonesUbicacion}`,
      `Curvatura de Tendones: ${inspeccion.inspeccion.items.tendonesCurvatura}`,
      `Anclajes Fijados: ${inspeccion.inspeccion.items.anclajesFijados}`,
      `Revestimiento de Extremos: ${inspeccion.inspeccion.items.revestimientoExtremos}`,
      `Refuerzos Cortantes: ${inspeccion.inspeccion.items.refuerzosCortante}`,
      `Espacio de Equipo de Tensado: ${inspeccion.inspeccion.items.equipoTensadoEspacio}`,
      `Tendones Revestidos: ${inspeccion.inspeccion.items.tendonesRevestimiento}`,
      `Anticorrosivo en Extremos: ${inspeccion.inspeccion.items.anticorrosivoExtremo}`,
      `Método de Colocación de Concreto: ${inspeccion.inspeccion.items.metodoColocacionConcreto}`,
      `Encofrado Lubricado: ${inspeccion.inspeccion.items.encofradoLubricado}`,
      `Concreto Utilizado: ${inspeccion.inspeccion.items.concretoUtilizado}`,
      `Equipo Vibrador: ${inspeccion.inspeccion.items.equipoVibrador}`,
      `Vibrador Utilizado: ${inspeccion.inspeccion.items.vibradorUtilizado}`,
      `Cantidad y ubicación correcta de los ductos para los tendones: ${inspeccion.inspeccion.items.cantidadyUbicacion}`,
      `Cantidad correcta de cables dentro de los ductos de los tendones: ${inspeccion.inspeccion.items.cantidadcablesDuctos}`,
      `Elongación requerida para los torones después de tensado: ${inspeccion.inspeccion.items.elongaciontensada}`,
      `Ducto somplado antes de colocar la lechada: ${inspeccion.inspeccion.items.perforacionesDuctos}`,
      `Se prepara correctamente la lechada de cemento: ${inspeccion.inspeccion.items.estadolechadaencemento}`,
      `Se inyecta correctamente la lechada: ${inspeccion.inspeccion.items.inyeccionlechada}`
    ];
 
    details.forEach((detail) => {

      if (yPosition + lineHeight > doc.internal.pageSize.height - margin) {
        doc.addPage();
        yPosition = margin; 
      }
      doc.text(detail, 10, yPosition);
      yPosition += lineHeight;
    });
    yPosition = 20;

  

    if (inspeccion.inspeccion.images) {
      inspeccion.inspeccion.images.forEach((image, imgIndex) => {
        doc.addPage();
        doc.text(`Imagen ${imgIndex + 1}`, 10, 10);
        doc.addImage(image, "JPEG", 10, 20, 180, 160); 
      });
    }
  
  
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setSelectedPdf(pdfUrl);
  };
  

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };
 console.log(inspecciones)
  return (
    <>
      <NavBar />
      <div className="inspecciones-container">
        {inspecciones.map((inspeccion, idx) => {
          const project = getProjectByIndex(inspeccion.projectIndex);
          return (
            <div key={idx} className="inspeccion-card">
              <div className="card-header">
                <h2>Inspección {idx + 1}</h2>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(idx)}
                >
                  Eliminar
                </button>
                <button
                  className="generate-pdf-button"
                  onClick={() => generatePdf(inspeccion, project, idx)}
                >
                  Generar PDF
                </button>
              </div>
              <div className="card-body">
                <div className="inspeccion-details">
                  <h3>Datos de Inspección:</h3>
                  <p>
                    <strong>Nombre del Inspector:</strong>{" "}
                    {inspeccion.inspeccion.inspectorName}
                  </p>
                  <p>
                    <strong>Fecha de Inspección:</strong>{" "}
                    {inspeccion.inspeccion.inspectionDate}
                  </p>
                  <p>
                    <strong>Tipo de Sistema:</strong>{" "}
                    {project.systemType}
                    
                  </p>
           
                  <h4>Detalles de Inspección:</h4>
                  <p>
                    <strong>Estado de Soporte:</strong>{" "}
                    {inspeccion.inspeccion.items.soporteEstado}
                  </p>
                  <p>
                    <strong>Puntales Colocados:</strong>{" "}
                    {inspeccion.inspeccion.items.puntalesColocados}
                  </p>
                  <p>
                    <strong>Superficie Adecuada:</strong>{" "}
                    {inspeccion.inspeccion.items.superficieAdecuada}
                  </p>
                  <p>
                    <strong>Estado de Formaleta:</strong>{" "}
                    {inspeccion.inspeccion.items.formaletaEstado}
                  </p>
                  <p>
                    <strong>Formaleta Apoyada:</strong>{" "}
                    {inspeccion.inspeccion.items.formaletaApoyada}
                  </p>
                  <p>
                    <strong>Formaleta Ubicada:</strong>{" "}
                    {inspeccion.inspeccion.items.formaletaUbicada}
                  </p>
                  <p>
                    <strong>Cantidad de Tendones:</strong>{" "}
                    {inspeccion.inspeccion.items.tendonesCantidad}
                  </p>
                  <p>
                    <strong>Fichas Técnicas de Tendones:</strong>{" "}
                    {inspeccion.inspeccion.items.tendonesFichasTecnicas}
                  </p>
                  <p>
                    <strong>Tendones Almacenados:</strong>{" "}
                    {inspeccion.inspeccion.items.tendonesAlmacenados}
                  </p>
                  <p>
                    <strong>Recubrimiento de Tendones:</strong>{" "}
                    {inspeccion.inspeccion.items.tendonesRecubrimiento}
                  </p>
                  <p>
                    <strong>Estado de Anclajes:</strong>{" "}
                    {inspeccion.inspeccion.items.anclajesEstado}
                  </p>
                  <p>
                    <strong>Ubicación de Tendones:</strong>{" "}
                    {inspeccion.inspeccion.items.tendonesUbicacion}
                  </p>
                  <p>
                    <strong>Curvatura de Tendones:</strong>{" "}
                    {inspeccion.inspeccion.items.tendonesCurvatura}
                  </p>
                  <p>
                    <strong>Anclajes Fijados:</strong>{" "}
                    {inspeccion.inspeccion.items.anclajesFijados}
                  </p>
                  <p>
                    <strong>Revestimiento de Extremos:</strong>{" "}
                    {inspeccion.inspeccion.items.revestimientoExtremos}
                  </p>
                  <p>
                    <strong>Refuerzos Cortantes:</strong>{" "}
                    {inspeccion.inspeccion.items.refuerzosCortante}
                  </p>
                  <p>
                    <strong>Espacio de Equipo de Tensado:</strong>{" "}
                    {inspeccion.inspeccion.items.equipoTensadoEspacio}
                  </p>
                  <p>
                    <strong>Tendones Revestidos:</strong>{" "}
                    {inspeccion.inspeccion.items.tendonesRevestimiento}
                  </p>
                  <p>
                    <strong>Anticorrosivo en Extremos:</strong>{" "}
                    {inspeccion.inspeccion.items.anticorrosivoExtremo}
                  </p>
                  <p>
                    <strong>Método de Colocación de Concreto:</strong>{" "}
                    {inspeccion.inspeccion.items.metodoColocacionConcreto}
                  </p>
                  <p>
                    <strong>Encofrado Lubricado:</strong>{" "}
                    {inspeccion.inspeccion.items.encofradoLubricado}
                  </p>
                  <p>
                    <strong>Concreto Utilizado:</strong>{" "}
                    {inspeccion.inspeccion.items.concretoUtilizado}
                  </p>
                  <p>
                    <strong>Equipo Vibrador:</strong>{" "}
                    {inspeccion.inspeccion.items.equipoVibrador}
                  </p>
                  <p>
                    <strong>Vibrador Utilizado:</strong>{" "}
                    {inspeccion.inspeccion.items.vibradorUtilizado}
                  </p>
                 
                  <p>
                    <strong>
                      Cantidad y ubicación correcta de los ductos para los
                      tendones:
                    </strong>{" "}
                    {inspeccion.inspeccion.items.cantidadyUbicacion}
                  </p>
                  <p>
                    <strong>
                      Cantidad correcta de cables dentro de los ductos de los
                      tendones:
                    </strong>{" "}
                    {inspeccion.inspeccion.items.cantidadcablesDuctos}
                  </p>
                  <p>
                    <strong>
                      Elongación requerida para los torones después de tensado:
                    </strong>{" "}
                    {inspeccion.inspeccion.items.elongaciontensada}
                  </p>
                  <p>
                    <strong>Ducto somplado antes de colocar la lechada:</strong>{" "}
                    {inspeccion.inspeccion.items.perforacionesDuctos}
                  </p>
                  <p>
                    <strong>
                      Se prepara correctamente la lechada de cemento:
                    </strong>{" "}
                    {inspeccion.inspeccion.items.estadolechadaencemento}
                  </p>
                  <p>
                    <strong>Se inyecta correctamente la lechada:</strong>{" "}
                    {inspeccion.inspeccion.items.inyeccionlechada}
                  </p>
                </div>

                {inspeccion.inspeccion.images && (
                  <div className="images-container">
                    {inspeccion.inspeccion.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className="logo-image"
                        alt={`Inspección ${idx + 1} - Imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                <div className="project-details">
                  <h3>Proyecto:</h3>
                  {project ? (
                    <>
                      <p>
                        <strong>Nombre del Proyecto:</strong>{" "}
                        {project.projectName}
                      </p>
                      <p>
                        <strong>Ubicación:</strong> {project.location}
                      </p>
                      <p>
                        <strong>Ingeniero Director:</strong>{" "}
                        {project.directorEngineer}
                      </p>
                      <p>
                        <strong>Ingeniero Residente:</strong>{" "}
                        {project.residentEngineer}
                      </p>
                      <p>
                        <strong>Compañía Constructora:</strong>{" "}
                        {project.constructionCompany}
                      </p>
                      <p>
                        <strong>Compañía de Postensado:</strong>{" "}
                        {project.postTensioningCompany}
                      </p>
                      <p>
                        <strong>Número de Pisos:</strong>{" "}
                        {project.numberOfFloors}
                      </p>
                      <p>
                        <strong>Tipo de Sistema:</strong> {project.systemType}
                      </p>
                    </>
                  ) : (
                    <p>No se encontró el proyecto.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedPdf && (
        <PdfViewer pdfUrl={selectedPdf} onClose={closePdfViewer} zoom={1.1} />
      )}
    </>
  );
}
