import React from 'react';
import './Footer.css'; 

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      &copy; Escuela Secundaria General #24 - Tijuana - {year}
    </footer>
  );
}

export default Footer;

