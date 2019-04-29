import { getCustomRepository } from 'typeorm';

import { Dog } from './dog.entity';
import { DogRepository } from './dog.repository';

export class DogService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new DogService();
    }
    return this.instance;
  }

  constructor() {
    this.dogRepository = getCustomRepository(DogRepository);
  }
  private static instance: DogService;

  private dogRepository: DogRepository;

  /**
   * Insert a dog in Db
   *
   * @param dog
   * @returns Resolves with Dog inserted
   */
  public async create(dog: any) {
    const dogToInsert: Partial<Dog> = {
      ...dog,
    };
    return this.dogRepository.save(dogToInsert);
  }

  /**
   * Retrieve all dogs from Db
   *
   * @returns Resolves with the list of all dogs in Db
   */
  public async getAll() {
    return this.dogRepository.find();
  }
}
