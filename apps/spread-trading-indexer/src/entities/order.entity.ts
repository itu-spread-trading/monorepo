import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
    PENDING = 'PENDING',
    FILLED = 'FILLED',
    CANCELLED = 'CANCELLED',
    COMPLETE = 'COMPLETE',
}

export enum OrderType {
    BUY = 'BUY',
    SELL = 'SELL',
}

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    address: string;

    @Column()
    symbol: string;

    @Column({ type: 'float' })
    spread: number;

    @Column({ type: 'float' })
    size: number;

    @Column({ nullable: true })
    tokenAmount: string;

    @Column({ default: OrderStatus.PENDING })
    status: OrderStatus;

    @Column()
    type: OrderType;

    @Column({ nullable: true, length: 2048 })
    associatedLimitOrder: string;

    @Column({ nullable: true })
    associatedSwap: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    date: Date;
}
