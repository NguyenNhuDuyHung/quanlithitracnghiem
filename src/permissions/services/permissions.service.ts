import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePermissionDto } from '../dto/create-permission.dto'
import { UpdatePermissionDto } from '../dto/update-permission.dto'
import { PermissionsRepository } from '../repositories/permissions.repository'

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionRepository: PermissionsRepository) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const existingPermission = await this.permissionRepository.findOne({
      moduleName: createPermissionDto.moduleName,
    })

    if (existingPermission) {
      throw new NotFoundException(
        `Permission with moduleName ${createPermissionDto.moduleName} already exists`
      )
    }

    return await this.permissionRepository.create(createPermissionDto)
  }

  async findAll() {
    return await this.permissionRepository.find({})
  }

  async findById(id: string) {
    const permission = await this.permissionRepository.findOne({ _id: id })

    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`)
    }

    return permission
  }

  async search(
    limit: number,
    page: number,
    moduleName: string | RegExp | undefined
  ) {
    const entityFilterQuery: Record<string, unknown> = {}

    if (moduleName) entityFilterQuery.moduleName = new RegExp(moduleName, 'i')

    const offset = page * limit
    const [permissions, total] = await Promise.all([
      this.permissionRepository.find(
        entityFilterQuery,
        {},
        '',
        {},
        limit,
        offset
      ),
      this.permissionRepository.find(entityFilterQuery),
    ])

    if (!permissions || !total) throw new NotFoundException('Not found!')
    return { permissions, total: total.length, page, limit }
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const existingPermission = await this.permissionRepository.findOne({
      moduleName: updatePermissionDto.moduleName,
      _id: { $ne: id },
    })

    if (existingPermission) {
      throw new NotFoundException(
        `Permission with moduleName ${updatePermissionDto.moduleName} already exists`
      )
    }

    return await this.permissionRepository.findOneAndUpdate(
      { _id: id },
      updatePermissionDto
    )
  }

  async delete(id: string) {
    return await this.permissionRepository.deleteOne({ _id: id })
  }
}
