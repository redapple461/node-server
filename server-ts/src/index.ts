import App from './app';
import HeroController from './routes/app.routes';
import SkillController from './routes/skill.routes';

const app = new App(new HeroController(), new SkillController());

app.listen();

export default app;


