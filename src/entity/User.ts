import { Entity, Column, BaseEntity, PrimaryColumn, BeforeInsert, BeforeUpdate, AfterLoad, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Movie } from "./Movie";
import { Celebs } from "./Celebs";

@Entity()
export class User extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    password: string;

    @OneToMany(type => Movie, (movie: Movie) => movie.user)
    movie: Array<Movie>;
    @OneToMany(type => Celebs, (celebs: Celebs) => celebs.user)
    celebs: Array<Celebs>;

    private tempPassword: string;
    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }
    @BeforeInsert()
    @BeforeUpdate()
    private async encryptPassword(): Promise<void> {
        if (this.password) {
            if (this.tempPassword !== this.password) {

                try {
                    const salt = await bcrypt.genSalt()
                    this.password = await bcrypt.hash(this.password, salt)

                } catch (e) {
                    throw new e

                }
            }
        }
    }



}
