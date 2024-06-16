# Creador de encuestas API

Este proyecto contiene la API usada por el [Creador de encuestas](https://github.com/thicco-catto/creador-encuestas-react) y por el [Rellenador de encuestas](https://github.com/thicco-catto/Rellenar-Encuestas).

## Guia de Instalacion

1. Instalar Node.js y npm.
2. Descargar el código del proyecto.
3. Ejecutar el comando `npm i` para instalar todas las dependencias.
4. Crear un archivo `.env.local` para las variables de entorno.
5. Ejecutar el comando `npm run start` para ejecutar la aplicación en el entorno de desarrollo. Por defecto se ejecutará en el puerto 8080.

## Variables de Entorno

- **PROJECT_ID:** Contiene información usada por el servicio de autenticación de Firebase y para conectarse con Firestore DB.
- **PRIVATE_KEY:** Contiene información usada por el servicio de autenticación de Firebase y para conectarse con Firestore DB.
- **CLIENT_EMAIL:** Contiene información usada por el servicio de autenticación de Firebase y para conectarse con Firestore DB.