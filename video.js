const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  fs.readFile(`./src/static/video/${req.query.file}.mp4`, (err, data) => {
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
    });
    res.write(data);
    res.end();
  });
});

app.listen(8000, () => {
  console.log(`服务器运行于：http://127.0.0.1:8000`);
});
