import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity, 
    ManyToOne,    
  } from "typeorm";
  import { Movie } from "./Movie";
  
  @Entity()
  export class MovieLikes extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column()
    userId: string; 
  
    @ManyToOne(() => Movie, (movie) => movie.likes,{
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    movie: Movie;
  }
  