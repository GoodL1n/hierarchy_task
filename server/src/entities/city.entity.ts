import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Citizen } from "./citizen.entity";

@Entity()
export class City{
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    data: string

    @OneToMany(() => Citizen, (citizen)=>citizen.city)
    citizens: Citizen[]
}