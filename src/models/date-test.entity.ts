import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseOrm } from "../tool/typeorm";

@Entity({ name: 'DateTest' })
export class DateTest extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'datetime' })
    date: Date;
}
