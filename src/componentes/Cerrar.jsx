import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const [redireccionarA, setRedireccionarA] = useState('/login');

  // Al renderizar, realiza la acción de cerrar sesión
  useEffect(() => {
    onLogout();

    // Limpiar el efecto al desmontar el componente
    return () => {
      // Código de limpieza (si es necesario)
    };
  }, [onLogout]);

  // Cuando el estado cambie, realiza la redirección
  useEffect(() => {
    if (redireccionarA) {
      navigate(redireccionarA);

      // Limpiar el efecto al desmontar el componente
      return () => {
        // Código de limpieza (si es necesario)
      };
    }
  }, [redireccionarA, navigate]);

  // Este componente no renderiza nada directamente
  return null;
}

export default Logout;
