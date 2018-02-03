# JASYP_C4P
Aplicación para gestionar las solicitudes para las JASYP

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

Nota: la vista de la aplicación está configurada para funcionar detrás de un proxy inverso que responda las solicitudes de `$HOST/jasyp_app/$ROUTE`.
