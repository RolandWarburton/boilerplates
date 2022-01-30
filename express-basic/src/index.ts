import App from "./app";
import IndexRoute from "./routes/index.route";
import PayloadRoute from "./routes/payload.route";

const routes = [new IndexRoute(), new PayloadRoute()];
const app = new App(routes);
app.listen();
