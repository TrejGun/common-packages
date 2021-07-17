import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {DynamicModule, HttpModule, Logger, Module} from "@nestjs/common";

import {MANDRILL_OPTIONS_PROVIDER} from "./mandrill.constants";
import {MandrillService} from "./mandrill.service";
import {IMandrillOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, MandrillService],
  exports: [MandrillModule, MandrillService],
})
export class MandrillModule extends createConfigurableDynamicRootModule<MandrillModule, IMandrillOptions>(
  MANDRILL_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => MandrillModule.externallyConfigured(MandrillModule, 0);
}
