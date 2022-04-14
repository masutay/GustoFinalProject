import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Celebs } from "./Celebs";

@Entity()
export class CelebsLikes extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => Celebs, (celebs: Celebs) => celebs.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  celebs: Celebs;
}
