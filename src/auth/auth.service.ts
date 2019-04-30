import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

export class AuthService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  constructor() {
    this.userService = UserService.getInstance();
  }
  private static instance: AuthService;

  private userService: UserService;

  /**
   * Sign in a user
   *
   * @param user
   * @returns Resolves with User inserted
   */
  public async signIn(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    const isMatched = await bcrypt.compare(
      password,
      (user && user.password) || '',
    );
    if (!user || !isMatched) {
      return undefined;
    }

    return user;
  }

  /**
   * Sign up a user
   *
   * @param user
   * @returns Resolves with User inserted
   */
  public async signUp(email: string, password: string) {
    return this.userService.create({
      email,
      password: await bcrypt.hash(password, 10),
    });
  }

  /**
   * Return true if email from JWT payload return a valid email of user, else false
   *
   * @param payload
   */
  public async validateUser(payload: { email: string }) {
    return (await this.userService.findOneByEmail(payload.email)) || false;
  }
}
