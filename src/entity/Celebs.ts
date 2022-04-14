import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { CelebsComment } from "./CelebsComment";
import { CelebsLikes } from "./CelebsLikes";
import { User } from "./User";

@Entity()
export class Celebs extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  celebsName: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string

  @Column()
  visibility: boolean;

  @CreateDateColumn()
  date:Date;

  @ManyToOne(() => User, (user: User) => user.celebs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @OneToMany(() => CelebsComment, (comments: CelebsComment) => comments.celebs)
  comments: Array<CelebsComment>;

  @OneToMany(() => CelebsLikes, (likes: CelebsLikes) => likes.celebs)
  likes: Array<CelebsLikes>;
}
