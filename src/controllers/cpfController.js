const cpfService = require('../services/cpfService');

exports.validarCpfController = async (req, res) => {
  const cpf = req.body.cpf;

  if (!cpf) {
    return res.status(400).json({ message: 'CPF é obrigatório' });
  }

  try {
    const validationResult = await cpfService.validarCpf(cpf);

    if (validationResult.status === 'invalid') {
      return res.status(400).json({ cpf, status: 'invalid' });
    } else {
      return res.status(200).json({ cpf, status: 'valid' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar CPF', error: error.message });
  }
};
