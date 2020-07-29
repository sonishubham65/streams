var express = require('express');
var router = express.Router();
var { createReadStream, ReadStream } = require('fs');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
})
router.post('/', function (req, res, next) {
  let readStream = createReadStream('./public/mov.mp4', { start: parseInt(req.body.start), end: parseInt(req.body.end) });

  let buffer = Buffer.alloc(0);
  readStream.on('open', () => {
    console.log('Stream opened.');
  });
  readStream.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk])
  });
  readStream.on('end', () => {
    console.log('Stream Closed.', buffer.length);
    if (buffer.length)
      res.end(buffer)
    else
      res.json({ success: 0 })
  });
  readStream.on('error', (fd) => {
    console.log("error", fd);
  });
});

module.exports = router;
