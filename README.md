# Minhas Series
Este é um projeto feito com o único objetivo de coloca em pratica o aprendizado sobre angular da [COD3R](https://www.udemy.com/course/curso-web/).

## Build
Para fazer fazer o build siga as orientações abaixo

### Requisitos
- [Node.JS](https://nodejs.org/en/download/) instalado
- Pacote [@angular/cli](https://www.npmjs.com/package/@angular/cli) instalado
> $ npm install --global @angular/cli

### Fazendo o Build

- Abra o terminal na pasta do repositório
- Vá na pasta **frontend**
> $ cd frontend
- Instale as dependências
> $ npm install
- Faça o build
> $ ng build
- Será gerada uma pasta chamada **dist** na pasta **frontend**. Mova ela para a pasta **backend**
> $ mv ./dist ../backend
- Vá para a pasta **backend**
> $ cd ../backend
- Instale as dependências
> $ npm install

Pronto você finalizou o build da aplicação.

## Ligando o servidor
- Abra o terminal no repositório
- Vá na pasta **backend**
- Execute o comando:
> $ npm start
- Para acessar a aplicação abra seu navegar e entre em http://localhost:5544/