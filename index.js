const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;
const shell = require('shelljs');
const fs = require('fs');

// default options
app.use(fileUpload());

app.get('/upload', (req, res) => res.sendFile(__dirname + "/upload.html"));

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/uploads/sketch/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    fs.renameSync(uploadPath , '/home/pi/remote-sensebox/uploads/sketch/sketch.ino');
    shell.exec('arduino-cli compile --upload ' + __dirname + '/uploads/sketch/sketch.ino --port /dev/ttyACM0 --fqbn sensebox:samd:sb')
    res.send('File uploaded!');
  });
});

app.listen(port,
  () => console.log(`Example app
	listening at http://localhost:${port}`)
);
