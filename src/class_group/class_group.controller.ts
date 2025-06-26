import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ClassGroupService } from './services/class_group.service'
import { CreateClassGroupDto } from './dto/create-class_group.dto'
import { UpdateClassGroupDto } from './dto/update-class_group.dto'
import { ClassGroup } from './schema/class_group.schema'

@Controller('class-group')
export class ClassGroupController {
  constructor(private readonly classGroupService: ClassGroupService) {
  }

  @Post()
  async create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return await this.classGroupService.create(createClassGroupDto)
  }



  @Get('search')
  async search(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 0,
    @Query('lecturer') lecturer?: string,
    @Query('name') name?: string,
  ): Promise<{
    classGroups: ClassGroup[]
    total: number
    page: number
    limit: number
  } | null> {
    return await this.classGroupService.search(limit, page, lecturer, name)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassGroupDto: UpdateClassGroupDto,
  ) {
    return await this.classGroupService.update(id, updateClassGroupDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.classGroupService.delete(id)
  }

  @Get()
  async findAll() {
    return await this.classGroupService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.classGroupService.findById(id)
  }
}
