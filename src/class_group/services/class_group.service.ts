import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateClassGroupDto } from '../dto/create-class_group.dto'
import { UpdateClassGroupDto } from '../dto/update-class_group.dto'
import { ClassGroupRepository } from '../repositories/class_group.repository'
import { ClassGroup } from '../schema/class_group.schema'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ClassGroupService {
  constructor(private readonly classGroupRepository: ClassGroupRepository) {}

  async create(createClassGroupDto: CreateClassGroupDto): Promise<ClassGroup> {
    const existingClassGroup = await this.classGroupRepository.findOne({
      inviteCode: createClassGroupDto.inviteCode,
    })
    if (existingClassGroup)
      throw new NotFoundException(
        `Class Group with inviteCode ${createClassGroupDto.inviteCode} already exists`
      )

    createClassGroupDto.inviteCode = uuidv4()
    return this.classGroupRepository.create(createClassGroupDto)
  }

  async findAll(): Promise<ClassGroup[] | null> {
    return await this.classGroupRepository.find({}, {}, [
      'lecturer',
      'subjectId',
    ])
  }

  async findById(id: string): Promise<ClassGroup | null> {
    const classGroup = await this.classGroupRepository.findOne({ _id: id })
    if (!classGroup)
      throw new NotFoundException(`Class Group with id ${id} not found`)
    return classGroup
  }

  async search(
    limit: number,
    page: number,
    lecturer: string | RegExp | undefined,
    name: string | RegExp | undefined
  ): Promise<{
    classGroups: ClassGroup[]
    total: number
    page: number
    limit: number
  } | null> {
    const entityFilterQuery: Record<string, unknown> = {}

    if (lecturer) entityFilterQuery.lecturer = new RegExp(lecturer, 'i')
    if (name) entityFilterQuery.name = new RegExp(name, 'i')

    const offset = page * limit

    const [classGroups, total] = await Promise.all([
      this.classGroupRepository.find(
        entityFilterQuery,
        {},
        '',
        {},
        limit,
        offset
      ),
      this.classGroupRepository.find(entityFilterQuery),
    ])

    if (!classGroups || !total) throw new NotFoundException('Not found!')

    return { classGroups, total: total.length, page, limit }
  }

  async update(
    id: string,
    updateClassGroupDto: UpdateClassGroupDto
  ): Promise<ClassGroup | null> {
    const existingClassGroup = await this.classGroupRepository.findOne({
      inviteCode: updateClassGroupDto.inviteCode,
      _id: { $ne: id },
    })

    if (existingClassGroup)
      throw new NotFoundException(
        `Class Group with inviteCode ${updateClassGroupDto.inviteCode} already exists`
      )
    return await this.classGroupRepository.findOneAndUpdate(
      { _id: id },
      updateClassGroupDto
    )
  }

  async delete(id: string): Promise<ClassGroup | boolean> {
    return await this.classGroupRepository.deleteOne({ _id: id })
  }
}
