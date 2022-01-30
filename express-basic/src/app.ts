import { DOMAIN, PORT, NODE_ENV } from "./constants";
import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import Route from "./interfaces/routes.interface";
import { Server } from "http";
import loggerFunction from "./utils/genericLogger";
import helmet from "helmet";
import httpExceptionMiddleware from "./middleware/httpException.middleware";
import errorMiddleware from "./middleware/error.middleware";
const logger = loggerFunction(__filename);

class App {
  public app: Application;
  public port: string;
  public env: "production" | "development";

  constructor(routes: Route[]) {
    this.app = express();
    this.port = PORT.toString();
    this.env = NODE_ENV as "production" | "development";

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen(): Server {
    const server = this.app.listen(this.port, () => {
      logger.debug(`App listening on the port ${this.port}`);
    });

    // return the server to close it later (in tests)
    return server;
  }

  public getServer(): express.Application {
    return this.app;
  }
  private initializeMiddlewares() {
    // quick and dirty logger
    this.app.use((req: Request, _: Response, next: NextFunction) => {
      logger.info(req.url);
      next();
    });

    if (this.env === "production") {
      logger.info("running in production");
      this.app.use(helmet());
      this.app.use(cors({ origin: `${DOMAIN}`, credentials: true }));
    } else {
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // consume the routes and add them to the app
  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  // This should be initilized last to catch any errors
  // This will also be hit if you have not implemented a 404 page
  private initializeErrorHandling() {
    this.app.use(httpExceptionMiddleware);

    // Optionally you can enable this error middleware to catch errors of generic type Error (instead of just HTTP exceptions)
    // 		This is possible because the httpExceptionMiddleware will pass any error on if its not a httpException
    if (NODE_ENV == "production") {
      this.app.use(errorMiddleware);
    }
  }
}

export default App;
