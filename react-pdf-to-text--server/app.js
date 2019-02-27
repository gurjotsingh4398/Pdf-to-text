const express = require("express");
const app = express();
const upload = require("express-fileupload");
const extract = require("pdf-text-extract");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(upload());

app.post("/upload", (req, res) => {
  if (req.files) {
    console.log(req.files);
    let file = req.files.file;
    let filename = req.files.file.name;
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
          res.send(text);
        });
      }
    });
  }
});

app.listen(5000, () => {
  console.log("listening on 5000");
});
