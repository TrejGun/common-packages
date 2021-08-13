import { Controller, Get, Query } from "@nestjs/common";

import { Public } from "@gemunion/nest-js-utils";
import { IIexBatch } from "@gemunion/types-iex-cloud";

import { IexCloudService } from "./iex-cloud.service";
import { BatchDto } from "./dto";

@Public()
@Controller("/iex-cloud")
export class IexCloudController {
  constructor(private readonly iexCloudService: IexCloudService) {}

  @Get("/batch")
  public batch(@Query() dto: BatchDto): Promise<IIexBatch> {
    return this.iexCloudService.batch(dto);
  }
}
