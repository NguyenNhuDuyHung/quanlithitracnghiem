import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserCatalogueDto } from '../dto/create-user_catalogue.dto'
import { UpdateUserCatalogueDto } from '../dto/update-user_catalogue.dto'
import { UserCatalogues } from '../schema/user_catalogue.schema'
import { UserCataloguesRepository } from '../repositories/user_catalogue.repository'

@Injectable()
export class UserCataloguesService {
  constructor(
    private readonly userCataloguesRepository: UserCataloguesRepository
  ) {}
  async findAll(): Promise<UserCatalogues[] | null> {
    return await this.userCataloguesRepository.find({})
  }

  async findById(id: string): Promise<UserCatalogues | null> {
    const userCatalogue = this.userCataloguesRepository.findOne({ _id: id })
    if (!userCatalogue)
      throw new NotFoundException(`User Catalogue with id ${id} not found`)
    return userCatalogue
  }

  async search(
    limit: number,
    page: number,
    name: string | RegExp | undefined,
    status: unknown
  ): Promise<{
    userCatalogues: UserCatalogues[]
    total: number
    page: number
    limit: number
  } | null> {
    const entityFilterQuery: Record<string, unknown> = {}

    if (name) entityFilterQuery.name = new RegExp(name, 'i')
    if (typeof status !== 'undefined') entityFilterQuery.status = status

    const offset = page * limit

    const [userCatalogues, total] = await Promise.all([
      this.userCataloguesRepository.find(
        entityFilterQuery,
        {},
        '',
        {},
        limit,
        offset
      ),
      this.userCataloguesRepository.find(entityFilterQuery),
    ])

    if (!userCatalogues || !total) throw new NotFoundException('Not found!')

    return { userCatalogues, total: total.length, page, limit }
  }

  async create(
    createUserCatalogueDto: CreateUserCatalogueDto
  ): Promise<UserCatalogues> {
    const existingUserCatalogue = await this.userCataloguesRepository.findOne({
      name: createUserCatalogueDto.name,
    })

    if (existingUserCatalogue)
      throw new NotFoundException(
        `User Catalogue with name ${createUserCatalogueDto.name} already exists`
      )

    return await this.userCataloguesRepository.create(createUserCatalogueDto)
  }

  async update(
    id: string,
    updateUserCatalogueDto: UpdateUserCatalogueDto
  ): Promise<UserCatalogues | null> {
    const existingUserCatalogue = await this.userCataloguesRepository.findOne({
      name: updateUserCatalogueDto.name,
    })

    if (existingUserCatalogue)
      throw new NotFoundException(
        `User Catalogue with name ${updateUserCatalogueDto.name} already exists`
      )

    return await this.userCataloguesRepository.findOneAndUpdate(
      { _id: id },
      updateUserCatalogueDto
    )
  }

  async delete(id: string): Promise<UserCatalogues | boolean> {
    return await this.userCataloguesRepository.deleteOne({ _id: id })
  }
}
