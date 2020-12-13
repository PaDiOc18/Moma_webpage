const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const router = express.Router();
const pacientesRouter = require('./routes/pacientes');

const app = express();
app.use(cors());

app.use(express.json()); //CAMBIO
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use('/pacientes', pacientesRouter);

app.listen(4000, () => {
    console.log("Servidor Creado por exito");
});