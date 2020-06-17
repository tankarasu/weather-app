const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address.toLowerCase()
  )}.json?access_token=pk.eyJ1IjoidGFua2FyYXN1IiwiYSI6ImNrYXI4NG1sdDAycmQycm1va2gwemNub2kifQ.hKafTF1VbvnwDihM-7R8Fw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to the location service", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location. Try another one", undefined);
    } else {
      const [long, lat] = body.features[0].center;
      callback(undefined, {
        location: body.features[0].place_name,
        long,
        lat,
      });
    }
  });
};

module.exports = geoCode;
