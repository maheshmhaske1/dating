var express = require('express');
var fs = require('fs')
var router = express.Router();



// /* GET home page. */
const AWS = require('aws-sdk');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), function(req, res) {
  const file = req.file;

  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const fileContent = file.buffer;
  const fileName = file.originalname;

  const s3 = new AWS.S3({
    accessKeyId: 'AKIA3SQJVY37NXUIPSJ5',
    secretAccessKey: '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',
  });

  const params = {
    Bucket: "tottoo",
    Key: fileName,
    Body: fileContent,
    ContentType: file.mimetype
  }

  s3.upload(params, (error, data) => {
    if (error) {
      console.log(error)
      res.status(500).send(error);
    } else {
      console.log(data)
      res.status(200).send("File uploaded successfully");
    }
  });
});


module.exports = router;
