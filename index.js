import express from "express";
import axios from "axios";
import { URLSearchParams } from "url";
const app = express();
const port = 3000;

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { translation: null, error: null });
});

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", "en");
  encodedParams.set("target_language", "fr");
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "d2d0ea2c86mshc9472dbbc9ad749p1aad43jsnf3cf81d9b1a3",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    res.render("index", {
      translation: response.data.data.translatedText,
      error: null,
    });
  } catch (error) {
    res.render("index", { translation: null, error: "Error in data!!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
