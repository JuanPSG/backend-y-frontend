import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Alumno() {
  const [formData, setFormData] = useState({
    id: '',
    turno: '',
    grado: '',
    grupo: '',
    nombre: '',
    apellidos: '',
    numSecundaria: '',
    codigo: '',
    apellidoMaterno: '',
    CORREO_INSTITUCIONAL: '',
    TUTOR: '',
    CORREO_TUTOR: '',
    activo: '',
  });

  const [alumnos, setAlumnos] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filteredAlumnos, setFilteredAlumnos] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (index) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos.splice(index, 1);
    setAlumnos(updatedAlumnos);
  };

  const handleSearch = () => {
    const filtered = alumnos.filter((alumno) => {
      // Asegúrate de que la comparación se haga de forma que coincida con tus datos.
      const matchTurno = alumno.turno === formData.turno || formData.turno === '';
      const matchGrado = alumno.grado === formData.grado || formData.grado === '';
      const matchGrupo = alumno.grupo === formData.grupo || formData.grupo === '';
      
      return matchTurno && matchGrado && matchGrupo;
    });
    
    setFilteredAlumnos(filtered);
  };
  
  const handleShowModal = (index) => {
    setShowModal(true);
    if (index !== undefined) {
      setFormData({ ...alumnos[index] });
      setEditingIndex(index);
    }
  };

  const handleCloseModal = () => {
    setFormData({
      id: '',
      turno: '',
      grado: '',
      grupo: '',
      nombre: '',
      apellidos: '',
      numSecundaria: '',
      codigo: '',
      apellidoMaterno: '',
      CORREO_INSTITUCIONAL: '',
      TUTOR: '',
      CORREO_TUTOR: '',
      activo: '',
    });
    setErrors({});
    setEditingIndex(null);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      if (editingIndex === null) {
        setAlumnos([...alumnos, formData]);
      } else {
        const updatedAlumnos = [...alumnos];
        updatedAlumnos[editingIndex] = formData;
        setAlumnos(updatedAlumnos);
      }
      setFormData({
    
        turno: '',
        grado: '',
        grupo: '',         
      });
      setErrors({});
      setEditingIndex(null);
      handleCloseModal();
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.id.trim()) {
      errors.id = 'Campo requerido';
    }
    if (!formData.nombre.trim()) {
      errors.nombre = 'Campo requerido';
    }
    if (!formData.apellidos.trim()) {
      errors.apellidos = 'Campo requerido';
    }
    return errors;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Lista de Alumnos</h2>

              {/* Formulario de búsqueda */}
              <form className="mb-3">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Turno:</label>
                <select
                  className="form-select"
                  name="turno"
                  value={formData.turno}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Seleccionar turno
                  </option>
                  <option value="matutino">Matutino</option>
                  <option value="vespertino">Vespertino</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Grado:</label>
                <select
                  className="form-select"
                  name="grado"
                  value={formData.grado}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Seleccionar grado
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Grupo:</label>
                <select
                  className="form-select"
                  name="grupo"
                  value={formData.grupo}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Seleccionar grupo
                  </option>
                  {Array.from({ length: 6 }, (_, i) =>
                    String.fromCharCode('A'.charCodeAt(0) + i)
                  ).map((grupo) => (
                    <option key={grupo} value={grupo}>
                      {grupo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="button" className="btn btn-primary mt-2" onClick={handleSearch}>
              <i className="bi bi-search"></i> Buscar
            </button>
          </form>

          {/* Botón para agregar alumno */}
          <Button variant="primary" onClick={() => handleShowModal()}>
            Agregar Alumno
          </Button>

          {/* Modal para agregar o editar alumno */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{editingIndex !== null ? 'Editar Alumno' : 'Agregar Alumno'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Formulario para agregar o editar alumno */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">ID:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                  />
                  {errors.id && <div className="invalid-feedback">{errors.id}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label"># Secundaria:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.numSecundaria ? 'is-invalid' : ''}`}
                    name="numSecundaria"
                    value={formData.numSecundaria}
                    onChange={handleInputChange}
                  />
                  {errors.numSecundaria && (
                    <div className="invalid-feedback">{errors.numSecundaria}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Activo:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.activo ? 'is-invalid' : ''}`}
                    name="activo"
                    value={formData.activo}
                    onChange={handleInputChange}
                  />
                  {errors.activo && (
                    <div className="invalid-feedback">{errors.activo}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Codigo:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.codigo ? 'is-invalid' : ''}`}
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleInputChange}
                  />
                  <div className="mb-3">
                  <label className="form-label">Turno:</label>
                  <select
                    className="form-select"
                    name="turno"
                    value={formData.turno}
                    onChange={handleInputChange}
                  >
                    <option value="matutino">Matutino</option>
                    <option value="vespertino">Vespertino</option>
                  </select>
                </div>
                  {errors.codigo && <div className="invalid-feedback">{errors.codigo}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Grado:</label>
                  <select
                    className="form-select"
                    name="grado"
                    value={formData.grado}
                    onChange={handleInputChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Grupo:</label>
                  <select
                    className="form-select"
                    name="grupo"
                    value={formData.grupo}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 6 }, (_, i) =>
                      String.fromCharCode('A'.charCodeAt(0) + i)
                    ).map((grupo) => (
                      <option key={grupo} value={grupo}>
                        {grupo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellido Paterno:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                  />
                  {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellido Materno:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.apellidoMaterno ? 'is-invalid' : ''}`}
                    name="apellidoMaterno"
                    value={formData.apellidoMaterno}
                    onChange={handleInputChange}
                  />
                  {errors.apellidoMaterno && (
                    <div className="invalid-feedback">{errors.apellidoMaterno}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo Institucional:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.CORREO_INSTITUCIONAL ? 'is-invalid' : ''}`}
                    name="CORREO_INSTITUCIONAL"
                    value={formData.CORREO_INSTITUCIONAL}
                    onChange={handleInputChange}
                  />
                  {errors.CORREO_INSTITUCIONAL && <div className="invalid-feedback">{errors.CORREO_INSTITUCIONAL}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Tutor:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.TUTOR ? 'is-invalid' : ''}`}
                    name="TUTOR"
                    value={formData.TUTOR}
                    onChange={handleInputChange}
                  />
                  {errors.TUTOR && <div className="invalid-feedback">{errors.TUTOR}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo tutor:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.CORREO_TUTOR ? 'is-invalid' : ''}`}
                    name="CORREO_TUTOR"
                    value={formData.CORREO_TUTOR}
                    onChange={handleInputChange}
                  />
                  {errors.CORREO_TUTOR && <div className="invalid-feedback">{errors.CORREO_TUTOR}</div>}
                </div>
                
                <button type="submit" className="btn btn-primary">
                  {editingIndex !== null ? 'Actualizar Alumno' : 'Agregar Alumno'}
                </button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      {/* Tabla */}
      <div className="row mt-3 justify-content-center">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre(s)</th>
                  <th scope="col">Apellido Paterno</th>
                  <th scope="col">Apellido Materno</th>
                  <th scope="col">Turno</th>
                  <th scope="col">Grado</th>
                  <th scope="col">Grupo</th>
                  <th scope="col">Num Secundaria</th>
                  <th scope="col">Código</th>
                  <th scope="col">Correo InstitucionalL</th>
                  <th scope="col">Tutor</th>
                  <th scope="col">Correo Tutor</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Borrar</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, index) => (
                  <tr key={index}>
                    <td>{alumno.id}</td>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.apellidos}</td>
                    <td>{alumno.apellidoMaterno}</td>
                    <td>{alumno.turno}</td>
                    <td>{alumno.grado}</td>
                    <td>{alumno.grupo}</td>
                    <td>{alumno.numSecundaria}</td>
                    <td>
                      {/* Utiliza Link para crear el enlace */}
                      <Link to={`/actividades/${alumno.codigo}`}>{alumno.codigo}</Link>
                    </td>
                    <td>{alumno.CORREO_INSTITUCIONAL}</td>
                    <td>{alumno.TUTOR}</td>
                    <td>{alumno.CORREO_TUTOR}</td>
                    <td>
                    <button
                        type="button"
                        className="btn btn-warning me-2"
                        onClick={() => handleShowModal(index)}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                     
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        Borrar
                      </button>
                    </td>
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

export default Alumno;