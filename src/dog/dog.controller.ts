import { Request, Response, Router } from 'express';

import { IRouteInterface } from './../tools/route.interface';
import { DogService } from './dog.service';

export class DogController {
  constructor() {
    this.router = Router();
    this.dogService = DogService.getInstance;
  }

  private dogService: () => DogService;
  private router: Router;

  /**
   * Define and return the router of DogController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      { path: '/', method: 'get', actions: [this.getAll] },
    ];

    routes.forEach(item => {
      const { path, method, actions } = item;
      this.router[method](path, ...actions.map(action => action.bind(this)));
    });

    return this.router;
  }

  /**
   * Insert new Dog in Db
   *
   * @param req
   * @param res
   * @returns with the created Dog
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.dogService().create(req.body) });
  }

  /**
   * Return a list of all dogs from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Dogs
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.dogService().getAll() });
  }
}
