import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dogs' })
export class Dog {
  @PrimaryGeneratedColumn('uuid', { name: 'dog_id' })
  public dogId: string;

  @Column({ name: 'name', type: 'varchar' })
  public name: string;
}
