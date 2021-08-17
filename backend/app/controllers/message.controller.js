/**
* @file Set of controllers containing the business logic of the message routes.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
const db = require("../models");
const Message = db.messages;
const User = db.users;
const Comment = db.comments;
const Feeling = db.feelings;
const LIKE = 1;
const DISLIKE = 2;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const fs = require('fs');

/** 
* Create a new message
* @param {any} req - Request
* @param {any} res - Response
*/
exports.create = async (req, res) => {

    // Creating a message
    const message = {
        picture: req.file ? `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}` : 'aucune',
        article: req.body.article,
        UserId: req.body.user_id
    }

    // Saving the message in the DB
    await Message.create(message)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la sauvegarde du message!"
            });
        });
};

/** 
* Get the last nb of news
* @param {any} req - Request
* @param {any} res - Response
*/
exports.findNewsByAmount = async (req, res) => {
    const nb = parseInt(req.params.nb, 10);
    let receptacles = [];

    // step 1: recovery of the "Messages" part of the News
    await Message.findAll({
        where: {
            UserId: {
                [Op.not]: null  // To avoid a server error if the author has deleted his/her account
            }
        },
        order: Sequelize.literal('createdAt DESC'),
        limit: nb
    })
        .then(async (partOne) => { 
            receptacles = partOne.map((element) => {
                return element.dataValues;
            });

            // step 2 : recovery of the "Users" part of the news
            for (let i = 0; i < receptacles.length; i++) {
                await User.findByPk(receptacles[i].UserId)
                    .then(partTwo => {
                        partTwo = partTwo.dataValues;
                        const pieceOfpartTwo = {
                            firstname: partTwo.firstname,
                            name: partTwo.name,
                            photo: partTwo.photo
                        };
                        receptacles[i] = Object.assign({}, receptacles[i], pieceOfpartTwo);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "erreur pendant la récupération de l'utilisateur"
                        });
                    });

                // step 3 : recovery of the "Comments" part of the news
                const partThree = await Comment.count({
                    where: {
                        MessageId: {
                            [Op.eq]: receptacles[i].id
                        },
                        UserId: {
                            [Op.not]: null  // To avoid counting the comment if the author has deleted his account
                        }
                    }
                });
                const pieceOfpartThree = {
                    nbComments: partThree
                };
                receptacles[i] = Object.assign({}, receptacles[i], pieceOfpartThree);

                // step 4 : recovery of the "Feelings" part of the news
                await Feeling.findAll({
                    attributes: ['UserId'],
                    where: {
                        [Op.and]: [
                            { MessageId: receptacles[i].id }, 
                            { CategoryId: LIKE }
                        ],
                        UserId: {
                            [Op.not]: null  // To avoid counting the comment if the author has deleted his account
                        }
                    }
                })
                    .then(data => {
                        data = data.map((element) => {
                            return element.dataValues.UserId;
                        });
                        const partFourL = {
                            usersLiked: data ? data : [],
                            likes: data.length ? data.length : 0
                        };
                        receptacles[i] = Object.assign({}, receptacles[i], partFourL);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "erreur pendant la récupération des likes!"
                        });
                    });
                await Feeling.findAll({
                    attributes: ['UserId'],
                    where: {
                        [Op.and]: [
                            { MessageId: receptacles[i].id }, 
                            { CategoryId: DISLIKE }
                        ],
                        UserId: {
                            [Op.not]: null  // To avoid counting the comment if the author has deleted his account
                        }
                    }
                })
                    .then(data => {
                        data = data.map((element) => {
                            return element.dataValues.UserId;
                        });
                        const partFourD = {
                            usersDisliked: data ? data : [],
                            dislikes: data.length ? data.length : 0
                        };
                        receptacles[i] = Object.assign({}, receptacles[i], partFourD);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "erreur pendant la récupération des likes!"
                        });
                    });
            }
            res.status(200).send(receptacles);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des messages!"
            });
        });
};

/** 
* Retrieve the last nb of messages
* @param {any} req - Request
* @param {any} res - Response
*/
exports.findAllByAmount = async (req, res) => {
    const nb = parseInt(req.params.nb, 10);

    await Message.findAll({
        order: Sequelize.literal('createdAt DESC'),
        limit: nb
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des messages!"
            });
        });
};

/** 
* Retrieve messages up to date
* @param {any} req - Request
* @param {any} res - Response
*/
exports.findAllByDate = async (req, res) => {
    const date = req.params.date;

    await Message.findAll({
        where: {
            createdAt: {
                [Op.lte]: date
            }
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des messages!"
            });
        });
};

/** 
* Retrieve all messages by userId
* @param {any} req - Request
* @param {any} res - Response
*/
exports.findAllByUser = async (req, res) => {
    const userId = req.params.userId;

    await Message.findAll({
        where: {
            UserId: {
                [Op.eq]: userId
            }
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des messages!"
            });
        });
};

/** 
* Retrieve a message by id
* @param {any} req - Request
* @param {any} res - Response
*/
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await Message.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la récupération du message n° ${id}`
            });
        });
};

/** 
* Update a message by id
* @param {any} req - Request
* @param {any} res - Response
*/
exports.update = async (req, res) => {
    const id = req.params.id;
    const message = {
        picture: req.file ? `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}` : req.body.picture,
        article: req.body.article
    }

    let info = '';
    if( req.file && (req.body.picture !== 'aucune') ) {   // we manage the deletion of the previous file before losing its trace
        const filename = req.body.picture.split('/images/')[1];
        fs.unlink(`app/images/${filename}`, (error) => {
            if (error) res.status(400).json({ error });
                else info = " et l'ancienne image a été supprimée";
        });
    }

    await Message.update(message, {
        where: {id: id}
    })
        .then( isUpdated => {
            if(isUpdated) {
                res.status(200).send({
                    message: `Le message n°${id} a été mise à jour${info}`
                });
            } else {
                res.status(400).send({
                    message: `Le message n°${id} n'a pas pu être mise à jour!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la mise à jour du message n° ${id}`
            });
        });
};

/** 
* Delete a message by id
* @param {any} req - Request
* @param {any} res - Response
*/
exports.delete = async (req, res) => {
    const id = req.params.id;
    let fileToDelete;

    // Process of searching the message image for later deletion
    await Message.findByPk(id)
        .then(data => {
            fileToDelete = data.picture;
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la recherche du message n° ${id}`
            });
        });

    await Message.destroy({
        where: {id: id }
    })
        .then( isDeleted => {
            if(isDeleted) {
                // Deleting this user's photo
                let info = '';
                if( fileToDelete !== 'aucune' && fileToDelete !== null) {
                    const filename = fileToDelete.split('/images/')[1];
                    fs.unlink(`app/images/${filename}`, (error) => {
                        if (error) res.status(400).json({ error });
                            else info = ", ainsi que l'image du message.";
                    });
                }

                res.status(200).send({
                    message: `Le message n°${id} a été effacé${info}`
                });
            } else {
                res.status(400).send({
                    message: `Le message n°${id} n'a pas pu être effacé!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression du message n° ${id}`
            });
        });
};