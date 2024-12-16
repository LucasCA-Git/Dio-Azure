const axios = require('axios');
const cpfService = require('../services/cpfService');

/**
 * Função para validar CPF
 */
module.exports = async function (context, req) {
  const cpf = req.body.cpf;

  if (!cpf) {
    context.res = {
      status: 400,
      body: { message: 'CPF é obrigatório' }
    };
    return;
  }

  try {
    const validationResult = await cpfService.validarCpf(cpf);

    if (validationResult.status === 'invalid') {
      context.res = {
        status: 400,
        body: { cpf, status: 'invalid' }
      };
    } else {
      context.res = {
        status: 200,
        body: { cpf, status: 'valid' }
      };
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: { message: 'Erro ao verificar CPF', error: error.message }
    };
  }
};
