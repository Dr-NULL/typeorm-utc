import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { DateFix7225 } from "../tool/typeorm";

@Entity({ name: 'History' })
export class History extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'datetime' })
    dateRaw: Date;

    @Column({ type: 'datetime' })
    @DateFix7225()  //The decorator
    dateFix: Date;
}