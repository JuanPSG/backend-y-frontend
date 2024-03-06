import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function RegistroAct() {
  // Estados para manejar los datos del escáner y la lista de registros
  const [scannerData, setScannerData] = useState("");
  const [records, setRecords] = useState([]);

  // Manejadores para los eventos de los botones
  const handleAddMore = () => {
    setRecords([...records, scannerData]);
    setScannerData("");
  };

  const handleDeleteFields = () => {
    setScannerData("");
    setRecords([]);
  };

  const handleSaveNow = () => {
    console.log("Guardando registros:", records);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Registro por Actividad</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Escanear aquí"
          value={scannerData}
          onChange={(e) => setScannerData(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2 d-md-block mb-3">
        <button className="btn btn-primary" onClick={handleAddMore}>
          Agregar más
        </button>
        <button className="btn btn-warning" onClick={handleDeleteFields}>
          Borrar Campos
        </button>
        <button className="btn btn-success" onClick={handleSaveNow}>
          Guardar ahora
        </button>
      </div>
      <ul className="list-group">
        {records.map((record, index) => (
          <li key={index} className="list-group-item">
            {record}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegistroAct;