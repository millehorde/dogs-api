import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';
import passport from 'passport';

import './auth/auth.strategy';

import { AuthController } from './auth/auth.controller';
import { DogController } from './dog/dog.controller';
import logger from './logger.tools';
import { setupDb } from './setup-db';
import { UserController } from './user/user.controller';

async function bootstrap() {
  // create db connection
  await setupDb();

  // initialize express app
  const app = express();

  // set the body parser
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());

  // call custom middleware for logging globally
  app.use(logger);

  // define a GET route on '/' pattern
  app.get('/', (req: express.Request, res: express.Response) => {
    return res.json({ message: 'Hello world, I\' m a dog api!' });
  });

  // use custom controller on '/dog' pattern
  const dogsRoutes = await new DogController().getRoutes();
  app.use('/dog', dogsRoutes);

  // use custom controller on '/user' pattern
  const usersRoutes = await new UserController().getRoutes();
  app.use(
    '/user',
    passport.authenticate('jwt', { session: false }),
    usersRoutes,
  );

  // use custom controller on '/auth' pattern
  const authRoutes = await new AuthController().getRoutes();
  app.use('/auth', authRoutes);

  // define application port
  app.listen(3015);

  global.console.log(chalk.green('----- Server up! -----\n'));
}

// start application
bootstrap();
