const request = require("request");

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoic29oZWlsdHJhaW5lciIsImEiOiJja2JqNHl3NjcwbHRoMnNycGJ0OWJkY3ZuIn0.cKI_nmSxK1RklRr6IdNxmg&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach geocode services!", undefined);
    } else if (body.message) {
      callback(body.message, undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location! Try another search.", undefined);
    } else {
      const {center, place_name:location} = body.features[0];
      callback(undefined, {
        longitude: center[0],
        latitude: center[1],
        location,
      });
    }
  });
};

module.exports = geocode;