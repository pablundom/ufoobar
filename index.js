let express = require('express');
let path = require('path');
let router = require('./routes');
let api = require('./api');
let app = express();
let mongo = require('./mongoclient');
let bodyParser = require('body-parser');

// Configuración

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/public'));
app.use(bodyParser.json());

// Declaracion de namespaces de rutas
app.use(api);
app.use('/',router);


mongo.connect(()=>{
    console.log("connected");
    app.listen('3000');
});

module.exports = app;