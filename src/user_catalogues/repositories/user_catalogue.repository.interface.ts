import { IBaseRepository } from 'src/common/base.repository.interface'
import { UserCatalogues } from '../schema/user_catalogue.schema'
export interface IUserCataloguesRepository
  extends IBaseRepository<UserCatalogues> {}
