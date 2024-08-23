
# Plate POS System

## Sobre o Projeto

O **Plate** é um POS System (*Point of Sale* ou Ponto de Venda), desenvolvido com **ReactJS** usando **Vite** como ferramenta de build. O propósito do Plate é ser uma plataforma completa para a gestão de restaurantes e outros pontos de venda, facilitando operações diárias, como o gerenciamento de produtos, pedidos, e perfis de funcionários.

A plataforma será lançada inicialmente com um conjunto básico de funcionalidades, mas possui um roadmap de desenvolvimento que inclui a adição progressiva de novos recursos.

## Funcionalidades

- Cadastro e edição de restaurantes e produtos.
- Gerenciamento de perfis de funcionários.
- Sistema de login e autenticação.
- Integração com Firebase para backend e banco de dados.

## Estrutura de Pastas

Abaixo está a estrutura de pastas do projeto, baseada na imagem fornecida:

```
Plate_POS_System/
│
├── .firebase/
│
├── components/
│   ├── CadRestaurante/
│   ├── EditRestaurante/
│   └── LandingPage/
│
├── dist/
│
├── node_modules/
│
├── public/
│   └── index.html
│
├── screens/
│   ├── Admin.jsx
│   ├── CadAdmin.jsx
│   ├── CadPrato.jsx
│   ├── Carrinho.jsx
│   ├── EditPrato.jsx
│   ├── Login.jsx
│   ├── PerfilEmp.jsx
│   ├── Produto.jsx
│   └── Restaurant.jsx
│
├── src/
│   ├── AdminRestaurantContext.jsx
│   ├── App.jsx
│   ├── firebaseConfig.js
│   ├── main.jsx
│   ├── PratoContext.jsx
│   ├── ProtectedRoute.jsx
│   └── RestaurantContext.jsx
│
├── .firebaserc
├── .gitignore
├── firebase.json
└── package.json
```

### Descrição das Principais Pastas e Arquivos:

- **components/**: Contém os componentes principais do sistema, organizados em subpastas de acordo com a funcionalidade.
- **screens/**: Contém as telas principais do sistema, incluindo telas de administração, cadastro, edição, login e gerenciamento de produtos.
- **src/**: Contém arquivos de configuração e contexto, incluindo as rotas principais (definidas em `main.jsx`) e os contextos de estado do restaurante e prato.
- **public/**: Contém o arquivo `index.html`, ponto de entrada da aplicação.
- **firebaseConfig.js**: Contém a configuração para integração com o Firebase, que é utilizado como provedor de backend e banco de dados.

## Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/alexandre-niess/Plate_POS_System.git
   ```
2. Instale as dependências:
   ```bash
   cd Plate_POS_System
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O projeto estará disponível em `http://localhost:3000`.

## Roadmap

- **Versão 1.0**: Lançamento inicial com funcionalidades básicas de gerenciamento de restaurantes e produtos.
- **Futuras Versões**:
  - Integração com sistemas de pagamento.
  - Relatórios financeiros.
  - Expansão para múltiplos pontos de venda.

## Contribuição

Sinta-se à vontade para contribuir com o projeto. Faça um fork do repositório, crie uma nova branch com suas funcionalidades ou correções, e abra um pull request.

## Contato

Caso encontre algum problema, deseje enviar alguma sugestão, etc. [Entre em contato!](https://portfolio-alexandre-niess.web.app/)


