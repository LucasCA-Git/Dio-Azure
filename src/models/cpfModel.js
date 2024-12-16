module.exports = class CpfModel {
    constructor(cpf) {
      this.cpf = cpf;
      this.status = null;  // 'valid' ou 'invalid'
    }
  };
  