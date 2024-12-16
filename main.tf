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
  "SECRET_KEY" = "your_secret_key_here"
  } 
}
