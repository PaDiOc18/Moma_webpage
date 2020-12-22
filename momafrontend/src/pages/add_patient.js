import React, { Component } from 'react'
import FormPatient from '../components/form_patient.js'
import axios from 'axios'

class add_patient extends Component {

    receive_state_from_child  = (child_state,action) => {
        console.log(action);
        axios({
        method: 'post',
        url: 'http://localhost:4000/pacientes/agregar',
        data: {
            paciente: child_state.paciente,
            direccion: child_state.direccion,
            prehistorial: child_state.prehistorial
        }}).then(response => {
            alert(response.data);
        })
    }    

    render() {
        return (
            <div className='currentPage'>
              <FormPatient send_data_from_child ={this.receive_state_from_child} functionality = 'add'>
              </FormPatient>
            </div>
        )
    }
}

export default add_patient;