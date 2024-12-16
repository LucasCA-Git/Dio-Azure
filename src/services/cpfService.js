const axios = require('axios');

// Função para obter o Access Token
async function obterAccessToken() {
  const client_id = 'seu-client-id'; // Substitua pelo seu client_id
  const client_secret = 'seu-client-secret'; // Substitua pelo seu client_secret

  try {
    const response = await axios.post('https://apigateway.conectagov.estaleiro.serpro.gov.br/oauth2/jwt-token', {
      client_id,
      client_secret,
      grant_type: 'client_credentials',
    });
    
    return response.data.access_token;
  } catch (error) {
    throw new Error('Erro ao obter o access token: ' + error.message);
  }
}

// Função para validar CPF
exports.validarCpf = async (cpf) => {
  try {
    // Obter o token de acesso
    const token = await obterAccessToken();

    // Realizar a consulta ao serviço de CPF com o token de acesso
    const response = await axios.get(`https://apigateway.conectagov.estaleiro.serpro.gov.br/api-cpf-light/v2/consulta/cpf/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.status === 'invalid') {
      return { status: 'invalid' };
    } else {
      return { status: 'valid' };
    }
  } catch (error) {
    throw new Error('Erro ao consultar CPF: ' + error.message);
  }
};
