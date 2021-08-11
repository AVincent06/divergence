module.exports = app => {
    const comments = require("../controllers/comment.controller");
    const router = require("express").Router();
    const auth = require("../middleware/auth");

    // créer un nouveau commentaire
    router.post("/", auth, comments.create);

    // récupérer tous les commentaires du message par messageId
    router.get("/message/:messageId", auth, comments.findAllByMessage);

    // récupérer un commentaire par id
    router.get("/:id", auth, comments.findOne);

    // mettre à jour un commentaire par id
    router.put("/:id", auth, comments.update);

    // effacer un commentaire par id
    router.delete("/:id", auth, comments.delete);

    app.use("/api/comments", router);
};