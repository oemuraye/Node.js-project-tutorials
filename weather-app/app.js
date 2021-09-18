const request = require('postman-request');
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// const url = "http://api.weatherstack.com/current?access_key=67cf0805e8f415b0029bf781148a9646&query=37.8267,-122.4233&units=f";

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log(chalk.red("Unable to connect to weather services"));
//     } else if (response.body.error) { 
//         console.log('Unable to find location')
//     } else {
//       // const data = JSON.parse(response.body)
//       console.log(
//         response.body.current.weather_descriptions[0] +
//           ". It is currently " +
//           response.body.current.temperature +
//           " degrees out. It feels like " +
//           response.body.current.feelslike +
//           " degrees out."
//       );
//       //with chalk it can be styled
//       console.log(
//         response.body.current.weather_descriptions[0] +
//           chalk.green(". It is currently ") +
//           chalk.blue(response.body.current.temperature) +
//           chalk.green(" degrees out. It feels like ") +
//           chalk.blue(response.body.current.feelslike) +
//           chalk.green(" degrees out.")
//       );
//     }
// })



geocode("Nigeria", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});




//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



forecast(8.10530640960786, 9.59395988695573, (error, data) => {
  console.log("Error!", error);
  console.log("Data:", data);
});