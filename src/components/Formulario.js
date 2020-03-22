import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const Formulario = ({ nuevaCita }) => {

    //State de Citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })
    //State para el error
    const [error, setError] = useState(false)

    const actualizarState = e => {
        //Se agrega el valor de cada input al state
        setCita({ ...cita, [e.target.name]: e.target.value })
    }

    //Extraer los valores, para resetear el formulario
    const { mascota, propietario, fecha, hora, sintomas } = cita

    const handleSubmitCita = e => {
        e.preventDefault()

        //Validar form
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            setError(true)
            return
        }
        setError(false)

        //Asignar un ID
        cita.id = v4()

        //Crear la cita
        nuevaCita(cita)

        //Reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
            <h2>Crear cita</h2>
            {/* Se ejecuta cuando hay campos vacíos */}
            {error ? <p className='alerta-error'>Todos los campos son obligatorios</p> : null}

            <form onSubmit={handleSubmitCita}>
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre dueño de mascota'
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type='submit'
                    className='u-full-width button-primary'
                >
                    Agregar Cita
                </button>
            </form>
        </Fragment>
    );
};

Formulario.propTypes = {
    nuevaCita: PropTypes.func.isRequired
}

export default Formulario;