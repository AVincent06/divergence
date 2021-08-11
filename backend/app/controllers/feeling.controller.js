require('dotenv').config();

const jwt = require('jsonwebtoken');
const db = require("../models");
const Feeling = db.feelings;
const Op = db.Sequelize.Op;
const LIKE = 1;
const DISLIKE = 2;

// ajouter un like sur le message actuel
exports.addLike = async (req, res) => {
    const id = req.body.messageId;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;

    await Feeling.findOrCreate({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { UserId: userId },
                { CategoryId: LIKE }
            ]
        },
        defaults: {
            MessageId: id,
            UserId: userId,
            CategoryId: LIKE
        }
    })
        .then(([feeling, created]) => {
            if(created) { // Ajout du Like
                res.status(201).send({ 
                    message: "Un Like a été ajouté pour ce  message par cet utilisateur!" 
                });
                return;
            } else {
                res.status(403).send({ 
                    message: "Un seul Like autorisé par message pour un utilisateur!" 
                });
                return;
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "erreur pendant la recherche ou l'ajout du like!"
            });
        });
};

// ajouter un dislike sur le message actuel
exports.addDislike = async (req, res) => {
    const id = req.body.messageId;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;

    await Feeling.findOrCreate({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { UserId: userId },
                { CategoryId: DISLIKE }
            ]
        },
        defaults: {
            MessageId: id,
            UserId: userId,
            CategoryId: DISLIKE
        }
    })
        .then(([feeling, created]) => {
            if(created) { // Ajout du Dislike
                res.status(201).send({ 
                    message: "Un Dislike a été ajouté pour ce  message par cet utilisateur!" 
                });
                return;
            } else {
                res.status(403).send({ 
                    message: "Un seul Dislike autorisé par message pour un utilisateur!" 
                });
                return;
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "erreur pendant la recherche ou l'ajout du dislike!"
            });
        });
};

// récupérer tous les like pour le message par id
exports.findAllLike = async (req, res) => {
    const id = req.params.id;

    await Feeling.findAll({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { CategoryId: LIKE }
            ],
            UserId: {
                [Op.not]: null  // Pour éviter de compter les likes dont l'auteur a supprimé son compte
            }
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des likes!"
            });
        });
};

// récupérer tous les dislike pour le message par id
exports.findAllDislike = async (req, res) => {
    const id = req.params.id;

    await Feeling.findAll({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { CategoryId: DISLIKE }
            ],
            UserId: {
                [Op.not]: null  // Pour éviter de compter les likes dont l'auteur a supprimé son compte
            }
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des dislikes!"
            });
        });
};

// effacer un like sur le message par id
exports.delLike = async (req, res) => {
    const id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;

    await Feeling.destroy({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { UserId: userId },
                { CategoryId: LIKE }
            ]
        }
    })
        .then( isDeleted => {
            if(isDeleted) {
                res.status(200).send({
                    message: `Le like de l'utilisateur n°${userId} a été retiré!`
                });
            } else {
                res.status(400).send({
                    message: `Le like de l'utilisateur n°${userId} n'a pas été retiré!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression du like de l'utilisateur n° ${userId}`
            });
        });
};

// effacer un dislike sur le message par id
exports.delDislike = async (req, res) => {
    const id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;

    await Feeling.destroy({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { UserId: userId },
                { CategoryId: DISLIKE }
            ]
        }
    })
        .then( isDeleted => {
            if(isDeleted) {
                res.status(200).send({
                    message: `Le dislike de l'utilisateur n°${userId} a été retiré!`
                });
            } else {
                res.status(400).send({
                    message: `Le dislike de l'utilisateur n°${userId} n'a pas été retiré!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression du dislike de l'utilisateur n° ${userId}`
            });
        });
};