import express, { Application } from "express";
import routes from "./routes";
import sequelize from "./sequelize";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true });
app.use("/", routes);

app.listen(8000, () => {
  console.log("Start");
});
