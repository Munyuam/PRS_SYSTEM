import express from "express";
import route from "./routes/route.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
