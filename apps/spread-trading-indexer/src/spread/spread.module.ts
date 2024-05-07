import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/token.entity';
import { SpreadController } from 'src/spread/spread.controller';
import { SpreadService } from 'src/spread/spread.service';

@Module({
    imports: [TypeOrmModule.forFeature([TokenEntity])],
    controllers: [SpreadController],
    providers: [SpreadService],
})
export class SpreadModule {}
