import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Citizen } from './citizen.entity';

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    name: string

    @ManyToMany(() => Citizen, (citizen) => citizen.groups)
    citizens: Citizen[]
}