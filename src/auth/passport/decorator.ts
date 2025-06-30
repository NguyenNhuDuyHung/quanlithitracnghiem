import { SetMetadata } from '@nestjs/common'
import { Actions, AppAbility, Subjects } from '../../casl/casl-ability.factory'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const IS_REFRESH_KEY = 'isRefresh'
export const Refresh = () => SetMetadata(IS_REFRESH_KEY, true)

export interface RequiredRule {
  action: Actions
  subject: Subjects
}

export const CHECK_ABILITY = 'check_ability'
export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements)
