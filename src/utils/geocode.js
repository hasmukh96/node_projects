const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaGFzbXVraHN1dGhhciIsImEiOiJja3Vjam9wazYxMTU4MndvZHB6N3ZqeHdpIn0.G3W3_NDfblB7c6y_9kiNXg";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Cannot connect to the server", undefined);
    } else if (response.body.message) {
      callback("wrong input", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        Place: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = {
  geocode,
};
