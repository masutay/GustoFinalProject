import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany, 
  CreateDateColumn
} from "typeorm";
import { MovieComment } from "./MovieComment";
import { MovieLikes } from "./MovieLikes";
import { User } from "./User";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  movieName: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  visibility: boolean;

  @CreateDateColumn()
  date:Date;

  @ManyToOne(() => User, (user: User) => user.movie,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @OneToMany(() => MovieComment, (comments: MovieComment) => comments.movie)
  comments: Array<MovieComment>;

  @OneToMany(() => MovieLikes, (likes: MovieLikes) => likes.movie)
  likes: Array<MovieLikes>;
}
