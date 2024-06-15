import app from '../app.js';
import postRouter from "./post-route.js";
import userRouter from "./user-route.js";
import commentRouter from "./comment-route.js";

const route = (app) =>{
    app.use("/posts",postRouter);
    app.use("/users",userRouter);
    app.use("/comments",commentRouter);
}

export default route;