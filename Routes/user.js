import express from "express";
import UserControllers from "../Controllers/user.js";

const UserRouters = express.Router();
UserRouters.post("/", UserControllers.createUser);
UserRouters.get("/", UserControllers.getAllUser);
UserRouters.put("/:id", UserControllers.editUser);
UserRouters.delete("/:id", UserControllers.deleteUser);
UserRouters.post("/:id", UserControllers.Login);

export default UserRouters;
