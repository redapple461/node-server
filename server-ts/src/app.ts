import express from 'express';
import config from 'config'
import router from './routes/app.routes'
import cors from 'cors'
import bodyParser from 'body-parser'

class App {
  private app: express.Application;
  private port: number;

  constructor(controllers){
    this.app = express();
    this.port = config.get('port');
    this.initMidleware();
    this.initControllers(controllers);
  }

  private initMidleware(){
    this.app.use(cors())
    this.app.use(bodyParser());
    this.app.use(bodyParser.json({limit: '5mb'}));
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json())
  }

  private initControllers(controllers){
      this.app.use('',controllers.router);
  }

  public getServer(){
    return this.app;
  }

  public listen(){
    this.app.listen(this.port,() => {
        console.log(`App listening on the port ${this.port}`)
    })
  }
}

export default App
