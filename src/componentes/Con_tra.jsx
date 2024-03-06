import React, { useState } from 'react';

function Con_tra() {
  const [formData, setFormData] = useState({
    codigo: '',
    grado: '',
    grupo: '',
    turno: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
  });

  const [alumnos, setAlumnos] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const filteredAlumnos = alumnos.filter((alumno) => {
      return (
        (formData.codigo && alumno.codigo.toLowerCase().includes(formData.codigo.toLowerCase())) ||
        (formData.grado && alumno.grado.toLowerCase() === formData.grado.toLowerCase()) ||
        (formData.grupo && alumno.grupo.toLowerCase() === formData.grupo.toLowerCase()) ||
        (formData.turno && alumno.turno.toLowerCase() === formData.turno.toLowerCase()) ||
        (formData.apellidoPaterno && alumno.apellidoPaterno.toLowerCase().includes(formData.apellidoPaterno.toLowerCase())) ||
        (formData.apellidoMaterno && alumno.apellidoMaterno.toLowerCase().includes(formData.apellidoMaterno.toLowerCase()))
      );
    });

    setAlumnos(filteredAlumnos);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Concentrado de trabajos</h2>

          {/* Formulario para buscar alumnos */}
          <form className="mb-3">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Código:</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Grado:</label>
                <select
                  className="form-select"
                  name="grado"
                  value={formData.grado}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Grupo:</label>
                <select
                  className="form-select"
                  name="grupo"
                  value={formData.grupo}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {Array.from({ length: 6 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map(
                    (grupo) => (
                      <option key={grupo} value={grupo}>
                        {grupo}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Turno:</label>
                <select
                  className="form-select"
                  name="turno"
                  value={formData.turno}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option value="matutino">Matutino</option>
                  <option value="vespertino">Vespertino</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Apellido Paterno:</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Apellido Materno:</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={handleSearch}>
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Tabla */}
      <div className="row mt-3 justify-content-center">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Grado</th>
                  <th scope="col">Grupo</th>
                  <th scope="col">Turno</th>
                  <th scope="col">Apellido Paterno</th>
                  <th scope="col">Apellido Materno</th>
                  <th scope="col">Entregado</th>
                  <th scope="col">Puntos Totales</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, index) => (
                  <tr key={index}>
                    <td>{alumno.codigo}</td>
                    <td>{alumno.grado}</td>
                    <td>{alumno.grupo}</td>
                    <td>{alumno.turno}</td>
                    <td>{alumno.apellidoPaterno}</td>
                    <td>{alumno.apellidoMaterno}</td>
                    <td>{alumno.entregado ? 'Sí' : 'No'}</td>
                    <td>{alumno.puntosTotales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Con_tra;
