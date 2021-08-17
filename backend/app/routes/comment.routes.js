/**
* @file All routes reported for comments.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/

module.exports = app => {
    const comments = require("../controllers/comment.controller");
    const router = require("express").Router();
    const auth = require("../middleware/auth");

    // Create a new comment
    router.post("/", auth, comments.create);

    // Retrieve all message comments by messageId
    router.get("/message/:messageId", auth, comments.findAllByMessage);

    // Retrieve a comment by id
    router.get("/:id", auth, comments.findOne);

    // Update a comment by id
    router.put("/:id", auth, comments.update);

    // Delete a comment by id
    router.delete("/:id", auth, comments.delete);

    app.use("/api/comments", router);
};