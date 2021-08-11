module.exports = app => {
    const messages = require("../controllers/message.controller");
    const router = require("express").Router();
    const auth = require("../middleware/auth");
    const multer = require("../middleware/multer-config");

    // créer un nouveau message
    router.post("/", auth, multer, messages.create);

    // récupérer les nb dernières news
    router.get("/amount/:nb/news", auth, messages.findNewsByAmount);

    // récupérer les nb derniers messages
    router.get("/amount/:nb", auth, messages.findAllByAmount);

    // récupérer les messages jusqu'à date
    router.get("/date/:date", auth, messages.findAllByDate);

    // récupérer tous les message par userId
    router.get("/user/:userId", auth, messages.findAllByUser);

    // récupérer un message par id
    router.get("/:id", auth, messages.findOne);

    // mettre à jour un message par id
    router.put("/:id", auth, multer, messages.update);

    // effacer un message par id
    router.delete("/:id", auth, messages.delete);

    app.use("/api/messages", router);
};