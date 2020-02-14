import App from './app';
import HeroController from './routes/app.routes';

const app = new App(new HeroController());

app.listen();

export default app;


