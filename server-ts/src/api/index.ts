import express from 'express';
import config from 'config';
import React from 'react';
import { renderToString } from 'react-dom/server';

const app = express();

app.use(express.static('src/static'));


const handleRequest = (req, res) => {
  const html = renderToString(React.createElement('h1', {style: {color: 'red'}}, 'hello'));
  res.send(`
  <!doctype html>
  <html>
    <head>
      <title>Server side</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script nomodule src="bundle.js"></script>
    </body>
  </html>
  `);
};

app.use('^/$', handleRequest);
const port: number = config.get('port');
app.listen(port +  1, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`API listen ${port + 1} port`);
});
