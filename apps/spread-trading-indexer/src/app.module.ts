import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from 'src/config';
import { IndexerModule } from 'src/indexer/indexer.module';
import { OrderModule } from 'src/order/order.module';
import { SDKModule } from 'src/sdk/sdk.module';
import { SpreadModule } from 'src/spread/spread.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
    imports: [
        // General
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot(CONFIG.DATABASE),

        // Custom Modules
        IndexerModule,
        SpreadModule,
        WalletModule,
        OrderModule,
        SDKModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
