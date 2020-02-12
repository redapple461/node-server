import express from 'express';
import config from 'config'
import router from './routes/app.routes'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();
const port = config.get('port');

app.use(cors())
app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(router)

app.listen(port, (err: any) => {
  return console.log(`server is listening on ${port}`);
});


export default app