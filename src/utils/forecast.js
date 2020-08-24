const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric&appid=307142e1c32c77daed909b7477efce4f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach forecast services!", undefined);
    } else if (body.message) {
      callback("Unable to find location!", undefined);
    } else {
      const {weather, main, name:location, clouds} = body;
      callback(undefined, {
          forecast: weather[0].description,
          temperature: main.temp,
          location,
          cloud_percent: clouds.all
      });
    }
  });
};

module.exports = forecast;
