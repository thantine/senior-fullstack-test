import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ExistingUser } from '../../../../core/entities/user.entity';
import Post from '../post/post.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  toDomainEntity(): ExistingUser {
    return new ExistingUser({ id: this.id });
  }
}

export default User;
