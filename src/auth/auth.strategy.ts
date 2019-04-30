import passport from 'passport';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from 'passport-jwt';
import { AuthService } from './auth.service';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

passport.use(
  // tslint:disable-next-line:ban-types
  new JwtStrategy(opts, async (payload: { email: string }, done: Function) => {
    try {
      const user = await AuthService.getInstance().validateUser(payload);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (e) {
      return done(e, false);
    }
  }),
);
