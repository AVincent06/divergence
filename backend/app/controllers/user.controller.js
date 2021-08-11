require('dotenv').config();

const passwordValidator = require('password-validator');//A2:2017 OWASP
const bcrypt = require('bcrypt');                       //A2:2017 OWASP
const emailValidator = require("email-validator");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// créer un nouvel utilisateur
exports.create = (req, res) => {
    // Création d'un schéma pour le mot de passe
    const schema = new passwordValidator();
    schema
        .is().min(12)
        .is().max(64)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces();
    const emailValidated = emailValidator.validate(req.body.email);
    const passwordValidated = schema.validate(req.body.password);
    
    let feedback1 = '';
    let feedback2 = '';
    if(!emailValidated) feedback1 = 'Format email non valide. ';
    if(!passwordValidated) feedback2 = 'Pour valider le password il faut entre 12 et 64 caractères sans espace et au moins une majuscule, une minuscule et un chiffre';

    if(emailValidated && passwordValidated) { 
        bcrypt.hash(req.body.password, 10)
            .then(async (hash) => {
                // Création d'un utilisateur
                const user = {
                    firstname: req.body.firstname,
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    is_admin: req.body.is_admin ? req.body.is_admin : false,
                    photo: 'aucune'
                }
                // Sauvegarde de l'utilisateur dans la BDD
                await User.create(user)
                    .then(data => {
                        res.status(201).send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "erreur pendant la création de l'utilisateur!"
                        });
                    });
            })
            .catch((error) => res.status(500).json({ error }));
    }else{
        res.status(500).json({ error : feedback1+feedback2 });
    }
}; 

// identifier un utilisateur existant
exports.identify = async (req, res) => {
    await User.findOne({
        where: {email : req.body.email}
    })
        .then((data) => {
            bcrypt.compare(req.body.password, data.password)
                .then((valid) => {
                    if(!valid) return res.status(401).json({ error : 'mot de passe incorrect !'});
                    res.status(200).json({
                        userId: data.id,
                        isAdmin: data.is_admin, 
                        token: jwt.sign(
                            { userId : data.id },
                            process.env.TOKEN_KEY,
                            { expiresIn : process.env.TOKEN_DURATION }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error: 'erreur de vérification du mot de passe' }));
        })
        .catch((error) => res.status(401).json({ error : 'utilisateur non trouvé !'}));   
};

// récupérer tous les utilisateurs
exports.findAll = async (req, res) => {
    await User.findAll({
        attributes: ['id', 'photo', 'name', 'firstname', 'bio'],
        order: [
            ['firstname','ASC'],
            ['name','ASC']
        ]
      })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des utilisateurs!"
            });
        }); 
};

// récupérer un utilisateur par id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await User.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la récupération de l'utilisateur n° ${id}`
            });
        });
};

// mettre à jour un utilisateur par id
exports.update = async (req, res) => { 
    const id = req.params.id;
    const user = {
        firstname: req.body.firstname,
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio,
        photo: req.file ? `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}` : req.body.photo,
        //password: req.body.password,
        //is_admin: req.body.is_admin
    }
    
    let info = '';
    if( req.file && (req.body.photo !== 'aucune') ) {   // on gère l'effacement du fichier précedent avant de perdre sa trace
        const filename = req.body.photo.split('/images/')[1];
        fs.unlink(`app/images/${filename}`, (error) => {
            if (error) res.status(400).json({ error });
                else info = " et l'ancienne image a été supprimée";
        });
    }

    await User.update(user, {
        where: {id: id}
    })
        .then( isUpdated => {
            if(isUpdated) {
                res.status(200).send({
                    message: `L'utilisateur n°${id} a été mise à jour${info}`
                });
            } else {
                res.status(400).send({
                    message: `L'utilisateur n°${id} n'a pas pu être mise à jour!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la mise à jour de l'utilisateur n° ${id}`
            });
        });
};

// effacer un utilisateur par id
exports.delete = async (req, res) => {
    const id = req.params.id;
    let fileToDelete;

    // Processus de recherche de l'image de profil pour la suppression ultérieur
    await User.findByPk(id)
        .then(data => {
            fileToDelete = data.photo; 
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la recherche de l'utilisateur n° ${id}`
            });
        });

    await User.destroy({
        where: {id: id }
    })
        .then( isDeleted => {
            if(isDeleted) {
                // Suppression de la photo de cet utilisateur
                let info = '';
                if( fileToDelete !== 'aucune' && fileToDelete !== null) {
                    const filename = fileToDelete.split('/images/')[1];
                    fs.unlink(`app/images/${filename}`, (error) => {
                        if (error) res.status(400).json({ error });
                            else info = ", ainsi que sa photo de profil.";
                    });
                }

                res.status(200).send({
                    message: `L'utilisateur n°${id} a été effacé${info}`
                });
            } else {
                res.status(403).send({
                    message: `L'utilisateur n°${id} n'a pas pu être effacé!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression de l'utilisateur n° ${id}`
            });
        });
}; 