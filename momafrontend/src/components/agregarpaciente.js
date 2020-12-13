import React, { Component } from 'react';
import FormularioPaciente from './formularioPaciente.js';
import axios from 'axios';

class agregarpaciente extends Component {

    recibirPropsHijo = (estadoHijo) => {
        axios({
        method: 'post',
        url: 'http://localhost:4000/pacientes/agregar',
        data: {
            paciente: estadoHijo.paciente,
            direccion:estadoHijo.direccion,
            prehistorial: estadoHijo.prehistorial
        }}).then(res => {
            alert(res.data);
        })
    }    

    render() {
        return (
            <div>
              <FormularioPaciente MandarDataPadre ={this.recibirPropsHijo} Funcionalidad = 'Agregar'>
              </FormularioPaciente>
            </div>
        )
    }
}

export default agregarpaciente;