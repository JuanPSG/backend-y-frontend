import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className='navbar'>
        <Link to='#' className='menu-bars' onClick={showSidebar}>
          <i className='bi bi-list'></i>
        </Link>
        <div className="logo-container">
          <span className="school-name">Secundaria General #24</span>
          <img
  src={`${process.env.PUBLIC_URL}/seclogo.png`}
  alt="Logo"
  className="logo"
  style={{ width: '50px', height: 'auto' }}
/>

        </div>

      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <i className='bi bi-x'></i>
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;