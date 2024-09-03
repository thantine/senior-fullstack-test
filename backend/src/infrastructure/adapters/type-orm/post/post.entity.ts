import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Post as PostDomainEntity } from '../../../../core/entities';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  fbPostId: string;

  @Column({ nullable: true })
  like: number;

  @Column({ nullable: true })
  share: number;

  @Column({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  toDomainEntity(): PostDomainEntity {
    return {
      id: this.id,
      content: this.content,
      fbPostId: this.fbPostId,
      like: this.like,
      share: this.share,
    };
  }
}

export default Post;
