import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from "jquery";
import 'bootstrap/dist/css/navbarstyle.css';
import logo from './imgs/momalogo.ico';
import { BrowserRouter, Route} from 'react-router-dom';
import AgregarPaciente from './components/agregarpaciente.js';
import BuscarHistorialPaciente from './components/buscarhistorialpaci.js';
import BuscarPaciente from './components/buscarpaciente.js';
import ModificarPaciente from './components/modificarpaciente.js';


class App extends Component {

  componentDidMount(){
      $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });
  }

  render() {
    return (
       <div className="App">
         <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <div className="wrapper">
          <nav id="sidebar">
              <div className="sidebar-header">
                  <img className="img-fluid" src={logo}></img>
              </div>

              <ul className="list-unstyled components">
                  <p>Moma Clinic App</p>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Consultas
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">Agregar Consulta</a>
                    <a className="dropdown-item" href="#">Buscar Consulta</a>
                    <a className="dropdown-item" href="#">Editar Datos</a>
                    <a className="dropdown-item" href="#">Eliminar Datos</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Pacientes
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="/AgregarPaciente">Agregar Paciente</a>
                    <a className="dropdown-item" href="/BuscarPaciente">Buscar Paciente</a>
                    <a className="dropdown-item" href="/BuscarHistorialPaciente">Consultar Historial</a>
                    </div>
                </li>
              </ul>
          </nav>

            <div id="content">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button type="button" id="sidebarCollapse" className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span>Abrir Menu</span>
                        </button>
                        <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-align-justify"></i>
                        </button>
                    </div>
                </nav>
                <BrowserRouter>
                    <Route path="/AgregarPaciente" component={AgregarPaciente}></Route>
                    <Route path="/BuscarHistorialPaciente" component={BuscarHistorialPaciente}></Route>
                    <Route path="/BuscarPaciente" component={BuscarPaciente}></Route>
                    <Route path="/ModificarPaciente" component={ModificarPaciente}></Route>
                </BrowserRouter>
            </div>
          </div>
      </div>
    );
  }
}

export default App;