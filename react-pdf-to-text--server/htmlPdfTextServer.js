const express = require("express");
const app = express();
const upload = require("express-fileupload");
const extract = require("pdf-text-extract");
const path = require("path");

app.use(upload());

app.post("/upload", (req, res) => {
  if (req.files) {
    let file = req.files.filename;
    let filename = file.name;
    file.mv("./upload/" + filename, err => {
      if (err) {
        console.log("err", err);
        res.send("error occured", err);
      } else {
        console.log("Done!");
        console.log("file", file);
        console.log("filename", filename);
        let filePath = path.join(__dirname, "upload/" + filename);
        extract(filePath, { splitPages: false }, function(err, text) {
          if (err) {
            console.dir(err);
            return;
          }
          console.dir(text);
        });
      }
    });
  }
});

app.listen(5000, () => {
  console.log("listening on 5000");
});
