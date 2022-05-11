const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const rotas_registradas = {};
var rota_id = 0;

app.get('/registro', (req, res) => {
    res.send(rotas_registradas);
});

app.get('/registro/:id', (req, res) => {
    res.send(rotas_registradas[req.params.id]);
});

app.post('/registro', (req, res) => {
    rota_id++;
    const {posto_origem} = req.body;
    const {posto_destino} = req.body;
    const {tempo_de_deslocamento} = req.body;
    const {status_rota} = req.body;
    rotas_registradas[rota_id] = {
        rota_id,
        posto_origem,
        posto_destino,
        tempo_de_deslocamento,
        status_rota
    }
    res.status(200).send(rotas_registradas[rota_id]);
});

app.post('/registro/update/:id', (req, res) => {
    var temp = rota_id;
    rota_id = req.params.id;
    const {posto_origem} = req.body;
    const {posto_destino} = req.body;
    const {tempo_de_deslocamento} = req.body;
    const {status_rota} = req.body;
    rotas_registradas[req.params.id] = {
        rota_id,
        posto_origem,
        posto_destino,
        tempo_de_deslocamento,
        status_rota
    }
    res.status(200).send(rotas_registradas[rota_id]);
    rota_id = temp;
});

app.listen(4000, () => {
    console.log('Registro de rotas. Porta 4000.');
});