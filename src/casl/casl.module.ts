import { Module } from '@nestjs/common'
import { CaslAbilityFactory } from './casl-ability.factory'
import { UserCataloguesModule } from '../user_catalogues/user_catalogues.module'

@Module({
  imports: [UserCataloguesModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
