import React, { Component } from 'react'
import axios from 'axios';
import FormularioPaciente from './formularioPaciente.js'

class modificarpaciente extends Component {

    componentDidMount(){
      //console.log(this.props.location.data);
      if(this.props.location.data == null){
        alert('No se pudo obtener ningun dato del paciente');
      }
    }

    recibirPropsHijo = (estadoHijo) => {
      console.log(estadoHijo);
      //Aqui nada mas faltaria tomar el estadohijo, mandarlo para peticion de agregar y todos felices
      //PATTERN de las input de HTML para verificar los campos numericos etc
    }  

    render() {
        return (
            <div>
              <FormularioPaciente datosEnviados={this.props.location.data} MandarDataPadre ={this.recibirPropsHijo} Funcionalidad = {'Modificar'}>
              </FormularioPaciente>
            </div>
        )
    }
}

export default modificarpaciente;
