const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/data", express.static(path.join(__dirname, "data")));
app.use("/views", express.static(path.join(__dirname, "views")));
// Use routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
