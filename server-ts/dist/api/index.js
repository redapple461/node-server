"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const app = express_1.default();
app.use(express_1.default.static('src/static'));
const handleRequest = (req, res) => {
    const html = server_1.renderToString(react_1.default.createElement('h1', { style: { color: 'red' } }, 'hello'));
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
const port = config_1.default.get('port');
app.listen(port + 1, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`API listen ${port + 1} port`);
});
//# sourceMappingURL=index.js.map