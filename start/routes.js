const express = require('express');
const routes = express.Router();

const LaboratorioController = require('../app/Controllers/Http/LaboratorioController');
const ExameController = require('../app/Controllers/Http/ExameController');
const AssociacaoController = require('../app/Controllers/Http/AssociacaoController');


    //Laboratorios
    routes.get('/laboratorios/listActive', LaboratorioController.list);
    routes.get('/laboratorios/show/:id', LaboratorioController.show);
    routes.post('/laboratorios/create', LaboratorioController.create);
    routes.post('/laboratorios/createInBatch', LaboratorioController.createInBatch);
    routes.put('/laboratorios/update/:id', LaboratorioController.update);
    routes.put('/laboratorios/updateInBatch', LaboratorioController.updateInBatch);
    routes.delete('/laboratorios/delete/:id', LaboratorioController.delete);
    routes.delete('/laboratorios/deleteInBatch', LaboratorioController.deleteInBatch);

    //Exames
    routes.get('/exames/listActive', ExameController.list);
    routes.get('/exames/show/:id', ExameController.show);
    routes.get('/exames/showByName/:name', ExameController.showByName);
    routes.post('/exames/create', ExameController.create);
    routes.post('/exames/createInBatch', ExameController.createInBatch);
    routes.put('/exames/update/:id', ExameController.update);
    routes.put('/exames/updateInBatch', ExameController.updateInBatch);
    routes.delete('/exames/delete/:id', ExameController.delete);
    routes.delete('/exames/deleteInBatch', ExameController.deleteInBatch);

    //Associação
    routes.post('/associacao/create', AssociacaoController.create)
    routes.post('/associacao/createInBatch', AssociacaoController.createInBatch)
    routes.delete('/associacao/delete/:id', AssociacaoController.delete);
    routes.delete('/associacao/deleteInBatch', AssociacaoController.deleteInBatch);




module.exports = routes;