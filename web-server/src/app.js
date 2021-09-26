const path = require("path");
const express = require("express");
const hbs = require('hbs')

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");  //<--access the HTML page
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

 //Then setup handlebars engine and views location   
 app.set("view engine", "hbs")  //having a template like header&footer for pages
 app.set('views', viewsPath) 
 hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


// This is how to create html tags/serve JSON, etc
// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: 'Welcome',
    name: 'Pius King'
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Pius Henry'
  })
})

app.get('/weather', (req, res) => {
  res.send('/weather', {
    forecast: 'It is snowing',
    location: 'Philadelphia'
  })
})

app.get('/help/*', (req, res) => {  //setting what will happen when a wrong page address is used in the help directory
  res.render("404", {
    title: "Error!",
    name: 'Henry Pio',
    errorMessage: "Help page not found",
  });
})

app.get('*', (req, res) => {
  res.render("404", {
    title: "Error!",
    name: "Henry Pio",
    errorMessage: "Page not found",
  });
})

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
