import App from './app';
import HeroController from './routes/app.routes';
import SkillController from './routes/skill.routes';
import API from './routes/api.routes';
import AuthController from './routes/auth.router';
import UserController from './routes/user.routes';
import UniverseController from './routes/universe.routes';

const userController = new UserController();
const universeController = new UniverseController();
const skillController = new SkillController();
const app = new App(new HeroController(universeController, skillController), new SkillController(), userController, new API(), new AuthController(userController));

app.listen();

export default app;


