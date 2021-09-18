const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=67cf0805e8f415b0029bf781148a9646&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, response) => {
        if (error) {
        callback("Unable to connect to weather services", undefined);
        } else if (response.body.error) {
        callback("Unable to find location", undefined);
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
        }
    })
}


module.exports = forecast