import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita'

function App() {

  //Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales) citasIniciales = []

  //State Principal
  const [citas, setCitas] = useState(citasIniciales)

  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
    
  }, [citas, citasIniciales])

  //Agrega una nueva cita al state
  const nuevaCita = cita => {
    setCitas([ ...citas, cita ])
  }

  //Elimina una cita de la lista y del state.
  const eliminarCita = id => {
    const eliminar = citas.filter(cita => cita.id !== id)

    setCitas(eliminar)
  }

  //Muestra un titulo diferente dependiendo si hay o no citas en el state.
  const titulo = citas.length === 0 ? 'No hay citas!' : 'Administra tus citas'


  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className='one-half column'>
            <Formulario 
              nuevaCita={nuevaCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {
              citas.map(cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
