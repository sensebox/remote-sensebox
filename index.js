const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;
const shell = require('shelljs');
const fs = require('fs');
const cron = require('node-cron');

app.use(fileUpload());

app.get('/upload', (req, res) => res.sendFile(__dirname + "/upload.html"));

app.post('/upload', function (req, res) {
  let sketch;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sketch = req.files.sketch;
  shell.exec('mkdir ' + __dirname + '/uploads/' + sketch.name.split(".")[0])
  uploadPath = __dirname + '/uploads/' + sketch.name.split(".")[0] + '/' + sketch.name;

  sketch.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

cron.schedule('* * * * *', () => {
  folders = fs.readdirSync(__dirname + '/uploads/');
  var oldest = folders[0];

  if (folders.length > 1) {
    for (var i = 1; i < folders.length; i++) {
      fs.statSync(__dirname + '/uploads/' + folders[i], (err, stats) => {
        if (err) {
          console.log(err);
        }
        else {
          if (stats.birttimeMs > oldest.birthtimeMs) {
            oldest = folders[i];
          }
        }
      })
    }
  }
  shell.exec('ls ' + __dirname + '/uploads/')
  if(oldest != undefined) {
    // compile sketch and flash mcu
    shell.exec('arduino-cli compile --upload ' + __dirname + '/uploads/' + oldest + '/' + oldest + '.ino' + ' --port /dev/ttyACM0 --fqbn sensebox:samd:sb');
    // delete folder with sketch
    shell.exec('rm -r ' + __dirname + '/uploads/' + oldest);
    shell.exec('ls ' + __dirname + '/uploads/')
  }
});





app.listen(port,
  () => console.log(`Example app
	listening at http://localhost:${port}`)
);
