import App from './app';
import HeroController from './routes/app.routes';
import SkillController from './routes/skill.routes';
import API from './routes/api.routes';


const app = new App(new HeroController(), new SkillController(), new API());

app.listen();

export default app;


