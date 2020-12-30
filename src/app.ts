import express, { Application, Request, Response } from "express";

import formData from "express-form-data";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(formData.parse());
app.use(bodyParser.json());

//Module Routes
app.use(require("./routes/Category"));
app.use(require("./routes/Participants"));
app.use(require("./routes/Scoreboard"));

app.listen(5000, () => console.log("Server Running"));
