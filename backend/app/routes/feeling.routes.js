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

    // Add a like on the current message
    router.post("/like", auth, feelings.addLike);

    // Add a dislike to the current post
    router.post("/dislike", auth, feelings.addDislike);

    // Get all likes for the message by id
    router.get("/like/:id", auth, feelings.findAllLike);

    // Get all dislikes for the post by id
    router.get("/dislike/:id", auth, feelings.findAllDislike);

    // Delete a like on the message by id
    router.delete("/like/:id", auth, feelings.delLike);

    // Delete a dislike on the message by id
    router.delete("/dislike/:id", auth, feelings.delDislike);

    app.use("/api/feelings", router);
};