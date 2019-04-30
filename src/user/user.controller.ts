import { Request, Response, Router } from 'express';

import { IRouteInterface } from '../tools/route.interface';
import { UserService } from './user.service';

export class UserController {
  constructor() {
    this.router = Router();
    this.userService = UserService.getInstance;
  }
  private router: Router;

  private userService: () => UserService;

  /**
   * Define and return the router of UserController.
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
   * Insert new User in Db
   *
   * @param req
   * @param res
   * @returns with the created User
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.userService().create(req.body) });
  }

  /**
   * Return a list of all users from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Users
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.userService().getAll() });
  }
}
