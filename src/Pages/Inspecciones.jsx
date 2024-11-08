// src/Components/Inspeccion.js
import { useState } from "react";
import { useParams,useSearchParams } from "react-router-dom";
import NavBar from "../Components/NavBar";

export default function Inspeccion() {
  const { index } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  // Verificar que el índice sea un número
  const projectIndex = Number(index);
  const [project, setProject] = useState(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    return storedProjects[projectIndex] || {};
  });

  const [inspeccion, setInspeccion] = useState({
    inspectorName: "",
    inspectionDate: "",
    systemType: type === "adherido" ? "Adherido" : "Desadherido",
    items: {
      soporteEstado: "",
      puntalesColocados: "",
      superficieAdecuada: "",
      formaletaEstado: "",
      formaletaApoyada: "",
      formaletaUbicada: "",
      tendonesCantidad: "",
      tendonesFichasTecnicas: "",
      tendonesAlmacenados: "",
      tendonesRecubrimiento: "",
      anclajesEstado: "",
      tendonesUbicacion: "N/A",
      tendonesCurvatura: "N/A",
      anclajesFijados: "N/A",
      revestimientoExtremos: "",
      refuerzosCortante: "",
      equipoTensadoEspacio: "",
      tendonesRevestimiento: "",
      anticorrosivoExtremo: "",
      metodoColocacionConcreto: "",
      encofradoLubricado: "",
      concretoUtilizado: "",
      equipoVibrador: "",
      vibradorUtilizado: "",
      cantidadyUbicacion: "",
      cantidadcablesDuctos: "",
      perforacionesDuctos: "",
      elongaciontensada: "",
      ductosomplado: "",
      estadolechadaencemento: "",
      inyeccionlechada: "",
      dimensionesTendones: "",


      // ITEMS NUEVOS 
      tensadoCalibrado: "",
      cunasEstado : "",
      resistenciaConcreto:"",
      marcasElongacion:"",
      secuenciaTensado: "",

      comentarios: "",
    },
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInspeccion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagesPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagesPromises)
      .then((images) => {
        setInspeccion((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...images],
        }));
      })
      .catch((error) => {
        console.error("Error al leer los archivos:", error);
      });
  };

  const handleItemChange = (event) => {
    const { name, value } = event.target;
    setInspeccion((prevState) => ({
      ...prevState,
      items: {
        ...prevState.items,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedInspecciones =
      JSON.parse(localStorage.getItem("inspecciones")) || [];
    storedInspecciones.push({ projectIndex, inspeccion });
    localStorage.setItem("inspecciones", JSON.stringify(storedInspecciones));

    // navigate('/ruta-deseada');
  };
  console.log("Datos que se van a guardar:", inspeccion);
  return (
    <>
      <NavBar />

      <div>
        <h1>{type === "adherido" ? "Adherido" : "Deshaderido"}</h1>
        {/* ADHERIDO 4.9 */}
        {/* Renderiza el formulario correspondiente basado en el tipo */}
        {type === "adherido" ? (
          <div className="containerAll">
            <div className="container">
              <h1>
                Inspección del Proyecto: {project.projectName || "Desconocido"}
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombre de Inspector</label>
                  <input
                    type="text"
                    name="inspectorName"
                    value={inspeccion.inspectorName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de Inspección</label>
                  <input
                    type="date"
                    name="inspectionDate"
                    value={inspeccion.inspectionDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Sistema</label>
                  <select
                    name="systemType"
                    value={inspeccion.systemType}
                    onChange={handleInputChange}
                  >
                    <option value="Adherido">Adherido</option>
                    <option disabled value="Desadherido">
                      Desadherido
                    </option>
                  </select>
                </div>
                <h2>Sistemas de encofrado y soporte temporal</h2>
                <div className="form-group">
                  <label>
                    1.1 ¿Los elementos de soporte se encuentran en correcto
                    estado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                    Los elementos se encuentran en perfecto funcionamiento, sin
                    óxido y con todas las piezas completas y sin fallas.{" "}
                  </p>
                  <select
                    type="radio"
                    name="soporteEstado"
                    value={inspeccion.items.soporteEstado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option className="Cumple" value="Cumple">
                      Cumple
                    </option>
                    <option className="NoCumple" value="No cumple">
                      No cumple
                    </option>
                    <option className="N" value="N/A">
                      N/A
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    1.2 ¿Los puntales, andamios o vigas de carga se encuentran
                    colocados correctamente?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se encuentran ubicados de acuerdo con el plano de taller o según especificaciones dadas por el diseño de encofrado. 
                  </p>
                  <select
                    name="puntalesColocados"
                    value={inspeccion.items.puntalesColocados}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option className="Cumple" value="Cumple">
                      Cumple
                    </option>
                    <option className="NoCumple" value="No cumple">
                      No cumple
                    </option>
                    <option className="N" value="N/A">
                      N/A
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    1.3 ¿Se tiene una adecuada superficie para colocar los
                    puntales o andamios de carga garantizando su estabilidad?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                    Superficies sin desniveles que puedan provocar el
                    deslizamiento de puntales, así como resistentes y que
                    permitan soportar la carga de la losa sin riesgo a fallar.
                  </p>
                  <select
                    name="superficieAdecuada"
                    value={inspeccion.items.superficieAdecuada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    1.4 ¿La formaleta de fondo se encuentra en correcto estado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                    Los paneles no presentan grietas o desperfectos que afecten
                    la integridad de la losa y puedan llegar a presentar un
                    riesgo para la misma.
                  </p>
                  <select
                    name="formaletaEstado"
                    value={inspeccion.items.formaletaEstado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    1.5 ¿La formaleta de fondo se encuentra debidamente apoyada
                    sobre la estructura de soporte?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                    No hay presencia de paneles de formaleta sin apoyarse sobre
                    puntales o andamios de carga con sus debidas vigas.
                  </p>
                  <select
                    name="formaletaApoyada"
                    value={inspeccion.items.formaletaApoyada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>1.6 ¿Se encuentra bien ubicada la formaleta?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                    La ubicación de los paneles y así las dimensiones de la
                    formaleta de fondo se ajustan a lo indicado en los planos y
                    a las especificaciones del diseñador.
                  </p>
                  <select
                    name="formaletaUbicada"
                    value={inspeccion.items.formaletaUbicada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <h2>
                  Almacenamiento de material e instalación previo a la
                  colocación del concreto
                </h2>
                <div className="form-group">
                  <label>
                    
                    2.1 ¿Se revisaron los planos de taller del sistema? 
                  </label>
                  <p>Criterio de aceptación:</p>

                  <p className="blueCriterio">
                    {" "}

                    Los planos de taller cuentan con la información requerida, como lo es la cantidad de tendones, la ubicación, dimensiones, alturas y demás información requerida para desarrollar la construcción.
                    {/* Tener o estar por recibir en proyecto la cantidad de ductos
                    y tendones con las dimensiones según se requiere de acuerdo
                    con lo indicado en planos */}
                  </p>
                  <select
                    name="tendonesCantidad"
                    value={inspeccion.items.tendonesCantidad}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    2.2 ¿Se tienen las fichas técnicas de los elementos de
                    postensado a utilizar?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                    Tener la información técnica del fabricante de cada uno de
                    los elementos que se van a utilizar en el sistema de
                    postensado.
                  </p>
                  <select
                    name="tendonesFichasTecnicas"
                    value={inspeccion.items.tendonesFichasTecnicas}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    2.3 ¿Se adquirió el material de acuerdo con las especificaciones?
                    {/* 2.3 ¿Se tiene un correcto almacenamiento y en buen estado
                    los cables de los tendones? */}
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                    No existe evidencia de corrosión o deformaciones.
                  </p>
                  <select
                    name="tendonesAlmacenados"
                    value={inspeccion.items.tendonesAlmacenados}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    2.4 ¿Es correcta la cantidad y dimensiones de ductos y tendones?
                    {/* ¿Es correcta la cantidad y dimensiones de tendones? */}
                    
                    {/* ¿Se encuentran correctamente almacenados y en buen
                    estado los ductos para los cables de los tendones? */}
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Verificar que la cantidad de ductos y tendones que llegan al proyecto y sus dimensiones sean correctas según lo indicado en planos de diseño y planos de taller.
                  </p>
                  <select
                    name="tendonesRecubrimiento"
                    value={inspeccion.items.tendonesRecubrimiento}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.5 ¿Se tiene un correcto almacenamiento y en buen estado
                    los cables de los tendones? 
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  No existe daños de corrosión o deformaciones en los cables de acero de los tendones. 
                  </p>
                  <select
                    name="anclajesEstado"
                    value={inspeccion.items.anclajesEstado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.6 ¿Se encuentran correctamente almacenados y en buen estado los ductos para los cables de los tendones?

                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  No presentan corrosión, deformaciones u orificios que afecten el funcionamiento de los ductos para protección de los cables de acero.
                  </p>
                  <select
                    name="cantidadyUbicacion"
                    value={inspeccion.items.cantidadyUbicacion}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.7 ¿Se tiene en correcto almacenamiento y buen estado los elementos de anclaje?
                  </label>

                  <p>Criterio de aceptación:</p>

                  <p className="blueCriterio">
                  No presentan golpes, oxido, suciedad o algún tipo de daño.
                  
                  </p>
                  <select
                    name="cantidadcablesDuctos"
                    value={inspeccion.items.cantidadcablesDuctos}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.8 ¿Se tiene la cantidad y ubicación correcta de los ductos para los tendones?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se encuentran ubicados según las indicaciones del diseño, para impartir las fuerzas de pretensado deseadas.  Permitiendo una desviación máxima de 12 pulg (305mm) según lo indica el PTI.
                  </p>
                  <select
                    name="revestimientoExtremos"
                    value={inspeccion.items.revestimientoExtremos}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.9 ¿Se tiene la cantidad correcta de tendones dentro de los ductos?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se cumple con la cantidad correcta de cables dentro de los ductos de acuerdo con las especificaciones de diseño.
                  </p>
                  <select
                    name="refuerzosCortante"
                    value={inspeccion.items.refuerzosCortante}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.10 Revisar la curvatura (altura) de los tendones, contemplando los puntos altos y bajos de los torones antes de la colocación del concreto.
                  </label>

                  <p>Criterio de aceptación:</p>

                  <p className="blueCriterio">
                  Según indicaciones de diseño, manteniendo una tolerancia máxima de: 
Profundidades de losas hasta 200 mm (8 pulgadas): +-6 mm (1 1/2pulg).
Profundidades de losas entre 200 mm (8 pulgadas) y 610 mm (24 pulgadas): +-9 mm (3/8 de pulg).
Profundidades de losas superiora 610 mm (24 pulgadas): +- 13 mm (1/2 de pulg).
                  </p>
                  <select
                    name="perforacionesDuctos"
                    value={inspeccion.items.perforacionesDuctos}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>
                    2.11 ¿Están fijados los anclajes de manera correcta?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se encuentran fijados de manera perpendicular al encofrado del borde de la losa, además se dimensión y fabricó debidamente las cajas a colocar en el encofrado para que los anclajes y el equipo pueda acceder correctamente cuando se realice el tensado.
                  </p>
                  <select
                    name="tendonesRevestimiento"
                    value={inspeccion.items.tendonesRevestimiento}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.12 ¿Es correcta la cantidad y ubicación de las boquillas de inyección?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se tiene la cantidad correcta de boquillas de inyección para la posterior colocación de la lechada de cemento, además se verifica que estas se encuentran en la posición de acuerdo con las indicaciones de diseño.
                  </p>
                  <select
                    name="anticorrosivoExtremo"
                    value={inspeccion.items.anticorrosivoExtremo}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.13 ¿Se tiene refuerzos para cortante por punzonamiento en las interacciones losa-columna?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Según diseño y de acuerdo con lo especificado por el ACI 318. Reforzando como mínimo una sección crítica correspondiente al cuadrante que bordea el perímetro de la columna, el cual se debe alejar una distancia de d/2 de cada cara de la columna. Y los valores de cortante y momento que actúan sobre dicha sección están limitados por los valores permisibles que indica el ACI 318S-11.
                  </p>
                  <select
                    name="tendonesUbicacion"
                    value={inspeccion.items.tendonesUbicacion}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>
                    2.14 ¿Se tiene un adecuado espacio para equipo de tensado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se tiene suficiente espacio para el equipo que se utilizará para el tensado de los tendones, para esto se debe de revisar la ficha técnica de dicho quipo y verificar las dimensiones de este.
                  </p>
                  <select
                    name="tendonesUbdasdicacion"
                    
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>
                    2.15 ¿Presenta daños el revestimiento de los tendones?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  El revestimiento no presenta daños o en caso de presentar estos fueron reparados de manera correcta garantizando que no entre concreto dentro de dicho revestimiento durante el proceso de colado.
                  </p>
                  <select
                    name="tendonesUsbicacionsa"
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>


                <h2>Colocación del concreto</h2>
                <div className="form-group">
                  <label>
                    3.1 ¿El método de colocación del concreto es el adecuado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Se tiene claro el método de colocación de concreto (con bomba, con grúa, etc) que previamente ha sido aprobado por el diseñador y garantizando que no provoque daño la ubicación de los tendones, por ejemplo, indicando la ubicación de vaciado del balde de la grúa. </p>
                  <select
                    name="metodoColocacionConcreto"
                    value={inspeccion.items.metodoColocacionConcreto}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>3.2 ¿El encofrado está adecuadamente lubricado?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Se le aplicó desmoldante a los paneles de encofrado para su posterior desprendimiento de la losa. </p>
                  <select
                    name="encofradoLubricado"
                    value={inspeccion.items.encofradoLubricado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>3.3 ¿El concreto utilizado es el correcto?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Sin presencia de cloruro de calcio u otros aditivos que generen efectos negativos sobre el acero. </p>
                  <select
                    name="concretoUtilizado"
                    value={inspeccion.items.concretoUtilizado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    3.4 ¿Se está utilizando el equipo vibrador de manera
                    adecuada?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Garantizar que se tenga un mínimo de dos vibradores de concreto, así como el equipo necesario para la debida colocación de este. </p>
                  <select
                    name="equipoVibrador"
                    value={inspeccion.items.equipoVibrador}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>3.5 ¿El vibrador utilizado es el adecuado?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Se tiene el equipo adecuado para la vibración del concreto, el cual puede ser vibradores de punta, codales vibratorios, encofrados vibratorios o el uso de concreto autocompactante. Los cuales se encuentran en buen estado y funcionamiento. Además de contar con un equipo de respaldo para en caso de que se presente alguna falla durante del proceso del colado del concreto. </p>
                  <select
                    name="vibradorUtilizado"
                    value={inspeccion.items.vibradorUtilizado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>3.6 ¿Se tiene un correcto acabado de la superficie?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio"> El acabado de la losa es el adecuado, garantizando que se tiene una superficie nivelada o con el desnivel solicitado según diseño. Además, garantizar que se da el texturizado indicado en el diseño y no se tiene espacios vacíos o con aire en el concreto.</p>
                  <select
                    name="vibradorUtilizado"
                    value={inspeccion.items.vibradorUtilizado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>



                <div className="form-group">
                  <label>3.7 ¿Es correcta la temperatura del concreto para su colocación?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">La temperatura del concreto durante su colocación es la correcta de acuerdo con el diseño de mezcla. Lo cual se debe medir según indica la norma ASTM C1064 </p>
                  <select
                    name="vibradorUtddailizado"
                
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>3.8 ¿Se tiene una adecuada protección y curado de la losa de entrepiso?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio"> Se da el correcto curado al concreto del entrepiso, manteniéndolo hidratado de manera periódica hasta que el concreto alcance la resistencia según diseño, para esto también se puede utilizar aditivos que permitan el proceso de curado del concreto, de igual manera sin que estos tengan cloruro de calcio o sustancias que generen afectaciones en los cables del postensado. </p>
                  <select
                    name="vibraaadorUtilizado"
            
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>3.9 ¿Se realiza el muestreo para verificación de la resistencia del concreto?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Se realiza el ensayo de acuerdo con la norma ASTM C39 para la resistencia a la compresión de cilindros de concreto y se alcanza la resistencia mínima indicada en el diseño. </p>
                  <select
                    name="vibradordddUtilizado"
                    
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>


                





                <h2>Instalación de equipos y tensado de tendones</h2>
                <div className="form-group">
                  <label>
                    4.1 ¿Se alcanzó la resistencia del concreto
                    especificada,antes de iniciar el tensado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">No comenzar hasta que el concreto haya alcanzado la resistencia adecuada según las especificaciones de diseño. Comprobable mediante pruebas de laboratorio de acuerdo con la norma la norma ASTM C39. </p>
                  <select
                    name="revestimientoExtremos"
                    value={inspeccion.items.revestimientoExtremos}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    4.2 ¿El equipo de tensado se encuentra correctamente
                    calibrado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Se encuentra correctamente calibrado. Lo cual se debe verificar con una certificación que garantice la calibración de este en un periodo menor a 6 meses antes de la fecha en que se utilizará el equipo. </p>
                  <select
                    name="refuerzosCortante"
                    value={inspeccion.items.refuerzosCortante}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>4.3 ¿Las cuñas a utilizar están en buen estado?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Se utilizan cuñas nuevas, sin deformaciones en los dientes, sin óxido y con calidad homogénea. </p>
                  <select
                    name="equipoTensadoEspacio"
                    value={inspeccion.items.equipoTensadoEspacio}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>4.4 ¿Se tienen las marcas de elongación?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">Se realizaron marcas que permitan identificar y medir la elongación obtenida en el tendón posterior al tensado.</p>
                  <select
                    name="tendonesRevestimiento"
                    value={inspeccion.items.tendonesRevestimiento}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    4.5 ¿Se tiene visto bueno de la secuencia y velocidad de tensado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">El ingeniero estructural a cargo revisó y aprobó la secuencia y velocidad de aplicación de la carga. </p>
                  <select
                    name="anticorrosivoExtremo"
                    value={inspeccion.items.anticorrosivoExtremo}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    4.6 ¿Se cumple con la elongación requerida para los tendones
                    después de tensado?
                  </label>
                  <p>Criterio de aceptación:</p>

                  <p className="blueCriterio">
                    Según diseño, midiendo a 1/8 de pulgada más cercano,
                    utilizando la fórmula e=PL/AE (siendo e=elongación,
                    P=fuerza, L=longitud, A=área de sección y E=módulo de
                    elasticidad) con una tolerancia máxima de +-7% .
                  </p>
                  <select
                    name="elongaciontensada"
                    value={inspeccion.items.elongaciontensada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    4.7 ¿Se tiene el ducto somplado antes de colocar la lechada?
                  </label>
                  <p>Criterio de aceptación:</p>

                  <p className="blueCriterio">
                    Se realizó un soplado a los ductos antes de inyectar la
                    lechada de cemento, para asegurar que estos se encuentren
                    libre de obstrucciones que no permitan que la lechada se
                    distribuya a lo largo de todo el ducto.
                  </p>
                  <select
                    name="ductosomplado"
                    value={inspeccion.items.ductosomplado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    5.2 ¿Se prepara correctamente la lechada de cemento?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                    La mezcla de la lechada cumple con las especificaciones de
                    resistencia y fluidez solicitadas en el diseño.
                  </p>
                  <select
                    name="estadolechadaencemento"
                    value={inspeccion.items.estadolechadaencemento}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>5.3 ¿Se inyecta correctamente la lechada?</label>
                  <p>Criterio de aceptación:</p>

                  <p className="blueCriterio">
                    Se inyecta de manera correcta la lechada de cemento dentro
                    de los ductos con los cables ya tensados y un plazo no menor
                    a 7 dias posteriores al tensado, utilizando bombas y
                    mezcladores certificados para este proceso.
                  </p>
                  <select
                    name="inyeccionlechada"
                    value={inspeccion.items.inyeccionlechada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subir Imágenes</label>
                  <input type="file" multiple onChange={handleImageChange} />
                </div>

                <div className="form-group">
                  <label>Comentarios adicionales</label>
                  <textarea
                    name="comentarios"
                    value={inspeccion.items.comentarios}
                    onChange={handleItemChange}
                  />
                </div>

                <button type="submit">Guardar Inspección</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="containerAll">
            {/* DESHADERIDO */}
            <div className="container">
              <h1>
                Inspección del Proyecto: {project.projectName || "Desconocido"}
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombre de Inspector</label>
                  <input
                    type="text"
                    name="inspectorName"
                    value={inspeccion.inspectorName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de Inspección</label>
                  <input
                    type="date"
                    name="inspectionDate"
                    value={inspeccion.inspectionDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Sistema</label>
                  <select
                    name="systemType"
                    value={inspeccion.systemType}
                    onChange={handleInputChange}
                  >
                    <option value="Desadherido">Desadherido</option>
                    <option disabled value="Adherido">
                      Adherido
                    </option>
                  </select>
                </div>
                <h2>Sistemas de encofrado y soporte temporal</h2>
                <div className="form-group">
                  <label>
                    1.1 ¿Los elementos de soporte se encuentran en correcto
                    estado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Los elementos se encuentran en perfecto funcionamiento, sin óxido y con todas las piezas completas y sin fallas.   
                  </p>
                  <select
                    type="radio"
                    name="soporteEstado"
                    value={inspeccion.items.soporteEstado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option className="Cumple" value="Cumple">
                      Cumple
                    </option>
                    <option className="NoCumple" value="No cumple">
                      No cumple
                    </option>
                    <option className="N" value="N/A">
                      N/A
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    1.2 ¿Los puntales, andamios o vigas de carga se encuentran
                    colocados correctamente?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se encuentran ubicados de acuerdo con el plano de taller o según especificaciones dadas por el diseño de encofrado. 
                  </p>
                  <select
                    name="puntalesColocados"
                    value={inspeccion.items.puntalesColocados}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option className="Cumple" value="Cumple">
                      Cumple
                    </option>
                    <option className="NoCumple" value="No cumple">
                      No cumple
                    </option>
                    <option className="N" value="N/A">
                      N/A
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    1.3 ¿Se tiene una adecuada superficie para colocar los
                    puntales o andamios de carga garantizando su estabilidad?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Superficies sin desniveles que puedan provocar el deslizamiento de puntales, así como resistentes y que permitan soportar la carga de la losa sin riesgo a fallar.  
                  </p>
                  <select
                    name="superficieAdecuada"
                    value={inspeccion.items.superficieAdecuada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    1.4 ¿La formaleta de fondo se encuentra en correcto estado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Los paneles no presentan reventaduras o desperfectos que afecten la integridad de la losa y puedan llegar a presentar un riesgo para la misma. 
                  </p>
                  <select
                    name="formaletaEstado"
                    value={inspeccion.items.formaletaEstado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    1.5 ¿La formaleta de fondo se encuentra debidamente apoyada
                    sobre la estructura de soporte?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  No hay presencia de páneles de formaleta sin apoyarse sobre puntales o andamios de carga con sus debidas vigas. 
                  </p>
                  <select
                    name="formaletaApoyada"
                    value={inspeccion.items.formaletaApoyada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>2
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>1.6 ¿Se encuentra bien ubicada la formaleta?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  La ubicación de los páneles y así las dimensiones de la formaleta de fondo se ajustan a lo indicado en los planos y a las especificaciones del diseñador.  
                  </p>
                  <select
                    name="formaletaUbicada"
                    value={inspeccion.items.formaletaUbicada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <h2>
                  Almacenamiento de material e instalación previo a la
                  colocación del concreto
                </h2>
                <div className="form-group">
                  <label>
                    2.1 ¿Se revisaron los planos de taller del sistema?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Los planos de taller cuentan con la información requerida, como lo es la cantidad de tendones, la ubicación, dimensiones, alturas y demás información requerida para desarrollar la construcción.
                  </p>
                  <select
                    name="dimensionesTendones"
                    value={inspeccion.items.dimensionesTendones}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    2.2 ¿Se tienen las fichas técnicas de los elementos de
                    postensado a utilizar?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Tener la información tecnica del fabricante de cada uno de los elementos que se van a utilizar en el sistema de postensado.
                  </p>
                  <select
                    name="tendonesFichasTecnicas"
                    value={inspeccion.items.tendonesFichasTecnicas}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>2.3 ¿Se adquirió el material de acuerdo con las especificaciones?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se verifica que el material es acorde con lo indicado en los planos de taller, además de que corresponde al mismo indicado en la ficha técnica y cumple con las especificaciones de diseño.  Asimismo, para el caso de los cables de acero, garantizar que estos cuenten con certificado de cumplimiento de la norma ASTM A416. 
                  </p>
                  <select
                    name="tendonesAlmacenados"
                    value={inspeccion.items.tendonesAlmacenados}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.4 ¿Es correcta la cantidad y dimensiones de tendones que llegan al proyecto?
                  </label>

                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Verificar que la cantidad de tendones que lleguen al proyecto y sus dimensiones sean correctas según lo indicado en planos de diseño y planos de taller.
                  </p>
                  <select
                    name="anclajesEstado"
                    value={inspeccion.items.anclajesEstado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.5 ¿Se tiene la cantidad y ubicación correcta de los
                    tendones?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  No existe daños de corrosión o deformaciones en los cables de acero de los tendones.
                  </p>
                  <select
                    name="tendonesCantidad"
                    value={inspeccion.items.tendonesCantidad}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.6 ¿Se tiene en correcto almacenamiento y buen estado los elementos de anclaje?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  No presentan golpes, oxido, suciedad ni ningún tipo de daño.
                  </p>
                  <select
                    name="tendonesCurvatura"
                    value={inspeccion.items.tendonesCurvatura}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.7 ¿Se encuentra instalada la cantidad y ubicación correcta de los tendones?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se encuentran ubicados según las indicaciones del diseño, para impartir las fuerzas de pretensado deseadas.  Permitiendo una desviación máxima de 305mm (12 pulg) según lo indica el PTI.
                  </p>
                  <select
                    name="anclajesFijados"
                    value={inspeccion.items.anclajesFijados}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.8 ¿Es correcta la curvatura (altura) de los tendones, contemplando los puntos altos y bajos de los tendones antes de la colocación del concreto?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Según indicaciones de diseño, manteniendo una tolerancia máxima de: 
Profundidades de losas hasta 200 mm (8 pulgadas): +-6 mm (1 1/2pulg).
Profundidades de losas entre 200 mm (8 pulgadas) y 610 mm (24 pulgadas): +-9 mm (3/8 de pulg).
Profundidades de losas superiora 610 mm (24 pulgadas): +- 13 mm (1/2 de pulg).
                  </p>
                  <select
                    name="revestimientoExtremos"
                    value={inspeccion.items.revestimientoExtremos}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.9 ¿Están fijados los anclajes de manera correcta?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se encuentran fijados de manera perpendicular al encofrado del borde de la losa, además se dimensión y fabricó debidamente las cajas a colocar en el encofrado para que los anclajes y el equipo pueda acceder correctamente cuando se realice el tensado.
                  </p>
                  <select
                    name="refuerzosCortante"
                    value={inspeccion.items.refuerzosCortante}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.10 Se cortó correctamente el recubrimiento en los extremos de tensado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  El cable expuesto en la parte posterior al anclaje mide menos de 2.54 cm (1") o según lo indique el diseñador en planos.
                  </p>
                  <select
                    name="equipoTensadoEspacio"
                    value={inspeccion.items.equipoTensadoEspacio}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.11 ¿Se tiene refuerzos para cortante por punzonamiento en las interacciones losa-columna?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Según diseño y de acuerdo con lo especificado por el ACI 318. Reforzando como mínimo una sección crítica correspondiente al cuadrante que bordea el perímetro de la columna, el cual se debe alejar una distancia de d/2 de cada cara de la columna. Y los valores de cortante y momento que actúan sobre dicha sección están limitados por los valores permisibles que indica el ACI 318S-11.
                  </p>
                  <select
                    name="tendonesRevestimiento"
                    value={inspeccion.items.tendonesRevestimiento}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.12 ¿Se tiene adecuado espacio para equipo de tensado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se tiene suficiente espacio para el equipo que se utilizará para el tensado de los tendones, para esto se debe de revisar la ficha técnica de dicho quipo y verificar las dimensiones de este.
                  </p>
                  <select
                    name="anticorrosivoExtremo"
                    value={inspeccion.items.anticorrosivoExtremo}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    2.13 ¿Presenta daños el revestimiento de los tendones?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  El revestimiento no presenta daños o en caso de presentar estos fueron reparados de manera correcta garantizando que no entre concreto dentro de dicho revestimiento durante el proceso de colado.
                  </p>
                  <select
                    name="tendonesUbicacion"
                    value={inspeccion.items.tendonesUbicacion}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <h2>Colocación del concreto</h2>
                <div className="form-group">
                  <label>
                    3.1 ¿El método de colocación del concreto es el adecuado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se tiene claro el metodo de colocación de concreto (con bomba, con grúa, etc) que previamente ha sido aprobado por el diseñador y garantizando que no provoque daño a la ubicación de los tendones, por ejemplo, indicando la ubicación de vaciado del balde de la grúa. 
                  </p>
                  <select
                    name="metodoColocacionConcreto"
                    value={inspeccion.items.metodoColocacionConcreto}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>3.2 ¿El encofrado está adecuadamente lubricado?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se le aplicó desmoldante a los paneles de encofrado para su posterior desprendimiento de la losa. 
                  </p>
                  <select
                    name="encofradoLubricado"
                    value={inspeccion.items.encofradoLubricado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>3.3 ¿El concreto utilizado es el correcto?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Sin presencia de cloruro de calcio u otros aditivos que generen efectos negativos sobre el acero. 
                  </p>
                  <select
                    name="concretoUtilizado"
                    value={inspeccion.items.concretoUtilizado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    3.4 ¿Se está utilizando el equipo vibrador de manera
                    adecuada?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se utilizó el vibrador a lo largo de toda la losa, evitando que este entre en contacto con los tendones o con el acero de refuerzo. 
                  </p>
                  <select
                    name="equipoVibrador"
                    value={inspeccion.items.equipoVibrador}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>3.5 ¿El vibrador utilizado es el adecuado?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Garantizar que se tenga un mínimo de dos vibradores de concreto, así como el equipo necesario para la debida colocación de este. 
                  </p>
                  <select
                    name="vibradorUtilizado"
                    value={inspeccion.items.vibradorUtilizado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <h2>Instalación de equipos y tensado de tendones</h2>
                <div className="form-group">
                  <label>
                    4.1 ¿Se alcanzó la resistencia del concreto
                    especificada,antes de iniciar el tensado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  No comenzar hasta que el concreto haya alcanzado la resistencia adecuada según las especificaciones del diseño (Generalmente alrededor de 3000psi). Comprobable mediante pruebas de laboratorio. 
                  </p>
                  <select
                    name="resistenciaConcreto"
                    value={inspeccion.items.resistenciaConcreto}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    4.2 ¿El equipo de tensado se encuentra correctamente
                    calibrado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se encuentra correctamente calibrado. 
                  </p>
                  <select
                    name="tensadoCalibrado"
                    value={inspeccion.items.tensadoCalibrado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>4.3 ¿Las cuñas a utilizar están en buen estado?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se utilizan cuñas nuevas, sin deformaciones en los dientes, sin óxido y con calidad homogénea. 
                  </p>
                  <select
                    name="cunasEstado"
                    value={inspeccion.items.cunasEstado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>4.4 ¿Se tienen las marcas de elongación?</label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Se pintaron las marcas de la elongación que se debe realizar, en cada uno de los extremos de los tendones de la losa.
                  </p>
                  <select
                    name="marcasElongacion"
                    value={inspeccion.items.marcasElongacion}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    4.5 ¿Se tiene visto bueno de la secuencia de tensado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  El ingeniero estructural a cargo revisó y aprobó la secuencia de tensado. 
                  </p>
                  <select
                    name="secuenciaTensado"
                    value={inspeccion.items.secuenciaTensado}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    4.6 ¿Se cumple con la elongación requerida para los tendones
                    después de tensado?
                  </label>
                  <p>Criterio de aceptación:</p>
                  <p className="blueCriterio">
                  Según diseño, midiendo a 1/8 de pulgada mas cercano, con una tolerancia máxima de +-7%.
                  </p>
                 
                  <select
                    name="elongaciontensada"
                    value={inspeccion.items.elongaciontensada}
                    onChange={handleItemChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una opción:
                    </option>
                    <option value="Cumple">Cumple</option>
                    <option value="No cumple">No cumple</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subir Imágenes</label>
                  <input type="file" multiple onChange={handleImageChange} />
                </div>

                <div className="form-group">
                  <label>Comentarios adicionales</label>
                  <textarea
                    name="comentarios"
                    value={inspeccion.items.comentarios}
                    onChange={handleItemChange}
                  />
                </div>

                <button type="submit">Guardar Inspección</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
