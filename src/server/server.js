const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { getcityloc } = require("./Location");
const { getweather } = require("./weather");
const { getCitypic } = require("./picture");

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("dist"));
app.use(cors());
//const username = "nancysawalmeh" ;
const username  = process.env.name;
const weather_key = process.env.WEATHER_KEY;
const pixabay_key = process.env.PIXABAY_KEY;
const port = 8000;
console.log(username);
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/getCity", async (req, res) => {
  const { city } = req.body;
  const Location = await getcityloc(city,username);
  res.send(Location);
  console.log(Location);
});

app.post("/getweather", async (req, res) => {
  console.log(req.body);
  const { lat, lng, radya } = req.body;
  const Weather = await getweather(lat, lng, radya, weather_key);
  res.send(Weather);
});

app.post("/getCitypic", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const Picture = await getCitypic(name, pixabay_key);
  res.send(Picture);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));