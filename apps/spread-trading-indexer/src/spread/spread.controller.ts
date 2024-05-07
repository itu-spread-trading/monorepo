import { Controller, Get, Logger, Query } from '@nestjs/common';
import {
    SpreadCandleResponse,
    SpreadGraphQueryParams,
    SpreadMeanResponse,
    SpreadQueryParams,
    SpreadResponse,
    SpreadStandardDeviationResponse,
} from 'src/spread/spread.dto';
import { SpreadService } from 'src/spread/spread.service';

@Controller('spread')
export class SpreadController {
    constructor(private readonly spreadService: SpreadService) {}
    logger = new Logger(SpreadController.name);

    /**
     * @description Get spread on given time interval
     * @param query Query parameters for getting spread
     */
    @Get()
    genSpread(@Query() query: SpreadQueryParams): Promise<SpreadResponse> {
        return this.spreadService.genSpread(query);
    }

    @Get('bff')
    genBffData(@Query() query: SpreadQueryParams): Promise<void> {
        return this.spreadService.genBffData(query);
    }

    /**
     * @description Get graph for spread on given time interval
     * @param query Query parameters for getting spread graph
     */
    @Get('graph')
    genSpreadGraph(
        @Query() query: SpreadGraphQueryParams,
    ): Promise<Array<SpreadCandleResponse>> {
        return this.spreadService.genSpreadGraphData(query);
    }

    /**
     * @description Get standard deviation for spread on given time interval
     * @param query Query parameters for getting spread graph
     */
    @Get('sd')
    genStandardDeviation(
        @Query() query: SpreadGraphQueryParams,
    ): Promise<SpreadStandardDeviationResponse> {
        return this.spreadService.genStandardDeviation(query);
    }

    /**
     * @description Get graph for spread mean on given time interval
     * @param query Query parameters for getting spread graph
     */
    @Get('graph/mean')
    genMeanGraph(
        @Query() query: SpreadGraphQueryParams,
    ): Promise<Array<SpreadMeanResponse>> {
        return this.spreadService.genMeanGraphData(query);
    }
}
