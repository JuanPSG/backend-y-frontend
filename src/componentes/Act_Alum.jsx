import React, { useState } from 'react';

function ActividadesAlumnos() {
  const [formData, setFormData] = useState({
    grupo: '',
    turno: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    calificacion: '',
  });

  const [alumnos, setAlumnos] = useState([
    // Tu array de alumnos aquí...
  ]);

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectAll = () => {
    const updatedAlumnos = alumnos.map((alumno) => ({
      ...alumno,
      seleccionado: true,
    }));
    setAlumnos(updatedAlumnos);
  };

  const handleDeselectAll = () => {
    const updatedAlumnos = alumnos.map((alumno) => ({
      ...alumno,
      seleccionado: false,
    }));
    setAlumnos(updatedAlumnos);
  };

  const handleSaveNow = () => {
    console.log('Guardar datos:', alumnos);
  };

  const handleSelectCalificacion = (calificacion) => {
    const updatedAlumnos = alumnos.map((alumno) => ({
      ...alumno,
      calificacion: calificacion,
    }));
    setAlumnos(updatedAlumnos);
  };

  const handleAssignCalificacionForAll = () => {
    const updatedAlumnos = alumnos.map((alumno) => ({
      ...alumno,
      calificacion: formData.calificacion,
    }));
    setAlumnos(updatedAlumnos);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Actividades por Alumnos</h2>
        </div>
      </div>

      <div className="row mt-3 justify-content-center">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Seleccionar</th>
                  <th scope="col">Actividad</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Calificación</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={alumno.seleccionado}
                        onChange={() => {
                          const updatedAlumnos = [...alumnos];
                          updatedAlumnos[index].seleccionado = !alumno.seleccionado;
                          setAlumnos(updatedAlumnos);
                        }}
                      />
                    </td>
                    <td>{/* Campo de Actividad */}</td>
                    <td>{/* Campo de Nombre */}</td>
                    <td>
                      <input
                        type="text"
                        value={alumno.calificacion}
                        onChange={(e) => {
                          const updatedAlumnos = [...alumnos];
                          updatedAlumnos[index].calificacion = e.target.value;
                          setAlumnos(updatedAlumnos);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-3 justify-content-center">
        <div className="col-md-8">
          <div className="btn-toolbar">
            <div className="btn-group mr-2" role="group" aria-label="Botones de Selección">
              <button className="btn btn-primary" onClick={handleSelectAll}>
                Seleccionar Todos
              </button>
              <button className="btn btn-primary" onClick={handleDeselectAll}>
                Deseleccionar Todos
              </button>
            </div>
            <button className="btn btn-success mr-2" onClick={handleSaveNow}>
              Guardar Ahora
            </button>
            <div className="input-group mr-2">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="calificacionSelect">
                  Seleccionar Calificación:
                </label>
              </div>
              <select
                className="custom-select"
                id="calificacionSelect"
                value={formData.calificacion}
                onChange={(e) => handleSelectCalificacion(e.target.value)}
              >
                <option value="">-- Seleccionar --</option>
                {[...Array(11).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleAssignCalificacionForAll}>
              Asignar Calificación para Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActividadesAlumnos;
