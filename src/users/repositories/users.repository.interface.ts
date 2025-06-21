import { IBaseRepository } from 'src/common/base.repository.interface'
import { User } from '../schemas/user.schema'
export interface IUsersRepository extends IBaseRepository<User> {}
