import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Modal, Button } from "react-bootstrap";
import "./Asistencia.css"; // Importar tu hoja de estilo CSS

const Asistencia = () => {
  const [registrosDeAsistencia, setRegistrosDeAsistencia] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [grupoInfo, setGrupoInfo] = useState({
    nombre: "",
    grado: "",
    Escuela: "",
    alumnos: [],
  });
  const [fechaAsistencia, setFechaAsistencia] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [grupoExpandido, setGrupoExpandido] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      const alumnosConAsistencia = data.map((alumno) => ({
        ...alumno,
        asistencia: false,
      }));
      setGrupoInfo((prev) => ({ ...prev, alumnos: alumnosConAsistencia }));
    };
    reader.readAsBinaryString(file);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrupoInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFechaAsistenciaChange = (e) => {
    setFechaAsistencia(e.target.value);
  };

  const handleSaveGrupo = () => {
    setRegistrosDeAsistencia((prev) => ({
      ...prev,
      [fechaAsistencia]: [...(prev[fechaAsistencia] || []), { ...grupoInfo }],
    }));
    setGrupoInfo({ nombre: "", grado: "", alumnos: [] });
    handleCloseModal();
  };

  const handleAsistenciaChange = (indexGrupo, indexAlumno, checked) => {
    setRegistrosDeAsistencia((prev) => {
      const gruposPorFecha = prev[fechaAsistencia] || [];
      gruposPorFecha[indexGrupo].alumnos[indexAlumno].asistencia = checked;
      return { ...prev, [fechaAsistencia]: gruposPorFecha };
    });
  };

  const toggleGrupoExpandido = (index) => {
    setGrupoExpandido(grupoExpandido === index ? null : index);
  };

  const SelectorFechaAsistencia = () => (
    <div className="selector-fecha-asistencia mb-3">
      <label>Seleccionar fecha para pasar lista:</label>
      <input
        type="date"
        className="form-control"
        value={fechaAsistencia}
        onChange={handleFechaAsistenciaChange}
      />
    </div>
  );

  return (
    <>
      <SelectorFechaAsistencia />

      <Button variant="primary" onClick={handleOpenModal}>
        Agregar Lista de Asistencia
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Grupo:</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={grupoInfo.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Grado:</label>
              <input
                type="text"
                className="form-control"
                name="grado"
                value={grupoInfo.grado}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Escuela:</label>
              <input
                type="text"
                className="form-control"
                name="Escuela"
                value={grupoInfo.Escuela}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Seleccionar archivo de Excel:</label>
              <input
                type="file"
                className="form-control"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveGrupo}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {registrosDeAsistencia[fechaAsistencia]?.map((grupo, indexGrupo) => (
        <div key={indexGrupo} className="accordion-item">
          <div
            onClick={() => toggleGrupoExpandido(indexGrupo)}
            aria-controls={`collapse-grupo-${indexGrupo}`}
            aria-expanded={grupoExpandido === indexGrupo}
            className="accordion-button"
            style={{ cursor: "pointer" }}
          >
            <h5 className="mb-0">{`Grupo: ${grupo.nombre}, Grado: ${grupo.grado},Escuela: ${grupo.Escuela}`}</h5>
          </div>
          {grupoExpandido === indexGrupo && (
            <div
              id={`collapse-grupo-${indexGrupo}`}
              className="accordion-collapse"
            >
              <div className="accordion-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      {Object.keys(grupo.alumnos[0]).map(
                        (key, index) =>
                          key !== "asistencia" && <th key={index}>{key}</th>
                      )}
                      <th>Asistencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupo.alumnos.map((alumno, indexAlumno) => (
                      <tr key={indexAlumno}>
                        <td>{indexAlumno + 1}</td>
                        {Object.entries(alumno).map(
                          ([key, value], cellIndex) =>
                            key !== "asistencia" && (
                              <td key={cellIndex}>{value}</td>
                            )
                        )}
                        <td>
                          <input
                            type="checkbox"
                            checked={alumno.asistencia}
                            onChange={(e) =>
                              handleAsistenciaChange(
                                indexGrupo,
                                indexAlumno,
                                e.target.checked
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Asistencia;