import { Routes, Route, BrowserRouter } from "react-router-dom";
import EnterApp from "./Pages/EnterApp";
import Proyectos from "./Pages/Proyectos";
import Home from "./Pages/Home";
import Inspecciones from "./Pages/Inspecciones";
import CrearProyecto from "./Components/CrearProyecto";
import EliminarProyecto from "./Components/EliminarProyecto";
import EliminarInspeccion from "./Components/EliminarInspeccion";
import RegisterForm from "./Components/Register";
import EditarProyecto from "./Components/EditarProyecto";
import Login from "./Components/Login";
import ProyectosInspeccionados from "./Components/ProyectosInspeccionados";
import CrearInspeccionView from "./Components/CrearInspeccion";
import Footer from "./Components/Footer";
import Configuracion from "./Pages/Configuracion";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<EnterApp />} />
        <Route path="/User/Register/" element={<RegisterForm />} />
        <Route path="/User/Login/" element={<Login />} />


        <Route path="/Home/Initial" element={<Home />} />
        <Route path="/Proyecto/Crear" element={<CrearProyecto />} />
        <Route path="/Proyecto/Eliminar" element={<EliminarProyecto />} />
        <Route path="/Proyecto/View" element={<Proyectos />} />


        <Route path="/editar-proyecto/:index" element={<EditarProyecto/>} />

        <Route path="/Crear/Inspeccion" element={<CrearInspeccionView/>} />
        <Route path="/Inspeccion/:index" element={<Inspecciones />} />
        <Route path="/Proyectos-Inspeccionados" element={<ProyectosInspeccionados />} />
        <Route path="/Inspeccion/Eliminar" element={<EliminarInspeccion />} />
         <Route path="/Configuracion" element={<Configuracion/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
