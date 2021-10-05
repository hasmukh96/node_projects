const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

app = express();

staticDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(staticDirectoryPath));

app.get("", (req, res) => {
  res.send("<h1>Hello Express!<h1>");
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({ error: "Please enter valid Location" });
  }

  geocode.geocode(
    req.query.location,
    (error, { longitude, latitude, place } = {}) => {
      if (error) {
        return res.send({ err: error });
      }
      console.log(place);
      forecast.forecast(longitude, latitude, (error, data) => {
        if (error) {
          return res.send("there is some error");
        }

        res.send({
          Temperature: data.temp,
          FeelsLike: data.feel,
          Address: req.query.location,
        });

        console.log(data);
      });
    }
  );

  //   res.send({
  //     address: req.query.location,
  //   });
});

app.listen(3000, () => {
  console.log("web server is up");
});
