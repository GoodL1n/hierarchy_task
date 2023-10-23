import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from './city.entity';
import { Group } from "./group.entity";

@Entity()
export class Citizen{
    @PrimaryGeneratedColumn('uuid')
    uid: string

    @Column()
    id: number

    @Column()
    name: string

    @ManyToOne(() => City, (city)=> city.citizens)
    @JoinColumn({name: 'city_id'})
    city: City

    @Column()
    city_id: number

    @ManyToMany(() => Group, (group) => group.citizens, {eager: true, onDelete: 'CASCADE'})
    @JoinTable({
        name: 'citizen_group',
        joinColumn: {
            name: 'citizen_uid',
            referencedColumnName: 'uid'
        },
        inverseJoinColumn: {
            name: 'group_id',
            referencedColumnName: 'id'
        }
    })
    groups: Group[]
}