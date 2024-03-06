import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const Formulario  = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // enviar los datos del formulario a backend 
      console.log('Datos enviados:', formData);
      // Reinicia el formulario después de enviar
      setFormData({
        id: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        telefono: '',
      });
      setErrors({});
      // Muestra el SweetAlert
      showSuccessAlert();
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
    if (!formData.apellidoPaterno.trim()) {
      errors.apellidoPaterno = 'Campo requerido';
    }
    if (!formData.correo.trim()) {
      errors.correo = 'Campo requerido';
    } else if (!isValidEmail(formData.correo)) {
      errors.correo = 'Correo electrónico inválido';
    }
    if (!formData.telefono.trim()) {
      errors.telefono = 'Campo requerido';
    } else if (!isValidPhone(formData.telefono)) {
      errors.telefono = 'Teléfono inválido';
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    // validar un número de teléfono
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const showSuccessAlert = () => {
    swal('Éxito', 'Maestro registrado exitosamente', 'success');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Registrar Nuevo Maestro</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="id">
          <Form.Label>ID</Form.Label>
          <Form.Control
          type="text"
          placeholder="Ingrese el ID"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          isInvalid={!!errors.id}
          />
           <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
           </Form.Group>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                isInvalid={!!errors.nombre}
              />
              <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="apellidoPaterno">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el apellido paterno"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleInputChange}
                isInvalid={!!errors.apellidoPaterno}
              />
              <Form.Control.Feedback type="invalid">{errors.apellidoPaterno}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="apellidoMaterno">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el apellido materno"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="correo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo electrónico"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                isInvalid={!!errors.correo}
              />
              <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                isInvalid={!!errors.telefono}
              />
              <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Formulario ;