# EL BACKEND

## Requisitos

1. Docker
2. Node version 18.12.1

## Up and running

1. Clonar el proyecto:

```sh
git clone https://github.com/mauriciorobayo/el-backend
cd el-backend
```

2. Crear archivo `.env`:

```sh
cp .env.example .env
```

2. TMDB Access Token

El proyecto usa access token (v3 y v4) y no API_KEY (v3).

Para obtener el access token ir a https://www.themoviedb.org/settings/api y copiar el JWT que se encuentra en la sección `API Read Access Token (v4 auth)`.

En el archivo `.env` pegar el access token para el valor de `TMDB_ACCESS_TOKEN`.

3. Instalar dependencias:

```sh
yarn install
```

4. Levantar la imagen de MongoDB:

```sh
docker-compose up mongodb -d
```

5. Iniciar el proyecto:

```sh
yarn start
```

## Documentación de la API

Una vez el proyecto esté corriendo, documentación Swagger se puede consultar en http://localhost:3000/docs.

## Movies

La aplicación permite consultar las películas más populares usando el endpoint: http://localhost:3000/movies/popular

También se pueden buscar películas usando el endpoint: http://localhost:3000/movies/search?query=<PALABRA CLAVE DE BÚSQUEDA>

Estos endpoints no requieren autenticación.

## Auth

Para crear un usuario:

```http
POST http://localhost:3000/auth/register

{
    "email": "nobody@email.com",
    "name": "NoBody",
    "password": "Abcde123!$"
}
```

Una vez crea el usuario debe ir al buzón de correo del usuario para verificar la cuenta dando click en el vínculo que fue enviado.

Para ingresar una vez verificado el correo del usuario creado:

```http
POST http://localhost:3000/auth/login

{
    "email": "nobody@email.com",
    "password": "Abcde123!$"
}
```

El login devuelve el `accessToken` y el `refreshToken`. Para generar una solicitud autenticada debe enviar el `accessToken` recibido como `bearer` token.

## Notes

Para crear una nota:

```http
POST http://localhost:3000/users/notes
authorization: bearer <ACCESS_TOKEN>

{
  "movieId": <MOVIE API ID>,
  "title": "title",
  "description": "description",
  "imageUrl": "https:image.url.com"
}
```

Editar una nota:

```http
PATCH http://localhost:3000/users/notes
authorization: bearer <ACCESS_TOKEN>

{
  "description": "esto cambió"
}
```

## Favorites

Para agregar una lista a los favoritos:

```http
POST http://localhost:3000/users/favorites
authorization: bearer <ACCESS_TOKEN>

{
  "movieId": <MOVIE API ID>,
}
```

## Tests

This is still WIP :\

```sh
yarn test
```

## Deployment

La API puede ser desplegada usando [serverless](/serverless.yml), se necesita tener el comando `sls` instalado (`npm install -g serverless`) y crear el archivo `.env.prop` a partir de [.env.example](/.env.example):

```sh
yarn build
sls deploy
```

## Postman

Para hacer pruebas en postman: [Postman Collection](/docs/Postman/el-backend.postman_collection.json).
