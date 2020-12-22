const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'moniUser',
    password: 'usuariomoni',
    database: 'monidb'
});

router.use(cors());
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)





module.exports = router;