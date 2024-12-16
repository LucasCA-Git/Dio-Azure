![Logo](./public/dio.png)

# BootCamp Microsoft certifications challenge \#2 AZ-204

Este projeto tem como objetivo a construção de uma API serverless utilizando a Azure Functions, que realiza a validação de CPFs, acessando uma API pública disponibilizada pela Secretaria da Receita Federal do Brasil. O sistema foi desenvolvido para ser escalável, de fácil manutenção e com custos reduzidos, aproveitando as vantagens de uma arquitetura serverless. Abaixo está um detalhamento do que foi feito, como a Azure Functions foi configurada e como a consulta de CPF foi integrada ao sistema.


![GitHub](https://img.shields.io/github/license/LucasCA-Git/Dio-Azure)
![GitHub issues](https://img.shields.io/github/issues/LucasCA-Git/Dio-Azure)
![GitHub stars](https://img.shields.io/github/stars/LucasCA-Git/Dio-Azure?style=social)
![GitHub forks](https://img.shields.io/github/forks/LucasCA-Git/Dio-Azure?style=social)


![Node.js](https://img.shields.io/badge/Node.js-%20-%23CC3534?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-%20-%23F7A10D?logo=express&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-%20-%230078D4?logo=microsoft-azure&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-%20-%2300B4A3?logo=swagger&logoColor=white)


#### **Arquitetura do Sistema**

1. **Azure Functions**:  
   * O projeto foi desenvolvido utilizando **Azure Functions**, uma plataforma serverless oferecida pela Microsoft. Com as Azure Functions, conseguimos criar funções específicas para realizar tarefas (como a validação do CPF) sem precisar gerenciar servidores ou infraestrutura, o que torna a aplicação mais eficiente, escalável e econômica.  
   * A vantagem da arquitetura serverless é que pagamos apenas pelo tempo de execução das funções, o que significa que o sistema pode escalar automaticamente de acordo com a demanda.  
2. **Integração com a API de Consulta de CPF**:  
   * O serviço de validação de CPF utiliza uma API pública fornecida pelo **Governos do Brasil (Receita Federal)**. Através dessa API, podemos consultar se um CPF é válido ou inválido, obtendo informações sobre o status do CPF diretamente da Receita Federal.  
   * **Endpoint utilizado**: A API de validação de CPF está disponível em dois ambientes, produção e homologação. Usamos o endpoint de produção:  
     * **Produção**: `https://apigateway.conectagov.estaleiro.serpro.gov.br/api-cpf-light/v2/consulta/cpf`  
   * A comunicação com a API é feita usando a biblioteca **Axios** para realizar requisições HTTP e retornar os dados no formato desejado.  
3. **Fluxo de Validação de CPF**:  
   * O processo de validação começa quando um usuário envia um **CPF** via uma requisição POST para o endpoint `/validar-cpf`.  
   * A função Azure chama a API de consulta de CPF para verificar o status do CPF.  
   * Dependendo da resposta da API, o sistema retorna um JSON com o status do CPF, informando se é válido ou inválido.  
4. **Swagger para Documentação da API**:  
   * A documentação da API foi gerada utilizando o **Swagger (OpenAPI 3.0)**, que fornece uma maneira interativa e amigável de visualizar os endpoints da API e como utilizá-los.  
   * A especificação Swagger descreve o comportamento da API, incluindo os parâmetros necessários, as respostas esperadas e exemplos de requisição e resposta.  
   * A documentação pode ser acessada através da interface Swagger UI, que é disponibilizada na API para facilitar o entendimento da estrutura e testes dos endpoints.

#### **Principais Componentes do Projeto**

1. **Estrutura de Pastas**: O projeto segue uma estrutura padrão para uma aplicação Node.js com Azure Functions, incluindo os seguintes diretórios e arquivos principais:  
   * `src/`: Contém a implementação das funções Azure.  
     * `validarCpf/`: Função responsável pela validação do CPF. Dentro dessa pasta, temos o arquivo `index.js`, que contém a lógica para a consulta do CPF.  
   * `package.json`: Gerencia as dependências do projeto e os scripts de execução.  
   * `swagger.json`: Especificação da API em formato Swagger/OpenAPI, que descreve os endpoints e suas funcionalidades.  
2. **Arquivo `index.js`**:  
   * Dentro do arquivo `index.js`, a lógica da função Azure está implementada. A função recebe o CPF enviado pela requisição HTTP, faz a chamada para a API de validação de CPF e retorna a resposta formatada para o usuário.

Exemplo de código para validação do CPF utilizando a API do governo:  
```js

`const axios = require('axios');`

`exports.validarCpf = async (cpf) => {`  
  `try {`  
    ``const response = await axios.get(`https://api.exemplo.com/cpf/${cpf}`);``  
      
    `if (response.data.status === 'invalid') {`  
      `return { status: 'invalid' };`  
    `} else {`  
      `return { status: 'valid' };`  
    `}`  
  `} catch (error) {`  
    `throw new Error('Erro ao acessar API de validação de CPF');`  
  `}`  
`};`  
```

*   
3. **Arquivo `swagger.json`**:  
   * A especificação Swagger está no arquivo `swagger.json`. Ela descreve o endpoint `/validar-cpf`, onde o usuário envia um CPF e recebe uma resposta com o status de validade (válido ou inválido).

Exemplo de definição no Swagger para o endpoint de validação:  
```json

`"paths": {`  
  `"/validar-cpf": {`  
    `"post": {`  
      `"summary": "Valida um CPF",`  
      `"requestBody": {`  
        `"required": true,`  
        `"content": {`  
          `"application/json": {`  
            `"schema": {`  
              `"type": "object",`  
              `"properties": {`  
                `"cpf": {`  
                  `"type": "string",`  
                  `"example": "12345678909"`  
                `}`  
              `}`  
            `}`  
          `}`  
        `}`  
      `},`  
      `"responses": {`  
        `"200": {`  
          `"description": "CPF válido",`  
          `"content": {`  
            `"application/json": {`  
              `"example": { "cpf": "12345678909", "status": "valid" }`  
            `}`  
          `}`  
        `},`  
        `"400": {`  
          `"description": "CPF inválido",`  
          `"content": {`  
            `"application/json": {`  
              `"example": { "cpf": "12345678909", "status": "invalid" }`  
            `}`  
          `}`  
        `},`  
        `"500": {`  
          `"description": "Erro no servidor"`  
        `}`  
      `}`  
    `}`  
  `}`  
`}`  
```

*   
4. **Ambiente Serverless no Azure**:  
   * A configuração da Azure Functions foi feita para ser totalmente serverless, ou seja, o código será executado em um ambiente sem a necessidade de gerenciamento de servidores.  
   * A função Azure que processa a validação do CPF é implementada de forma isolada e acionada pela requisição HTTP, sem precisar de um servidor dedicado para gerenciar as requisições.

#### **Benefícios da Solução**

* **Escalabilidade**: A solução aproveita a escalabilidade automática da Azure Functions, que pode lidar com picos de tráfego sem a necessidade de intervenção manual.  
* **Baixo Custo**: Como a arquitetura é serverless, você paga apenas pelo tempo de execução das funções, o que torna a solução muito mais econômica.  
* **Fácil Manutenção**: Com o Azure Functions, não há necessidade de se preocupar com infraestrutura. A manutenção do código fica mais simples, pois você pode focar apenas nas funções necessárias para a validação.  
* **Alta Disponibilidade**: Azure Functions garante alta disponibilidade e resilência, podendo rodar em diferentes regiões, dependendo das configurações de escalabilidade.

# Deploy para a Azure com Terraform e GitHub Actions

Este repositório contém o código necessário para configurar e fazer o deploy de um aplicativo na plataforma Azure, utilizando o Terraform para provisionamento de recursos e GitHub Actions para automação de deploy contínuo.

## Tecnologias Utilizadas

- **Terraform**: Para criação e gerenciamento de recursos na Azure  
  <img src="https://img.icons8.com/?size=100&id=WncR8Bcg5nE9&format=png&color=000000" width="30" alt="Terraform Icon">

- **Azure CLI**: Para interagir com a Azure a partir do GitHub Actions.  
  <img src="https://img.icons8.com/?size=100&id=VLKafOkk3sBX&format=png&color=000000" width="30" alt="Azure CLI Icon">

- **GitHub Actions**: Para automação do fluxo de deploy para Azure.  
  <img src="https://img.icons8.com/?size=100&id=106440&format=png&color=000000" width="30" alt="GitHub Actions Icon">



## Estrutura do Repositório

O repositório contém os seguintes arquivos principais:

- **main.tf**: Arquivo Terraform para provisionamento de recursos na Azure.

- **.github/workflows/azure-deploy.yml**: Arquivo de workflow do GitHub Actions para realizar o deploy do código.

## Passos para Configuração e Deploy

### 1. **Criação do arquivo main.tf**

O arquivo `main.tf` contém a configuração do Terraform para criar os seguintes recursos na Azure:

- **Resource Group**: Para organizar os recursos da Azure.

- **App Service Plan**: Para definir o plano de serviço para o seu aplicativo.

- **App Service**: O serviço onde o código será implantado.

```hcl 

# main.tf

# Configuração do Provider Azure
provider "azurerm" {
  features {}
}

# Criação de um Resource Group
resource "azurerm_resource_group" "example" {
  name     = "example-rg"
  location = "East US"
}

# Criação de um App Service Plan
resource "azurerm_app_service_plan" "example" {
  name                = "example-asp"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  kind                = "App"
  sku {
    tier = "Standard"
    size = "S1"
  }
}

# Criação de um App Service (onde seu código será implantado)
resource "azurerm_app_service" "example" {
  name                = "example-app-service"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  app_service_plan_id = azurerm_app_service_plan.example.id

  app_settings = {
    "DATABASE_CONNECTION_STRING" = "your_connection_string_here"
    "SECRET_KEY"                 = "your_secret_key_here"
  }
}

```


### **2. Criação do Workflow de Deploy com GitHub Actions**

O arquivo `.github/workflows/azure-deploy.yml` automatiza o processo de deploy para a Azure usando o GitHub Actions.

Este workflow realiza as seguintes etapas:

1. **Checkout do código**: Faz o checkout do código a ser implantado.  
2. **Configuração do Azure CLI**: Configura o Azure CLI usando a ação `azure/login@v1`.  
3. **Deploy do aplicativo**: Realiza o deploy do código para o App Service da Azure.

```yaml

# .github/workflows/azure-deploy.yml

name: Azure Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Azure CLI
      uses: azure/login@v1

    - name: Deploy to Azure
      run: |
        az webapp deploy --resource-group example-rg --name example-app-service --src-path ./path-to-your-app
```
### **3. Autenticação na Azure**

Para garantir que o GitHub Actions tenha permissão para fazer deploy na Azure, é necessário configurar as credenciais de autenticação via Service Principal.

Crie os seguintes **Secrets** no seu repositório GitHub:

* `AZURE_CLIENT_ID`: ID do cliente da sua aplicação registrada no Azure.  
* `AZURE_CLIENT_SECRET`: Segredo do cliente.  
* `AZURE_TENANT_ID`: ID do locatário (tenant) da Azure.

Esses valores podem ser obtidos ao registrar um aplicativo no **Azure Active Directory**.

### **4\. Rodando o Terraform**

Para aplicar o Terraform e provisionar os recursos na Azure:

1. Instale o Terraform.  
2. Execute os seguintes comandos no terminal:

```bash

terraform init    # Inicializa o Terraform

terraform plan    # Visualiza o que será alterado

terraform apply   # Aplica as mudanças e cria os recursos na Azure

```
### **5. Deploy Automatizado**

Assim que os recursos forem provisionados, o GitHub Actions será acionado automaticamente com um push para o branch `main`. O código será então implantado no App Service na Azure.

### **6\. Verificando o Deploy**

Após o deploy ser completado, acesse o URL do seu App Service (por exemplo, `https://example-app-service.azurewebsites.net`) para verificar se o seu aplicativo está em funcionamento.

## **Conclusão**

Este fluxo automatizado proporciona uma solução robusta e eficiente para o deploy de código na Azure, utilizando Terraform para o provisionamento de recursos e GitHub Actions para a automação do processo. A flexibilidade oferecida pelo Terraform permite personalizar a infraestrutura conforme as necessidades do projeto.

Além disso, este projeto também integra a validação de CPFs através da infraestrutura da Azure, utilizando a API pública de consulta de CPF do governo. A combinação com a arquitetura serverless e a utilização de Azure Functions garante uma solução escalável, econômica e de fácil gerenciamento. A documentação da API, facilitada pelo Swagger, torna o processo de integração ainda mais simples e eficiente, promovendo uma redução significativa nos custos operacionais.


## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.


