# Projeto de Aluguel de Carros

Este é um projeto desenvolvido para gerenciar o aluguel de carros, permitindo cadastrar veículos, listar, filtrar por categorias e encontrar o carro mais barato para um período específico. O sistema é composto por um backend em Node.js utilizando Express e Prisma ORM com PostgreSQL, e um frontend em Vue.js com Vuetify.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos do Projeto](#requisitos-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autor](#autor)

## Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Express.js
  - Prisma ORM
  - PostgreSQL
  - date-fns (para manipulação de datas)

- **Frontend:**
  - Vue.js 3
  - TypeScript
  - Vuetify 3
  - Axios

- **Ferramentas e Outros:**
  - Docker e Docker Compose
  - Nodemailer (para envio de e-mails)

## Requisitos do Projeto

- **Gerenciamento de Carros:**
  - Cadastro de novos carros com informações detalhadas.
  - Listagem de carros cadastrados.
  - Filtragem de carros por categorias.

- **Funcionalidade de Encontrar o Carro Mais Barato:**
  - O usuário pode inserir um intervalo de datas e indicar se participa do programa de fidelidade.
  - O sistema calcula e retorna o carro com o menor preço total para o período.
  - O usuário pode optar por receber o resultado por e-mail.

- **Integração com APIs Externas:**
  - Uso da API da Tabela FIPE para obter fabricantes e modelos de carros.

- **Deploy com Docker:**
  - Utilização do Docker e Docker Compose para facilitar a execução e implantação do projeto.

## Instalação e Execução

### Pré-requisitos

- **Docker:** Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina.
- **Node.js:** Versão 22 ou superior (caso queira executar sem Docker).

### Backend

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/araujodgdev/desafioDouglasAraujo
   ```

2. **Navegue até o diretório do backend:**

   ```bash
   cd seu-repositorio/backend
   ```

3. **Configuração do Banco de Dados:**

   - O projeto utiliza o PostgreSQL. As configurações estão no arquivo `docker-compose.yml`.
   - Se necessário, atualize a variável `DATABASE_URL` no `.env` com suas credenciais.

4. **Executar com Docker Compose:**

   Na raiz do projeto (onde está o `docker-compose.yml`), execute:

   ```bash
   docker-compose up --build
   ```

   Isso irá iniciar os serviços do backend, frontend e banco de dados.

5. **Executar Migrações do Prisma:**

   Em outro terminal, execute:

   ```bash
   docker-compose exec backend npx prisma migrate dev
   ```
6. **Observação:**

   Você deve configurar as variáveis de ambiente no arquivo `.env` para o envio de e-mails. O projeto utiliza o Nodemailer com gmail para enviar e-mails. É necessário preencher as variáveis `EMAIL_USER` e `EMAIL_PASS` com suas credênciais de acesso único.

### Frontend

1. **Acesse o Frontend no Navegador:**

   O frontend estará disponível em:

   ```
   http://localhost:5173
   ```

2. **Recarga Automática:**

   Qualquer alteração no código fonte será refletida automaticamente no navegador.

## Funcionalidades Implementadas

- **Cadastro de Carros:**
  - Formulário para cadastro com validação.
  - Seleção de fabricante e modelo integrados à API da Tabela FIPE.
  - Campos para preços diferenciados (dias de semana, finais de semana, com e sem fidelidade).

- **Listagem de Carros:**
  - Tabela com informações dos carros cadastrados.
  - Opção para filtrar por categoria.
  - Exibição dos preços cadastrados.

- **Encontrar Carro Mais Barato:**
  - Formulário para inserir intervalo de datas e participação no programa de fidelidade.
  - Cálculo do preço total considerando dias da semana e finais de semana.
  - Exibição do carro mais barato e detalhes.
  - Opção para receber o resultado por e-mail.

- **Feedback ao Usuário:**
  - Uso de `v-snackbar` para exibir mensagens de sucesso e erro.
  - Validações de formulário com mensagens claras.

## Estrutura do Projeto

- **backend/**
  - **src/**
    - **controllers/**: Controladores das rotas.
    - **services/**: Lógica de negócios e comunicação com o banco de dados.
    - **routes/**: Definição das rotas da API.
    - **models/**: Definição dos modelos do Prisma.
  - **.env**: Variáveis de ambiente.
  - **Dockerfile**: Configuração do Docker para o backend.

- **frontend/**
  - **src/**
    - **components/**: Componentes Vue.js reutilizáveis.
    - **views/**: Páginas principais da aplicação.
    - **router/**: Configuração das rotas do Vue Router.
  - **Dockerfile**: Configuração do Docker para o frontend.

- **docker-compose.yml**: Configuração dos serviços Docker para o projeto completo.

## Autor

- **Seu Nome**
  - GitHub: [araujodgdev](https://github.com/araujodgdev)
  - E-mail: araujodgdev@gmail.com

---

**Observações:**

- Este projeto foi desenvolvido como parte de um desafio para uma vaga de software engineer.
- Qualquer dúvida ou sugestão é bem-vinda. Sinta-se à vontade para abrir issues ou pull requests.