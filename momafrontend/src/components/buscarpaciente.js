import React, { Component, Fragment } from 'react'
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from 'axios';
//import Button from '@material-ui/core/Button';

class buscarhistorialpaci extends Component {
    
    state = {
        tipopeticion: 0,
        displays:['none','none','none'],
        pacientes: [],
        datospost: {
            id: null,
            nombre: null,
            apellido: null,
            fechaInicio: new Date(),
            fechaFinal: new Date()
        },
        columnDefs: [{
            headerName: "Id Paciente", field: "idpaciente",sortable: true, filter: true
        }, {
            headerName: "Nombre", field: "nombre",sortable: true, filter: true
        },{
            headerName: "Apellido P", field: "apellidop",sortable: true, filter: true
        },{
            headerName: "Apellido M", field: "apellidom",sortable: true, filter: true
        },{
            headerName: "Fecha Nac", field: "fechanac",sortable: true, filter: true
        },{
            headerName: "Sexo", field: "sexo",sortable: true, filter: true
        },{
            headerName: "Estado Civil", field: "estadocivil",sortable: true, filter: true
        },{
            headerName: "Telefono", field: "telefono",sortable: true, filter: true
        },{
            headerName: "Correo", field: "correo",sortable: true, filter: true
        },{
            headerName: "Nacionalidad", field: "nacionalidad",sortable: true, filter: true
        },{
            headerName: "Observaciones", field: "observaciones",sortable: true, filter: true
        },{
            headerName: "Fecha de Alta", field: "fechaAltaPaciente",sortable: true, filter: true
        },{
            headerName: "Telefono", field: "telefono",sortable: true, filter: true
        },{
            headerName: "Correo", field: "correo",sortable: true, filter: true
        },{
            headerName: "Nacionalidad", field: "nacionalidad",sortable: true, filter: true
        },{
            headerName: "Observaciones", field: "observaciones",sortable: true, filter: true
        }],
        paginationPageSize: 10
    }

    componentDidMount(){
        const {datospost} = this.state;
        fetch('http://localhost:4000/pacientes/')
        .then(response => response.json())
        .then(response => 
        this.setState({pacientes: response.pacientes}))
        .catch(err => console.error(err));
    }

    ModificaInputs = (event) =>{ 
        let displaysCopy = ['none','none','none']
        switch (event.target.value) {    
            case 'nomapell':
                displaysCopy[0] = 'block';
                this.setState({tipopeticion: 1}, () =>{
                    this.setState({ //Usamos doble setState para asegurar que se seleccione el tipo de peticición
                        displays: displaysCopy
                    });
                });
                break;
    
            case 'clave':
                displaysCopy[1] = 'block';
                this.setState({tipopeticion: 2, inputTexts:''}, () =>{
                    this.setState({
                        displays: displaysCopy
                    });
                });
                break;
    
            case 'fecha':
                displaysCopy[2] = 'block';
                this.setState({tipopeticion: 3}, () =>{
                    this.setState({
                        displays: displaysCopy
                    });
                });
                break;
    
            default:
                alert('Favor de Seleccionar una opcion')
                break;
        }
    }

    PeticionBusqueda = (e) => {
        e.preventDefault();
        console.log(this.state.datospost);
        axios({
            method: 'post',
            url: 'http://localhost:4000/pacientes/consultapaciente',
            data: {
                datospost: this.state.datospost,
                tipopeticion: this.state.tipopeticion
            }
            }).then(res => {
              //console.log(res.data.pacientes)
              this.setState({pacientes: res.data.pacientes});
        });
    }

    MandarEditarEliminar = (row) => {
        axios({
            method: 'get',
            url: 'http://localhost:4000/pacientes/todainformacionpaciente?idpaciente=' + row.data.idpaciente
            }).then(res => {
              this.props.history.push({
                pathname: "/modificarpaciente",
                data: {
                        ...res.data.paciente[0]
                } 
            });
        });
    }


    render() {
        let { datospost, displays} = this.state;
        return (
            <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm">
                        <label htmlFor="buscapor">Buscar por:</label>
                        <select id="buscapor" className="form-control" onChange={this.ModificaInputs}>
                            <option value='Seleccionar'>Selecciona una opcion</option>
                            <option value='nomapell'>Nombre y Apellido</option>
                            <option value='clave'>Clave</option>
                            <option value='fecha'>Fecha</option>
                        </select>
                    </div>                    
                    <Fragment>
                        <form style={{display: displays[0]}} class="col-sm" onSubmit={this.PeticionBusqueda}>
                            <div class="col">
                                <label htmlFor="nombre">Ingresa:</label>
                                <input type="text" className="form-control" id="nombre" placeholder="Nombre" onChange={ e => this.setState({datospost: {... datospost, nombre: e.target.value}})}/>
                            </div>
                            <div class="col" >
                                <label htmlFor="apellido">Ingresa:</label>
                                <input type="text" className="form-control" id="apellido" placeholder="Apellido" onChange={ e => this.setState({datospost: {...datospost, apellido: e.target.value}})}/>
                            </div>
                            <br/>
                            <div className='text-center'>
                                <button type = "submit"  className="btn btn-primary">Buscar</button>
                            </div>
                        </form>
                    </Fragment>
                    <Fragment>
                        <form style={{display: displays[1]}} class="col-sm" onSubmit={this.PeticionBusqueda}>
                            <div class="col">
                                <label htmlFor="clave">Ingresa:</label>
                                <input type="text" className="form-control" id="clave" pattern="[0-9]+" placeholder="ID" onChange = { e => this.setState({datospost:{...datospost, id: e.target.value }})} />
                            </div>
                            <br/>
                            <div className='text-center'>
                                <button type = "submit" className="btn btn-primary">Buscar</button>
                            </div>
                        </form>
                    </Fragment>
                    <Fragment>
                        <form style={{display: displays[2]}} class="col-sm" onSubmit={this.PeticionBusqueda}>
                            <div class="col-sm" >
                                <label htmlFor="fechainicio">Ingresa:</label>
                                <input type="date" className="form-control" id="fechainicio" placeholder="Fecha Inicio" onChange={e => this.setState({datospost: {...datospost, fechaInicio: e.target.value}})}/>
                            </div>
                            <div class="col-sm" style={{display: displays[2]}}>
                                <label htmlFor="fechafinal">Ingresa:</label>
                                <input type="date" className="form-control" id="fechafinal" placeholder="Fecha Final" onChange={e => this.setState({datospost: {... datospost, fechaFinal: e.target.value}})}/>
                            </div>
                            <br/>
                            <div className='text-center'>
                                <button type = "submit"  className="btn btn-primary">Buscar</button>
                            </div>
                        </form>
                    </Fragment>
                </div>
            </div>
                  
                <br/>
                <div style={{ height: '500px', width: '100%' }} className="ag-theme-alpine">
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.pacientes}
                        pagination={true}
                        paginationPageSize={this.state.paginationPageSize}
                        onRowDoubleClicked={this.MandarEditarEliminar}
                        enableCellTextSelection={true}
                        suppressCopyRowsToClipboard = {true}>
                    </AgGridReact>
                </div>
            </div>
            )
    }
}

export default buscarhistorialpaci;