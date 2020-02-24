import express from 'express';
import config from 'config';
import cors from 'cors';
import bodyParser from 'body-parser';
import HeroController from './routes/app.routes';
import SkillController from './routes/skill.routes';
import API from './routes/api.routes';

class App {
  private app: express.Application;
  private port: number;

  constructor (HeroController: HeroController, SkillController: SkillController, API: API) {
    this.app = express();
    this.port = config.get('port');
    this.initMidleware();
    this.initControllers(HeroController, SkillController,API);
  }

  private initMidleware () {
    this.app.use(cors());
    this.app.use(bodyParser());
    this.app.use(bodyParser.json({limit: '5mb'}));
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(express.static('./src/static'));
  }

  private initControllers (HeroController: HeroController, SkillController: SkillController, API: API) {
      this.app.use('', HeroController.router);
      this.app.use('/skills', SkillController.router);
      this.app.use('^/$', API.router);
  }

  public getServer () {
    return this.app;
  }

  public listen () {
    this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;

