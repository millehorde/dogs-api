import { EntityRepository, Repository } from 'typeorm';

import { Dog } from './dog.entity';

@EntityRepository(Dog)
export class DogRepository extends Repository<Dog> {}
