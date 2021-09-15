const request = require('postman-request');

const url = "http://api.weatherstack.com/current?access_key=67cf0805e8f415b0029bf781148a9646&query=37.8267,-122.4233";

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.current)
})