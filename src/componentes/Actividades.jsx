import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Actividad() {
  const [formData, setFormData] = useState({
    fecha: new Date(),
    fechaEntrega: new Date(),
    grado: '',
    grupo: '',
    nombre: '',
    turno: '',
    informacion: '',
    trimestre: '', // Nuevo campo para trimestre
  });
  

  const [actividades, setActividades] = useState([]);
  const [filteredActividades, setFilteredActividades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [actividadID, setActividadID] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleBuscar = () => {
    const filters = Object.values(formData).filter(Boolean);
    if (filters.length === 0) {
      setFilteredActividades([]);
    } else {
      const filtered = actividades.filter((actividad) =>
        filters.every((filter) => actividad[filter] === formData[filter])
      );
      setFilteredActividades(filtered);
    }
  };

  const handleGuardarTarea = () => {
    if (modoEdicion && actividadID !== null) {
      // Modo de edición
      const actividadesActualizadas = actividades.map((actividad) => {
        if (actividad.id === actividadID) {
          const updatedActividad = {
            ...formData,
            id: actividadID,
            fecha: formData.fecha.toLocaleDateString(),
            fechaEntrega: formData.fechaEntrega.toLocaleDateString(),
          };
          console.log("Tarea actualizada:", updatedActividad);
          return updatedActividad;
        } else {
          return actividad;
        }
      });
  
      setActividades(actividadesActualizadas);
      setModoEdicion(false);
      setActividadID(null);
    } else {
      // Modo de creación
      const nuevaTarea = {
        ...formData,
        id: actividades.length + 1,
        fecha: formData.fecha.toLocaleDateString(),
        fechaEntrega: formData.fechaEntrega.toLocaleDateString(),
      };
      console.log("Nueva tarea:", nuevaTarea);
      setActividades([...actividades, nuevaTarea]);
    }
  
    handleCloseModal();
  };
  
  
  
  const handleModificar = (id) => {
    const tareaModificar = actividades.find((actividad) => actividad.id === id);
  
    if (tareaModificar) {
      setFormData({
        fecha: new Date(tareaModificar.fecha),
        fechaEntrega: new Date(tareaModificar.fechaEntrega),
        grado: tareaModificar.grado,
        grupo: tareaModificar.grupo,
        nombre: tareaModificar.nombre,
        turno: tareaModificar.turno,
        informacion: tareaModificar.informacion,
        trimestre: tareaModificar.trimestre, // Incluye el campo trimestre
      });
  
      setModoEdicion(true);
      setActividadID(id);
      setShowModal(true);
    }
  };

  const handleEliminar = (id) => {
    const nuevasActividades = actividades.filter((actividad) => actividad.id !== id);
    setActividades(nuevasActividades);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      fecha: new Date(),
      fechaEntrega: new Date(),
      grado: '',
      grupo: '',
      nombre: '',
      turno: '',
      informacion: '',
    });
    setModoEdicion(false);
    setActividadID(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Buscar Actividades</h2>

          <form>
            <div className="mb-3">
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
            <div className="mb-3">
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

            <div className="mb-3">
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
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleBuscar}>
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="row mt-3 justify-content-center">
        <div className="col-md-8">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Agregar Tarea
          </button>
        </div>
      </div>

      {filteredActividades.length > 0 && (
        <div className="row mt-3 justify-content-center">
          <div className="col-md-8">
            <div className="table-responsive">
              <h2 className="text-center mb-4">Resultados de la Búsqueda</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Grado</th>
                    <th scope="col">Grupo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Turno</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Fecha de Entrega</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActividades.map((actividad) => (
                    <tr key={actividad.id}>
                      <td>{actividad.id}</td>
                      <td>{actividad.grado}</td>
                      <td>{actividad.grupo}</td>
                      <td>{actividad.nombre}</td>
                      <td>{actividad.turno}</td>
                      <td>{actividad.fecha}</td>
                      <td>{actividad.fechaEntrega}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => handleModificar(actividad.id)}
                        >
                          Modificar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleEliminar(actividad.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Fecha:</label>
              <DatePicker
                className="form-control"
                selected={formData.fecha}
                onChange={(date) => handleDateChange(date, 'fecha')}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de Entrega:</label>
              <DatePicker
                className="form-control"
                selected={formData.fechaEntrega}
                onChange={(date) => handleDateChange(date, 'fechaEntrega')}
              />
            </div>
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>
            <div className="mb-3">
            <label className="form-label">Trimestre:</label>
             <select 
              className="form-select"
              name="trimestre"
              value={formData.trimestre}
              onChange={handleInputChange}
             >
             <option value="" disabled>
             Seleccionar
             </option>
              <option value="1">Trimestre 1</option>
              <option value="2">Trimestre 2</option>
              <option value="3">Trimestre 3</option>
              </select>
              </div>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Información:</label>
              <textarea
                className="form-control"
                name="informacion"
                value={formData.informacion}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarTarea}>
            Guardar Tarea
          </Button>
        </Modal.Footer>
      </Modal>

      {actividades.length > 0 && (
        <div className="row mt-3 justify-content-center">
          <div className="col-md-8">
            <div className="table-responsive">
              <h2 className="text-center mb-4">Todas las Tareas Guardadas</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Grado</th>
                    <th scope="col">Grupo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Turno</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Fecha de Entrega</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {actividades.map((actividad) => (
                    <tr key={actividad.id}>
                      <td>{actividad.id}</td>
                      <td>{actividad.grado}</td>
                      <td>{actividad.grupo}</td>
                      <td>{actividad.nombre}</td>
                      <td>{actividad.turno}</td>
                      <td>{actividad.fecha}</td>
                      <td>{actividad.fechaEntrega}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => handleModificar(actividad.id)}
                        >
                          Modificar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleEliminar(actividad.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Actividad;