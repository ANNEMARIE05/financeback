import { ConnectDB } from "./Config/db.js";
import express from "express";
import cors from "cors";
import UserRouters from "./Routes/user.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = 3000;

const app = express();
app.use(express.json());
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRouters);

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  
  // 
  // 