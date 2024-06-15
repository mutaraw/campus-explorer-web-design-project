import express from "express";
import * as commentController from "../controllers/comment-controller.js";

const router = express.Router();

router.route("/")
    .post(commentController.post) 
router.route("/:id") //route for getting all comments by post
    .get(commentController.index)
router.route("/comment/:id") //route for managing specific comment by its id
    .get(commentController.find)
    .delete(commentController.remove)


export default router;