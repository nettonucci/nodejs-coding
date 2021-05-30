const express = require('express');
const routes = express.Router();

const LaboratorioController = require('../app/Controllers/Http/LaboratorioController');



    routes.get('/laboratorios/listActive', LaboratorioController.list);
    routes.get('/laboratorios/show/:id', LaboratorioController.show);
    routes.post('/laboratorios/create', LaboratorioController.create);
    routes.put('/laboratorios/update/:id', LaboratorioController.update);
    routes.delete('/laboratorios/delete/:id', LaboratorioController.delete);




module.exports = routes;