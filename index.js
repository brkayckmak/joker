import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const baseURL = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  try {
    const jokeCategory = req.body.jokeCategory;
    const jokeType = req.body.jokeType;
    const jokeRes = await axios.get(
      baseURL + jokeCategory + "?type=" + jokeType
    );
    switch (jokeType) {
      case "single":
        const joke = jokeRes.data.joke;
        res.render("index.ejs", { joke: joke });

      case "twopart":
        const setup = jokeRes.data.setup;
        const delivery = jokeRes.data.delivery;
        res.render("index.ejs", { setup: setup, delivery: delivery });
    }
  } catch (error) {
    res.status(500);
  }
});

app.listen(port, (res, req) => {
  console.log(`Server started on port ${port}`);
});
