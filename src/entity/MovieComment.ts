import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class MovieComment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  writerName: string;

  @Column()
  text: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Movie, (movie: Movie) => movie.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  movie: Movie;
}
