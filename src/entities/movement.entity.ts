import { DateFix7225 } from '@tool/typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Movement' })
export class Movement extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;
    
    @Column({ type: 'varchar' })
    json!: string;

    @Column({ type: 'datetime' })
    date!: Date;

    @Column({ type: 'datetime' })
    @DateFix7225()
    dateDecoUTC!: Date;

    @Column({ type: 'datetime' })
    dateFuncUTC!: Date;
}
