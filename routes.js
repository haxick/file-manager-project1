const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Route for listing all files
router.get("/", (req, res) => {
  // Read files in the data directory
  fs.readdir("./data", (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("index", { files });
  });
});

// Route for viewing file content
router.get("/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../data", filename);
  console.log("File Path:", filePath);

  // Read file content
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(404).send("File Not Found");
      return;
    }
    res.render("detail", { filename, content: data });
  });
});

// Route for handling file creation form
// Route for rendering the file creation form
router.get("/views/create", (req, res) => {
  res.render("create");
});

router.post("/views/create", (req, res) => {
  const { filename, content } = req.body;
  const filePath = `${__dirname}/../data/${filename}.txt`;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.redirect("/");
  });
});

module.exports = router;
