import express from "express";
import ApiUserController from "../../../controllers/api_user_controller.mjs";
const apiuserRouter = express.Router();
apiuserRouter.get("/users", ApiUserController.index);
apiuserRouter.get("/users/:id", ApiUserController.show);
apiuserRouter.delete("/users/:id", ApiUserController.destroy);
apiuserRouter.post("/users", ApiUserController.create);

export default apiuserRouter;