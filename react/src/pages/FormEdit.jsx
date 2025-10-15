import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {  useNavigate, useParams } from 'react-router';
import '../component/css/form.css'

function FormEdit() {

    const navigate = useNavigate();
     const {nombre} = useParams();
     const [editar, setEditar] = useState({
         nombre: '',
         edad: '',
         correo: '',
         fecha_registro: ''
     });

     useEffect(() =>{
       axios.get(`http://localhost:4000/persona/${nombre}`)
        .then(res => setEditar(res.data))
        .catch((error) => console.error(error));
     }, [nombre]);

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setEditar((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.put(`https://backregistro.onrender.com/persona/${nombre}`, editar)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }


  return (
    <>
       <h2>Editar Registro</h2>
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre</label><br />
            <input 
            type="text"
            name='nombre'
            value={editar.nombre}
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
            value={editar.edad}
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
            value={editar.correo}
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
            value={editar.fecha_registro}
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

export default FormEdit
