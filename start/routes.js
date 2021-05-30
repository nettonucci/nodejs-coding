const express = require('express');
const routes = express.Router();

const LaboratorioController = require('../app/Controllers/Http/LaboratorioController');
const ExameController = require('../app/Controllers/Http/ExameController');



    routes.get('/laboratorios/listActive', LaboratorioController.list);
    routes.get('/laboratorios/show/:id', LaboratorioController.show);
    routes.post('/laboratorios/create', LaboratorioController.create);
    routes.put('/laboratorios/update/:id', LaboratorioController.update);
    routes.delete('/laboratorios/delete/:id', LaboratorioController.delete);

    routes.get('/exames/listActive', ExameController.list);
    routes.get('/exames/show/:id', ExameController.show);
    routes.post('/exames/create', ExameController.create);
    routes.put('/exames/update/:id', ExameController.update);
    routes.delete('/exames/delete/:id', ExameController.delete);




module.exports = routes;