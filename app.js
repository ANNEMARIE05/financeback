import { ConnectDB } from "./Config/db.js";
import express from "express";
import cors from "cors";
import UserRouters from "./Routes/user.js";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.bnjour);

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.use("/api", UserRouters)

ConnectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});
