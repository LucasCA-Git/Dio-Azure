const express = require('express');
const router = express.Router();
const cpfController = require('../controllers/cpfController');

// Rota para validar o CPF
router.post('/validar-cpf', cpfController.validarCpfController);

module.exports = router;
