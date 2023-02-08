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

3. Instalar pnpm y dependencias:

```sh
npm i -g pnpm
pnpm install
```

4. Levantar la imagen de MongoDB:

```sh
docker-compose up mongodb -d
```

5. Iniciar el proyecto:

```sh
pnpm run start
```

## Documentación de la API

Una vez el proyecto esté corriendo, la documentación se puede consultar en http://localhost:3000/docs.

## Uso

La aplicación permite consultar las películas más populares usando el endpoint: http://localhost:3000/movies/popular

También se pueden buscar películas usando el endpoint: http://localhost:3000/movies/search?query=<PALABRA CLAVE DE BÚSQUEDA>

Tome nota del `movieApiId` para la(s) películas de su interés, ya que se necesita para agregar la película a sus favoritos o crear notas.

Ahora necesita un id de usuario (solo crea un usuario mock no se necesita body):

```http
POST http://localhost:3000/users
```

El endpoint devuelve el id del usuario.

Para agregar una película a los favoritos de este usuario:

```http
POST http://localhost:3000/users/<USER ID>/favorites

{
  "movieId": <MOVIE API ID>
}
```

Para agregar una nota a las notas del usuario:

```http
POST http://localhost:3000/users/<USER ID>/notes

{
  "movieId": <MOVIE API ID>,
  "title": "title",
  "description": "description",
  "imageUrl": "https:image.url.com"
}
```

Editar una nota:

```http
PATCH http://localhost:3000/users/<USER ID>/notes

{
  "description": "esto cambió"
}
```

## Tests

```sh
pnpm run test
```
