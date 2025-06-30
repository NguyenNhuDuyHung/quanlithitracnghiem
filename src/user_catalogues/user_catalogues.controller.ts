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
import { UserCataloguesService } from './services/user_catalogues.service'
import { CreateUserCatalogueDto } from './dto/create-user_catalogue.dto'
import { UpdateUserCatalogueDto } from './dto/update-user_catalogue.dto'
import { UserCatalogues } from './schema/user_catalogue.schema'

@Controller('user-catalogues')
export class UserCataloguesController {
  constructor(private readonly userCataloguesService: UserCataloguesService) {}

  @Post()
  create(
    @Body() createUserCatalogueDto: CreateUserCatalogueDto
  ): Promise<UserCatalogues> {
    return this.userCataloguesService.create(createUserCatalogueDto)
  }

  @Get('search')
  search(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 0,
    @Query('name') name?: string,
    @Query('status') status?: boolean
  ): Promise<{
    userCatalogues: UserCatalogues[]
    total: number
    page: number
    limit: number
  } | null> {
    return this.userCataloguesService.search(limit, page, name, status)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCatalogueDto: UpdateUserCatalogueDto
  ): Promise<UserCatalogues | null> {
    return this.userCataloguesService.update(id, updateUserCatalogueDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserCatalogues | boolean> {
    return this.userCataloguesService.delete(id)
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<UserCatalogues | null> {
    return this.userCataloguesService.findById(id)
  }

  @Get()
  findAll(): Promise<UserCatalogues[] | null> {
    return this.userCataloguesService.findAll()
  }
}
