/**
* @file All routes reported for users.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/

module.exports = app => {
    const users = require("../controllers/user.controller");
    const router = require("express").Router();
    const auth = require("../middleware/auth");
    const multer = require("../middleware/multer-config");

    // créer un nouvel utilisateur
    router.post("/", users.create);

    // identifier un utilisateur existant
    router.post("/identify", users.identify);

    // récupérer tous les utilisateurs
    router.get("/", auth, users.findAll);

    // récupérer un utilisateur par id
    router.get("/:id", auth, users.findOne);

    // mettre à jour un utilisateur par id
    router.put("/:id", auth, multer, users.update);

    // effacer un utilisateur par id
    router.delete("/:id", auth, users.delete);

    app.use("/api/users", router); 
};