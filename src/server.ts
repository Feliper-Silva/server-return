import { routes } from "./routes";
import express from "express";
import cors from "cors";

const app = express();
const port = 3333;
const server = "http://localhost";

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running ${server}:${port}|| ${process.env.PORT}`);
});
