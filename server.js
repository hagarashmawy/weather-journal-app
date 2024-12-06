import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let projectData = {};
app.use(express.static("website"));
app.get("/api", function (req, res) {
  res.send(projectData);
});

app.post("/api", (req, res) => {
  const data = req.body;
  projectData = data;
  console.log(data);

  res.send({ reply: "Added it!" });
});

const port = 1995;
app.listen(port, () => {
  console.log(`Weather app listening on port ${port}`);
});
