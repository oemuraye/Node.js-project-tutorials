const request = require('postman-request');
const chalk = require('chalk')

const url = "http://api.weatherstack.com/current?access_key=67cf0805e8f415b0029bf781148a9646&query=37.8267,-122.4233&units=f";

const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoib2VtdXJheWUiLCJhIjoiY2t0bnBzM3BvMDU1MTJxcWk2NXNiMWI0NCJ9.kMeyAmQoWkVl4Z0XQjhV1A&limit=1";

request({ url: url, json: true }, (error, response) => {
    if (error) {
        console.log(chalk.red("Unable to connect to weather services"));
    } else if (response.body.error) { 
        console.log('Unable to find location')
    } else {
      // const data = JSON.parse(response.body)
      console.log(
        response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " degrees out. It feels like " +
          response.body.current.feelslike +
          " degrees out."
      );
      //with chalk it can be styled
      console.log(
        response.body.current.weather_descriptions[0] +
          chalk.green(". It is currently ") +
          chalk.blue(response.body.current.temperature) +
          chalk.green(" degrees out. It feels like ") +
          chalk.blue(response.body.current.feelslike) +
          chalk.green(" degrees out.")
      );
    }
})


request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
        console.log(chalk.red('Unable to connect to location service'))
    } else if (response.body.features.length === 0) {
        console.log(chalk.red('Unable to find location, try another location'))
    } else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log(latitude, longitude);
    }
})