import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @Column({ name: 'email', type: 'varchar', unique: true })
  public email: string;

  @Column({ name: 'password', type: 'varchar' })
  public password: string;

  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  public userId: string;
}
