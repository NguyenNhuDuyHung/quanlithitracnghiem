import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { User } from '../users/schemas/user.schema'
import { UserCataloguesService } from '../user_catalogues/services/user_catalogues.service'
import { UserCatalogues } from '../user_catalogues/schema/user_catalogue.schema'

export type Actions = 'create' | 'read' | 'update' | 'delete'
export type Subjects =
  | InferSubjects<typeof UserCatalogues | typeof User>
  | string

export type AppAbility = MongoAbility<[Actions, Subjects]>

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly userCataloguesService: UserCataloguesService) {}

  async createForUser(user: User) {
    if (!user) return

    const { can, cannot, build } = new AbilityBuilder(createMongoAbility)

    const userCatalogueId = user?.userCatalogueId

    if (!userCatalogueId) {
      can('read', 'auth')
      return build({
        detectSubjectType: (item) =>
          item.constructor as ExtractSubjectType<Subjects>,
      })
    }

    const userCatalogue = await this.userCataloguesService.findById(
      String(userCatalogueId)
    )

    const permissions = userCatalogue?.permissions || []

    for (const permission of permissions) {
      if (this.isValidAction(permission['action'])) {
        can(permission['action'], permission['moduleName'])
      }
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }

  private isValidAction(action: string): action is Actions {
    return ['create', 'read', 'update', 'delete'].includes(action)
  }
}
