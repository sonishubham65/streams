var express = require('express');
var router = express.Router();
var { createReadStream, ReadStream } = require('fs');
/* GET home page. */

// let buffer = Buffer.from([]);
// buffer = Buffer.concat([buffer, Buffer.from("hihu")])
// console.log(buffer.length)

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
})
router.post('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log(req.body.start)
  let readStream = createReadStream('./public/mov.mp4', { start: parseInt(req.body.start), end: parseInt(req.body.end) });

  let buffer = Buffer.from("");
  readStream.on('open', () => {
    console.log('Stream opened...');
  });
  readStream.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk])
  });
  readStream.on('end', () => {
    console.log('Stream Closed...', buffer.length);
    if (buffer.length)
      res.json({ success: 1, data: buffer.toJSON() })
    else
      res.json({ success: 0 })
  });
  readStream.on('error', (fd) => {
    console.log("error", fd);
  });
});

module.exports = router;
