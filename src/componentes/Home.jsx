import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

class HorarioClases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horario: {
        Hora: [],
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
      },
      showAgregarHora: false,
      showAgregarClase: false,
      selectedTime: '',
      selectedClassName: '',
      selectedGrade: '',
      selectedGroup: '',
      selectedShift: '',
      selectedSchool: '',
      selectedClassTime: '',
      selectedDays: {
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
      },
    };
  }

  handleShowAgregarHora = () => this.setState({ showAgregarHora: true });
  handleShowAgregarClase = () => this.setState({ showAgregarClase: true });
  handleClose = () =>
    this.setState({
      showAgregarHora: false,
      showAgregarClase: false,
      selectedTime: '',
      selectedClassName: '',
      selectedGrade: '',
      selectedGroup: '',
      selectedShift: '',
      selectedSchool: '',
      selectedClassTime: '',
      selectedDays: {
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
      },
    });

  handleAddHora = () => {
    const { selectedTime, horario } = this.state;
    const formattedHora = this.formatHour(selectedTime);
    const nuevaHora = `${formattedHora}`;

    if (!horario.Hora.includes(nuevaHora)) {
      horario.Hora.push(nuevaHora);
      horario.Hora.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }

    this.setState({ showAgregarHora: false, selectedTime: '' });
  };

  handleAddClase = () => {
    const { selectedClassTime, selectedClassName, selectedGrade, selectedGroup, selectedShift, selectedSchool, horario, selectedDays } =
      this.state;
    const formattedHora = this.formatHour(selectedClassTime);
    const nuevaClase = `${formattedHora}: ${selectedClassName}, Grado: ${selectedGrade}, Grupo: ${selectedGroup}, Turno: ${selectedShift}, Escuela: ${selectedSchool}`;

    Object.keys(selectedDays).forEach((dia) => {
      if (selectedDays[dia] && dia !== 'Hora' && !horario[dia].includes(nuevaClase)) {
        horario[dia].push(nuevaClase);
        horario[dia].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      }
    });

    this.setState({
      showAgregarClase: false,
      selectedTime: '',
      selectedClassName: '',
      selectedGrade: '',
      selectedGroup: '',
      selectedShift: '',
      selectedSchool: '',
      selectedClassTime: '',
      selectedDays: {
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
      },
    });
  };

  handleTimeChange = (e) => this.setState({ selectedTime: e.target.value });
  handleClassNameChange = (e) => this.setState({ selectedClassName: e.target.value });
  handleGradeChange = (e) => this.setState({ selectedGrade: e.target.value });
  handleGroupChange = (e) => this.setState({ selectedGroup: e.target.value });
  handleShiftChange = (e) => this.setState({ selectedShift: e.target.value });
  handleSchoolChange = (e) => this.setState({ selectedSchool: e.target.value });
  handleClassTimeChange = (e) => this.setState({ selectedClassTime: e.target.value });

  handleDayCheckboxChange = (day) => {
    this.setState((prevState) => ({
      selectedDays: {
        ...prevState.selectedDays,
        [day]: !prevState.selectedDays[day],
      },
    }));
  };

  formatHour = (time) => {
    const date = new Date(`1970-01-01T${time}`);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  render() {
    const { horario, showAgregarHora, showAgregarClase, selectedTime, selectedClassName, selectedGrade, selectedGroup, selectedShift, selectedSchool, selectedDays } =
      this.state;
    const dias = Object.keys(horario);

    return (
      <div className="container mt-4">
        <h1 className="mb-4">Horario de Clases</h1>

        <button className="btn btn-primary mb-3" onClick={this.handleShowAgregarHora}>
          Agregar Hora
        </button>

        <button 
  className="btn btn-primary mb-3 ml-3" 
  onClick={this.handleShowAgregarClase}
  disabled={this.state.horario.Hora.length === 0} // Deshabilitar si no hay horas
>
  Agregar Clase
</button>


        <Modal show={showAgregarHora} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Hora</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTimeHora">
                <Form.Label>Hora:</Form.Label>
                <Form.Control type="time" value={selectedTime} onChange={this.handleTimeChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.handleAddHora}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showAgregarClase} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Clase</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTimeClase">
                <Form.Label>Hora:</Form.Label>
                <Form.Control as="select" value={selectedTime} onChange={this.handleTimeChange}>
                  <option value="" disabled>
                    Seleccionar hora
                  </option>
                  {horario.Hora.map((hora) => (
                    <option key={hora}>{hora}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formClassName">
                <Form.Label>Nombre de la Clase:</Form.Label>
                <Form.Control type="text" value={selectedClassName} onChange={this.handleClassNameChange} />
              </Form.Group>
              <Form.Group controlId="formGrade">
                <Form.Label>Grado:</Form.Label>
                <Form.Control type="text" value={selectedGrade} onChange={this.handleGradeChange} />
              </Form.Group>
              <Form.Group controlId="formGroup">
                <Form.Label>Grupo:</Form.Label>
                <Form.Control type="text" value={selectedGroup} onChange={this.handleGroupChange} />
              </Form.Group>
              <Form.Group controlId="formShift">
                <Form.Label>Turno:</Form.Label>
                <Form.Control type="text" value={selectedShift} onChange={this.handleShiftChange} />
              </Form.Group>
              <Form.Group controlId="formSchool">
                <Form.Label>Nombre de la Escuela:</Form.Label>
                <Form.Control type="text" value={selectedSchool} onChange={this.handleSchoolChange} />
              </Form.Group>
              <Form.Group>
  <Form.Label>Días:</Form.Label>
  {dias.map((dia) => (
    dia !== 'Hora' && (
      <Form.Check
        key={dia}
        type="checkbox"
        label={dia}
        checked={selectedDays[dia]}
        onChange={() => this.handleDayCheckboxChange(dia)}
      />
    )
  ))}
</Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.handleAddClase}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        <table className="table">
          <thead>
            <tr>
              {dias.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horario.Hora.map((hora, index) => (
              <tr key={index}>
                {dias.map((dia) => (
                  <td key={dia}>{dia === 'Hora' ? hora : horario[dia][index]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HorarioClases;