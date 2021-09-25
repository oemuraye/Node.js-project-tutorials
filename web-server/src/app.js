const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");  //access the HTML page




// app.set("views", path.join(__dirname, "views"));
// app.engine("html", require("hbs").renderFile);
app.set("view engine", "hbs")  //having a template like header&footer for pages
app.use(express.static(publicDirectoryPath));


// This is how to create html tags/serve JSON, etc
// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
