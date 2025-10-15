import axios from 'axios';
import React from 'react'
import { useState } from 'react'

function Delete({nombre, onDelete}) {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if(window.confirm('Seguro que quieres eliminar este registro?')){
            try{
                setLoading(true);
                await axios.delete(`http://localhost:4000/persona/${nombre}`);
                setLoading(false);

                if(onDelete) onDelete(nombre);
            }catch(err){
                console.error(err);
                setLoading(false);
            }
        }
    };

  return (
    <button className="eliminar" onClick={handleDelete} disabled={loading}>
       {loading ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}

export default Delete
