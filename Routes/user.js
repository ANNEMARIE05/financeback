import  express  from "express";
import user from "../Controllers/user.js";

const UserRouters = express.Router()
UserRouters.post("/user", user.createUser)
UserRouters.get("/user", user.getAllUsers)
UserRouters.put("/user/:id", user.editUser)
UserRouters.delete("/user/:id", user.deleteUser)

export default UserRouters