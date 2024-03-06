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
router.get("/views/update", (req, res) => {
  res.render("update");
});
router.get("/views/delete", (req, res) => {
  res.render("delete");
});

router.post("/views/create", (req, res) => {
  const { filename, content } = req.body;
  const filePath = `${__dirname}/file-manager-project/../data/${filename}.txt`;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.redirect("/");
  });
});

router.post("/views/update", (req, res) => {
  const { oldFilename, newFilename } = req.body;
  const oldFilePath = `${__dirname}/file-manager-project/../data/${oldFilename}.txt`;
  const newFilePath = `${__dirname}/file-manager-project/../data/${newFilename}.txt`;

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
      res.status(500).send("Invalid entry");
      return;
    }
    res.redirect("/");
  });
});

router.post("/views/delete", (req, res) => {
  const { filename } = req.body;
  const filePath = `${__dirname}/file-manager-project/../data/${filename}.txt`;

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      res.status(500).send("Invalid entry");
      return;
    }
    res.redirect("/");
  });
});

module.exports = router;
