# Desafio Projeto Backend TodoList CroSoften

## Descrição

Este é um projeto backend desenvolvido em **Node.js** utilizando o **Express** e o **Prisma ORM**, seguindo as melhores práticas de **Clean Code** e **DDD (Domain-Driven Design)**.

A aplicação consiste em uma API que permite:
- **Cadastro de novos usuários**.
- **Login de usuários**.
- **Criação de tasks** (tarefas) para usuários logados.
- **Listagem e modificação de tasks**.
- **Criação e listagem de subtasks** (subtarefas).

## Funcionalidades

### Usuários
- Cadastro de novos usuários.
- Login de usuários com autenticação JWT.
  
### Tasks
- Criar novas tasks.
- Listar todas as tasks.
- Modificar uma task.

### Subtasks
- Criar subtasks vinculadas a uma task principal.
- Listar subtasks de uma task específica.

## Segurança
- As senhas são armazenadas de forma segura utilizando **bcrypt** para encriptação.
- A autenticação nas rotas protegidas é feita através de **JWT (JSON Web Token)**.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **JWT** para autenticação
- **bcrypt** para encriptação de senhas
- **Docker** para containerização
- **Swagger** para documentação da API

## Estrutura do Projeto

O projeto segue uma organização baseada em **DDD**, separando as responsabilidades em camadas distintas:
- **Domain**: Lógica central da aplicação (entidades e regras de negócios).
- **Infrastructure**: Integrações com banco de dados (Prisma), serviços externos, etc.
- **Presentation**: Endpoints da API e manipulação de requisições/respostas.

## Executando a Aplicação

### Pré-requisitos

- **Docker**: Certifique-se de ter o Docker instalado em sua máquina.
- **Arquivo .env**: Crie o arquivo `.env` com base no `.env.example`, ajustando as variáveis conforme necessário.

### Passo a Passo

1. Clone o repositório:
  ```bash
  git clone git@github.com:pedro-henrique-a-silva/cros_todolist_api.git
  ```

2. Acesse o diretório do projeto:
  ```bash
  cd cros_todolist_api
  ```
3. Crie o arquivo `.env` com base no `.env.example`:
  ```bash
  cp .env.example .env
  ```

> ⚠️⚠️ OBS: Não se esqueça de colocar os valores das variávies de ambiente de forma correta, ou haverá problemas na inicialização do projeto.

4. Suba os containers do Docker:

  ```bash
  docker-compose up -d
  ```

## Documentação da API

A documentação da API está disponível via Swagger e pode ser acessada através da rota:

  ```bash
  http://localhost:3001/docs
  ```

## Testes
A aplicação possui testes unitários que garantem a integridade das funcionalidades principais.

> ⚠️⚠️ OBS: os testes não precisam ser executados dentro do container docker.

### Rodando os Testes
Execute os testes unitários com o seguinte comando:

  ```bash
  npm test
  ```