<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Upload Pdf" />

&#xa0;

  <!-- <a href="https://uploadpdf.netlify.com">Demo</a> -->
</div>

<h1 align="center">Upload Pdf</h1>

<p align="center">
  <img alt="Principal linguagem do projeto" src="https://img.shields.io/github/languages/top/SteveNascimento/upload-pdf?color=56BEB8">

  <img alt="Quantidade de linguagens utilizadas" src="https://img.shields.io/github/languages/count/SteveNascimento/upload-pdf?color=56BEB8">

  <img alt="Tamanho do repositório" src="https://img.shields.io/github/repo-size/SteveNascimento/upload-pdf?color=56BEB8">

  <img alt="Licença" src="https://img.shields.io/github/license/SteveNascimento/upload-pdf?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/SteveNascimento/upload-pdf?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/SteveNascimento/upload-pdf?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/SteveNascimento/upload-pdf?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center">
	🚧  Upload Pdf 🚀 Em construção...  🚧
</h4>

<hr> -->

<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0; 
  <a href="#sparkles-funcionalidades">Funcionalidades</a> &#xa0; | &#xa0;
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-pré-requisitos">Pré requisitos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-começando">Começando</a> &#xa0; | &#xa0;
  <a href="#memo-licença">Licença</a> &#xa0; | &#xa0;
  <a href="https://github.com/SteveNascimento" target="_blank">Autor</a>
</p>

<br>

## :dart: Sobre

Este é um projeto de estudo para o upload de um arquivo em PDF. O sistema se resume a uma tela onde você pode fazer o upload de qualquer arquivo em PDF, o mesmo será salvo no banco e listado para o usuário, com opção de baixar o documento.

## :sparkles: Funcionalidades

:heavy_check_mark: Upload de arquivos em PDF;\
:heavy_check_mark: Listar os arquivos salvos no banco;\
:heavy_check_mark: Fazer o download dos arquivos salvos anteriormente;

## :rocket: Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [Axios](https://axios-http.com/)
- [Prisma](https://www.prisma.io/)

## :white_check_mark: Pré requisitos

Antes de começar :checkered_flag:, você precisa ter o [Git](https://git-scm.com) e o [Node](https://nodejs.org/en/) instalados em sua maquina.

## :checkered_flag: Começando

```bash
# Clone este repositório
$ git clone https://github.com/SteveNascimento/upload-pdf

# Entre na pasta do server
$ cd server

# Instale as dependências
$ yarn

# Crie o banco de dados SQLite com a lib prisma
$ yarn prisma migrate dev

# Inicie o servidor
$ yarn dev

# Abra outra janela e entre na pasta do client
$ cd client

# Instale as dependências
$ yarn

# Para iniciar a aplicação front
$ yarn start

# O app vai inicializar em <http://localhost:3000>
```

## :memo: Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

Feito com :heart: por <a href="https://github.com/SteveNascimento" target="_blank">Steve</a>

&#xa0;

<a href="#top">Voltar para o topo</a>
