import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.route("/")
    .post(userController.post) 
    .get(userController.index)
//defining routes for managing users by their objectid
router.route("/:id")
    .get(userController.find)
    .patch(userController.patch)
router.route("/auth/:authID") //route for getting user by authID
    .get(userController.findByAuthID);
export default router;