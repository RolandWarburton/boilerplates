import Ajv, { ValidateFunction } from "ajv";
import { Router } from "express";
import PayloadController from "../controllers/payload.controller.js";
import Route from "../interfaces/routes.interface.js";
import validateRequest from "../middleware/validateReq.middleware.js";
import { RequestHandler } from "express";
import schema from "./schemas/payload.schema.js";
import { IPayload } from "../interfaces/payload.interface.js";

class PayloadRoute implements Route {
  public path = "/page";
  public router = Router({ strict: true });
  public controller: PayloadController;
  private validator: ValidateFunction<IPayload>;
  private schema = schema;

  constructor() {
    this.validator = new Ajv().compile(this.schema);
    this.controller = new PayloadController();
    this.initializeRoutes();
  }

  private middleware(): RequestHandler[] {
    return [validateRequest<IPayload>("query", this.validator)];
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      [...this.middleware()],
      this.controller.index.bind(this.controller)
    );
  }
}

export default PayloadRoute;
