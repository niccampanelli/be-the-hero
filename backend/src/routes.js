const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const incidentController = require('./controllers/incidentController');
const ongController = require('./controllers/ongController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.get('/ongs', ongController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2)
    })
}),ongController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.index);
routes.post('/incidents',   celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),
                            celebrate({

    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        title: Joi.string().required().min(5),
        description: Joi.string().required().min(5),
        value: Joi.number().required().min(1),
    })
}), incidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);

routes.post('/session', sessionController.create);

module.exports = routes;