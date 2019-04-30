import { getCustomRepository } from 'typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

export class UserService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }
  private static instance: UserService;

  private userRepository: UserRepository;

  /**
   * Insert a user in Db
   *
   * @param user
   * @returns Resolves with User inserted
   */
  public async create(user: any) {
    const userToInsert: Partial<User> = {
      ...user,
    };
    return this.userRepository.save(userToInsert);
  }

  /**
   * Find one user by email
   */
  public async findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Retrieve all users from Db
   *
   * @returns Resolves with the list of all users in Db
   */
  public async getAll() {
    return this.userRepository.find();
  }
}
