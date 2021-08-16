/**
* @file All routes reported for feelings.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/

module.exports = app => {
    const feelings = require("../controllers/feeling.controller");
    const router = require("express").Router();
    const auth = require("../middleware/auth");

    // ajouter un like sur le message actuel
    router.post("/like", auth, feelings.addLike);

    // ajouter un dislike sur le message actuel
    router.post("/dislike", auth, feelings.addDislike);

    // récupérer tous les like pour le message par id
    router.get("/like/:id", auth, feelings.findAllLike);

    // récupérer tous les dislike pour le message par id
    router.get("/dislike/:id", auth, feelings.findAllDislike);

    // effacer un like sur le message par id
    router.delete("/like/:id", auth, feelings.delLike);

    // effacer un dislike sur le message par id
    router.delete("/dislike/:id", auth, feelings.delDislike);

    app.use("/api/feelings", router);
};