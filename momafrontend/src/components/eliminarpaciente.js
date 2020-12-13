import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
class eliminarpaciente extends Component {
    render() {
        return (
            <div>
                <div class="container-fluid d-flex justify-content-end">
                    <form class="form-inline">
                        <div class="form-group mb-2">
                            <label>Ingresa el ID del paciente:</label>
                        </div>
                        <div class="form-group mx-sm-3 mb-2">
                            <input autoComplete="off" type="text" class="form-control" id="clave" placeholder="ID del paciente" onChange={e => this.setState({IdBusca: e.target.value})}/>
                        </div>
                        <button type="submit" class="btn btn-primary mb-2" onClick={this.requestValoresPaciente}>Buscar Paciente</button>
                    </form>
                </div>

                <br></br>
                
                <div class="container-fluid text-left">
                    <ul class="list-group">
                        <li class="list-group-item"><h5>Nombre:</h5> <div class="font-italic">Cras justo odio</div></li>
                        <li class="list-group-item"><h5>Apellido Paterno:</h5> <div class="font-italic">Cras justo odio</div></li>
                        <li class="list-group-item"><h5>Apellido Materno:</h5> <div class="font-italic">Cras justo odio</div></li>
                        <li class="list-group-item"><h5>Titulo 1:</h5> <div class="font-italic">Cras justo odio</div></li>
                        <li class="list-group-item"><h5>Titulo 1:</h5> <div class="font-italic">Cras justo odio</div></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default eliminarpaciente;