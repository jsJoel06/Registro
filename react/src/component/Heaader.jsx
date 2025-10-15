import React from 'react'
import './css/header.css'
import { Link } from 'react-router-dom';

function Heaader() {
    
  return (
    <>
      <header>
        <h3>Registro de Persona</h3>
        <ul className='menu'>
          <li><Link className='enlace' to={'/'}>Inicio</Link></li>
            <li><Link className='enlace' to={'/agregar'}>Agregar Persona</Link></li>
            <li><Link className='enlace' to={'/contacto'}>Contactos</Link> </li>
        </ul>
      </header>
    </>
  )
}

export default Heaader
