import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Autenticación
    const mockUser = { email: 'usuario@example.com', password: 'contraseña123' };

    if (formData.email === mockUser.email && formData.password === mockUser.password) {

      onLogin();
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#3e4e5b' }}> 
            Iniciar sesión
          </button>


        </form>
      </div>
    </div>
  );
};

export default Login;
