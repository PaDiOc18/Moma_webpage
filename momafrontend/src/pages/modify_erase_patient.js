import React, { Component } from 'react'
import axios from 'axios'
import FormularioPaciente from '../components/form_patient.js'

class modificarpaciente extends Component {

  componentDidMount(){
    if(this.props.location.data === null || this.props.location.data === undefined){
      alert('No se pudo obtener ningun dato del paciente');
    }
  }

  receive_state_from_child = (child_state) => {
    if(child_state.action === 'modify'){
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
    else if(child_state.action === 'erase'){
      axios({
          method: 'delete',
          url: 'http://localhost:4000/pacientes/eliminar?idpaciente=' + this.props.location.data.idpaciente,
      }).then(response => {
              alert(response.data);
          })
    }
    else{
      alert('No se encuentra la accion a ejecutar')
    }
  }    

    render() {
        return (
            <div>
              <FormularioPaciente datosEnviados={this.props.location.data} send_data_from_child ={this.receive_state_from_child} functionality = 'modify_erase'>
              </FormularioPaciente>
            </div>
        )
    }
}

export default modificarpaciente;
