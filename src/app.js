//core modules
const path = require("path");

//variables Globales
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const express = require("express");
const hbs = require("hbs");
const app = express();

const port = process.env.PORT || 3000;

//PATHS for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//SetUp views Engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//middlewares
app.use(express.static(publicDirectoryPath));

//Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tan KARASU",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", name: "Tan KARASU" });
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "You must provide an Adress",
    });
  }

  geoCode(req.query.adress, (error, { lat, long, location } = {}) => {
    if (error) return res.send({ error });

    forecast(lat, long, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location,
        adress: req.query.adress,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Tan KARASU",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Connected to server on port:${port}`);
});
