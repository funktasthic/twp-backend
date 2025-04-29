# TWP BACKEND

Este es un proyecto en el cual se construye una API para una aplicación móvil de paseos caninos que tiene como fin comprender los aspectos fundamentales de NodeJS, Express, SQLite y Sequelize.

![Logo](https://i.imgur.com/QY85v6q.png)

## Tecnologías

- Node.JS (versión 20.17.0)
- Express (versión 4.21.2)
- SQLite (versión 3)
- Sequelize (versión 6.37.6)

## Requisitos
- [Visual Studio Code](https://code.visualstudio.com/) o [Visual Studio](https://visualstudio.microsoft.com/)
 - [Node](https://nodejs.org/en/download/current)
 - Puerto del servidor = 8080
 - Crear una base de datos llamada twp_db

## Instalación

1. Clona el repositorio desde GitHub ejecutando los siguientes comandos en tu terminal:

```bash
git clone https://github.com/funktasthic/twp-backend.git

cd twd-backend
```

2. Verifica las ramas disponibles y cambia a la rama que deseas:

```bash
git branch -a

git checkout [nombre de rama a seleccionar]
```

3. Copia el archivo .env.example y configura el archivo .env con la información necesaria

```bash
copy .env.example .env
```

5. Instala Sequelize globalmente y las dependencias del proyecto

```bash
npm i -g sequelize-cli
npm i
```

6. Ejecuta la aplicación utilizando el comando:

```bash
npm run dev
```

## Autores

- [@funktasthic](https://www.github.com/funktasthic)
