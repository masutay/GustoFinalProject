import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Celebs } from "./Celebs";

@Entity()
export class CelebsComment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  writerName: string;

  @Column()
  text: string;

  @CreateDateColumn()
  date:Date;
  
  @ManyToOne(() => Celebs, (celebs: Celebs) => celebs.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  celebs: Celebs;
}
