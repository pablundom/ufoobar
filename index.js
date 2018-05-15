let express = require('express');
let path = require('path');
let router = require('./routes');
let api = require('./api');
let app = express();

// Configuración

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/public'));

// Declaracion de namespaces de rutas

app.use('/',router);
app.use('/api',api);

// Bootstrap del server
app.listen('3000');

module.exports = app;