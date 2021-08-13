/**
* @file Authentication middleware, intended for the protection of routes and verifying the validity of the token and the attached userId
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
require('dotenv').config();

const jwt = require('jsonwebtoken');

/** 
* Authentication middleware.
* @param {any} req
* @param {any} res
* @param {any} next
*/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw "Echec lors de l'authentification de l'identifiant";
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error : error | 'Requête non authentifiée !'});
    }
};