//core modules
const path = require("path");

//variables Globales
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const express = require("express");
const hbs = require("hbs");
const app = express();

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
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", name: "Andrew Mead" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help Page",
    name: "Andrew Mead",
    message: "this is the message",
  });
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

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You Must Provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Andrew Mead",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Andrew Mead",
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log(`Connected to server on port:3000`);
});
