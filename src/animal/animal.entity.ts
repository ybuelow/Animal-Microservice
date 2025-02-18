import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column()
    Location: number;

    @Column()
    Breed: string;

    @Column()
    Behaviour: string;

    @Column()
    Origin: string;
}
