# CREAR PROYECTO

npm i -g npm@8.15.1
npm i -g typescript
npm i -g react
npm view react version
npm i create-react-app

npx create-react-app rts02 --template typescript

npm i bootstrap
npm i @fortawesome/fontawesome-free
npm i react-router-dom
npm i react-bootstrap

# Icon

#Instalar librerias básicas
Bootstrap y fontawesome

npm i boostrap
npm i @fortawesome/fontawesome-free
npm i react-bootstrap
npm i react-router-dom

# Esto va dentro de package.json en el apartado de script. Es para modificar el puerto.

"start": "set PORT=8088 && react-scripts start",


# Incluya las librerias del proyecto dentro de index.tsx

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.css";