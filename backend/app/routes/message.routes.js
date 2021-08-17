/**
* @file All routes reported for messages.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/

module.exports = app => {
    const messages = require("../controllers/message.controller");
    const router = require("express").Router();
    const auth = require("../middleware/auth");
    const multer = require("../middleware/multer-config");

    // Create a new message
    router.post("/", auth, multer, messages.create);

    // Get the last nb of news
    router.get("/amount/:nb/news", auth, messages.findNewsByAmount);

    // Retrieve the last nb of messages
    router.get("/amount/:nb", auth, messages.findAllByAmount);

    // Retrieve messages up to date
    router.get("/date/:date", auth, messages.findAllByDate);

    // Retrieve all messages by userId
    router.get("/user/:userId", auth, messages.findAllByUser);

    // Retrieve a message by id
    router.get("/:id", auth, messages.findOne);

    // Update a message by id
    router.put("/:id", auth, multer, messages.update);

    // Delete a message by id
    router.delete("/:id", auth, messages.delete);

    app.use("/api/messages", router);
};