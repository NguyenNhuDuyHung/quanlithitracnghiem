import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common'
import { PermissionsService } from './services/permissions.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { Permissions } from './schema/permissions.schema'

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.create(createPermissionDto)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ) {
    return await this.permissionsService.update(id, updatePermissionDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.permissionsService.delete(id)
  }

  @Get('search')
  async search(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 0,
    @Query('moduleName') moduleName?: string
  ): Promise<{
    permissions: Permissions[]
    total: number
    page: number
    limit: number
  } | null> {
    return await this.permissionsService.search(limit, page, moduleName)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.permissionsService.findById(id)
  }

  @Get()
  async findAll() {
    return await this.permissionsService.findAll()
  }
}
