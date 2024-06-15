import express from "express";
import User from './../models/user.js'
import * as postController from "../controllers/post-controller.js";

const router = express.Router();

router.route("/")
    .post(postController.post) 
    .get(postController.index)
router.route("/type/:postType") //route for filtering by criteria
    .get(postController.filterByType);
//defining routes for managing posts by their id
router.route("/:id")
    .get(postController.find)
    .patch(postController.patch)
    .delete(postController.remove)


export default router;