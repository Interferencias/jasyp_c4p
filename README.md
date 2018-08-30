# Interferencias C4P
Aplicación para gestionar call for papers

### Instalación

```
npm install
```

### Modo debug

Funcionamiento a través de **nodemon**.

```
npm run debug
```

### Modo producción

Funcionamiento a través de **PM2**.

```
npm start
```

Nota: la vista de la aplicación está configurada para funcionar detrás de un proxy inverso que responda las solicitudes de `$HOST/$app_name/$ROUTE`, siendo `$app_name` el valor en `config\sequelize.js`.
