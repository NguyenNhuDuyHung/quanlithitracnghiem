import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UsersRepository } from '../repositories/users.repository'
import { User } from '../schemas/user.schema'
import { hashPassword } from 'src/utils/validation.pipe'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll(): Promise<User[] | null> {
    return await this.userRepository.find({}, { password: 0 }, [
      { path: 'userCatalogueId' },
    ])
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne(
      { _id: id },
      { password: 0 },
      [
        {
          path: 'userCatalogueId',
          select: 'name',
          populate: {
            path: 'permissions',
          },
        },
        {
          path: 'classGroupId',
        },
      ]
    )
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return user
  }

  async search(
    limit: number,
    page: number,
    sort: Record<string, 1 | -1>,
    email?: string | RegExp | undefined,
    fullname?: string | RegExp | undefined
  ): Promise<{
    users: User[]
    total: number
    page: number
    limit: number
  } | null> {
    const entityFilterQuery: Record<string, unknown> = {}

    if (fullname) entityFilterQuery.fullname = new RegExp(fullname, 'i')
    if (email) entityFilterQuery.email = new RegExp(email, 'i')

    const sortObject: Record<string, 1 | -1> = {}
    const [field, direction] = sort.toString().split('=')
    sortObject[field] = direction === '1' ? 1 : -1

    const offset = page * limit

    const [users, total] = await Promise.all([
      this.userRepository.find(entityFilterQuery, {}, [], sortObject, limit, offset),
      this.userRepository.find(entityFilterQuery),
    ])

    if (!users || !total) throw new NotFoundException('Not found!')

    return { users, total: total.length, page, limit }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      email: createUserDto.email,
    })

    if (existingUser)
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`
      )

    createUserDto.password = hashPassword(createUserDto.password)

    return await this.userRepository.create(createUserDto)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const existingEmail = await this.userRepository.findOne({
      email: updateUserDto.email,
      _id: { $ne: id },
    })

    if (existingEmail)
      throw new ConflictException(`Email ${updateUserDto.email} already exists`)

    if (updateUserDto.password)
      updateUserDto.password = hashPassword(updateUserDto.password)
    return await this.userRepository.findOneAndUpdate(
      { _id: id },
      updateUserDto
    )
  }

  async delete(id: string): Promise<User | boolean> {
    return await this.userRepository.deleteOne({ _id: id })
  }
}
