import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./css/table.css";
import { Link } from "react-router-dom";
import Delete from "../pages/Delete";

function Table() {
  const [persona, setPersona] = useState([]);

  async function Persona() {
    try {
      const response = await axios.get("https://backregistro.onrender.com");
      setPersona(response.data);
    } catch (err) {
      console.error("Error al cargar Personas: ", err.message);
    }
  }

  useEffect(() => {
    Persona();
  }, []);

  return (
    <>
      <h1>Lista de Registro</h1>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Correo</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {persona.map((per) => (
            <tr key={per.id}>
              <td>{per.nombre}</td>
              <td>{per.edad}</td>
              <td>{per.correo}</td>
              <td>{per.fecha_registro}</td>
              <td>
                <Link className="editar" to={`/editar/${per.nombre}`}>
                  Editar
                </Link>
                <Delete
                  nombre={per.nombre}
                  onDelete={(nombreEliminado) =>
                    setPersona(
                      persona.filter((a) => a.nombre !== nombreEliminado)
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
