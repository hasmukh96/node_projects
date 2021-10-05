const request = require("request");

forecast = (long, lat, callback) => {
  url =
    "http://api.weatherstack.com/current?access_key=481025ce77f8502997d47e8c81a4c0ab&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Network not working", undefined);
    } else {
      callback(undefined, {
        temp: response.body.current.temperature,
        feel: response.body.current.feelslike,
      });
    }
  });
};

module.exports = {
  forecast,
};
