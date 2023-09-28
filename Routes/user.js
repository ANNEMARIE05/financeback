import express from "express";
import UserControllers from "../Controllers/user.js";

const UserRouters = express.Router();
UserRouters.post("/register", UserControllers.createUser);
UserRouters.get("/", UserControllers.getAllUser);
UserRouters.put("/:id", UserControllers.editUser);
UserRouters.delete("/:id", UserControllers.deleteUser);
UserRouters.post("/login", UserControllers.Login);

export default UserRouters;



// {
//     "username":"emmanou",
//     "email":"emmanou@gmail.com",
//     "contact":"011212122",
//     "password":"9012"
//   }