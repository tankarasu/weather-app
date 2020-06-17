const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3e18e0abacd9aaeb335d8f61f4e26321&query=${lat},${long}`;

  request({  url, json: true }, (err, data) => {
    if (err) {
      callback("unable to connect to weather service", undefined);
    } else if (data.body.error) {
      callback("unable to find Location", undefined);
    } else {
      const { current } = data.body;
      callback(
        undefined,
        `${current.weather_descriptions} .it's ${current.temperature} C° out and feel like ${current.feelslike} C°`
      );
    }
  });
};

module.exports = forecast;
