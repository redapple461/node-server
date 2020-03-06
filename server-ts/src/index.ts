import App from './app';
import HeroController from './routes/app.routes';
import SkillController from './routes/skill.routes';
import API from './routes/api.routes';
import AuthController from './routes/auth.router';
import UserController from './routes/user.routes';

const userController = new UserController();
const app = new App(new HeroController(), new SkillController(), userController, new API(), new AuthController(userController));

app.listen();

export default app;


