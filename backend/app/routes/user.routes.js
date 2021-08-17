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

    // Create a new user
    router.post("/", users.create);

    // Identify an existing user
    router.post("/identify", users.identify);

    // Retrieve all users
    router.get("/", auth, users.findAll);

    // Retrieve a user by id
    router.get("/:id", auth, users.findOne);

    // Update a user by id
    router.put("/:id", auth, multer, users.update);

    // Delete a user by id
    router.delete("/:id", auth, users.delete);

    app.use("/api/users", router); 
};