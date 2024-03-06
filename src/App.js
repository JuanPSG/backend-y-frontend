import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './componentes/Login';
import Navbar from './componentes/Navbar';
import Home from './componentes/Home';
import Alumno from './componentes/alumnos';
import Actividad from './componentes/Actividades';
import ActividadesAlumnos from './componentes/Act_Alum'; 
import ConcTra from './componentes/Con_tra';
import Concentra from './componentes/Concentrado';
import Formulario from './componentes/Formulario'; 
import Cerrar from './componentes/Cerrar';
import Footer from './componentes/Footer';
import Asistencia from './componentes/Asistencia'; // Importa el componente Asistencia

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar />} 
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn ? <Home /> : <Login onLogin={() => setIsLoggedIn(true)} />
          }
        />
        <Route path='/home' element={<Home />} />
        <Route path='/alumnos' element={<Alumno />} />
        <Route path='/Actividades' element={<Actividad />} /> 
        <Route path='/Act_alum' element={<ActividadesAlumnos />} /> 
        <Route path='/Con_tra' element={<ConcTra />} />
        <Route path='/Concentrado' element={<Concentra />} />
        <Route path='/formulario' element={<Formulario />} /> 
        <Route path='/Cerrar' element={<Cerrar onLogout={handleLogout} />} />
        <Route path='/asistencia' element={<Asistencia />} /> {/* Nueva ruta para Asistencia */}
        <Route path='/actividades/:codigoAlumno' element={<ActividadesAlumnos />} />
        <Route path='/*' element={!isLoggedIn ? <Navigate to="/login" /> : null} />
      </Routes>

      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
