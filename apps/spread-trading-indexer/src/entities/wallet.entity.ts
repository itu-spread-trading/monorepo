import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallet')
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  associatedPrivateKey: string;

  @Column()
  associatedAddress: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
