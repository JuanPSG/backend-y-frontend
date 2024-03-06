import React from 'react';


export const SidebarData = [
  {
    title: 'Horario',
    path: '/',
    icon: <i class="bi bi-calendar2-week"></i>,
    cName: 'nav-text'
  },

  {
    title: 'Asistencia',
    path: '/Asistencia',
    icon: <i class="bi bi-clipboard-check"></i>,
    cName: 'nav-text'
  },

  {
    title: 'Alumnos',
    path: '/Alumnos',
    icon: <i class="bi bi-person"></i>, 
    cName: 'nav-text'
  },
  {
    title: 'Actividades',
    path: '/actividades',
    icon: <i class="bi bi-pen"></i>,
    cName: 'nav-text'
  },
  {
    title: 'Actividades por alumno',
    path: '/Act_alum',
    icon: <i class="bi bi-person-badge"></i>,
    cName: 'nav-text'
  },
  {
    title: 'Concentrado trabajos',
    path: '/Con_tra',
    icon: <i class="bi bi-passport"></i>,
    cName: 'nav-text'
  },
  {
    title: 'Concentrado',
    path: '/Concentrado',
    icon: <i class="bi bi-layout-text-sidebar-reverse"></i>,
    cName: 'nav-text'
  },

  {
    title: 'Nuevo Usuario',
    path: '/Formulario',
    icon: <i class="bi bi-person-plus"></i>,
    cName: 'nav-text'
  },

  {
    title: 'Cerrar sesion',
    path: '/Cerrar',
    icon: <i class="bi bi-person-x"></i>,
    cName: 'nav-text'
  }
];