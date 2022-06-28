import App from './app.js';
import IndexRoute from './routes/index.route.js';
import PayloadRoute from './routes/payload.route.js';

const routes = [new IndexRoute(), new PayloadRoute()];
const app = new App(routes);
app.listen();
