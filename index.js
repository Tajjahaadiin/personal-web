const express = require("express");
const path = require("path");
const hbs = require("hbs");
const {
  renderHome,
  renderProject,
  renderTestimonial,
  renderContact,
  renderHandle,
} = require("./controllers/controllers");

const app = express();
const port = 5000;

// handlebars declaration
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a == b;
});

// static path/ static file
app.set("views", path.join(__dirname, "./views"));
app.use("/assets", express.static(path.join(__dirname, "./assets")));

// middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Rendering
app.get("/", renderHome);
app.get("/project", renderProject);
app.get("/testimonial", renderTestimonial);
app.get("/contact", renderContact);
app.get("*", renderHandle);

app.listen(port, () => {
  console.log(`app running sucessfully on port: ${port}`);
});
