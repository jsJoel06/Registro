import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form() {
  
    const navigate = useNavigate();
     const [persona, setPersona] = useState({
        nombre: '',
        edad: '',
        correo: '',
        fecha_registro: ''
     });

     const handleSubmit = async (e) => {
           e.preventDefault();
           try{
                  await axios.post('http://localhost:4000/persona', persona);
            setPersona({
                nombre: '',
                edad: '',
                correo: '',
                fecha_registro: ''
            });
           navigate('/');
           }catch(err){
            console.error('Error al agregar: ', err);
           }
     };

     const handleChange = async (e) => {
        const {name, value} = e.target;
        setPersona((prev) => ({
            ...prev,
            [name]: value,
        }))
     };

  return (
    <>
      <h2>Agregar Registro</h2>
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre</label><br />
            <input 
            type="text"
            name='nombre'
            value={persona.nombre}
            placeholder='Escribe tu nombre'
            onChange={handleChange}
            required
            />
          </div>
           <div>
            <label htmlFor="edad">Edad</label><br />
            <input 
            type="text"
            name='edad'
            value={persona.edad}
            placeholder='Escribe tu edad'
            onChange={handleChange}
            required
            />
          </div>
           <div>
            <label htmlFor="correo">Correo</label><br />
            <input 
            type="email"
            name='correo'
            value={persona.correo}
            placeholder='Escribe correo'
            onChange={handleChange}
            required
            />
          </div>
           <div>
            <label htmlFor="fecha_registro">Fecha de Registro</label><br />
            <input 
            type="date"
            name='fecha_registro'
            value={persona.fecha_registro}
            placeholder='Escribe tu fecha registro'
            onChange={handleChange}
            required
            />
          </div>

          <button type='submit'>Guardar</button>
      </form>
    </>
  )
}

export default Form
