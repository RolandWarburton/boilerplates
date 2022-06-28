import { Router } from 'express';
import IndexController from '../controllers/index.controller.js';
import Route from '../interfaces/routes.interface.js';

class IndexRoute implements Route {
  public path = '/';
  public router = Router({ strict: true });
  public indexController: IndexController;

  constructor() {
    this.indexController = new IndexController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
