import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
    PENDING = 'PENDING',
    FILLED = 'FILLED',
    CANCELLED = 'CANCELLED',
    OPEN = 'OPEN',
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
    symbol: string;

    @Column({ type: 'float' })
    spread: number;

    @Column({ type: 'float' })
    size: number;

    @Column({ default: OrderStatus.PENDING })
    status: OrderStatus;

    @Column()
    type: OrderType;

    @Column({ nullable: true })
    associtatedLimitOrder: string;

    @Column({ nullable: true })
    associatedSwap: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    date: Date;
}
