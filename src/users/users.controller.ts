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
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './services/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './schemas/user.schema'
import { ParseMongoIdPipe } from '../utils/validation.pipe'
import { CheckAbilities } from '../auth/passport/decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  @CheckAbilities({ action: 'read', subject: 'users' })
  async search(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 0,
    @Query('sort') sort: Record<string, 1 | -1> = { _id: 1 },
    @Query('email') email?: string,
    @Query('fullname') fullname?: string
  ): Promise<{
    users: User[]
    total: number
    page: number
    limit: number
  } | null> {
    return await this.usersService.search(limit, page, sort, email, fullname)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CheckAbilities({ action: 'create', subject: 'users' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto)
  }

  @Patch(':id')
  @CheckAbilities({ action: 'update', subject: 'users' })
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @CheckAbilities({ action: 'delete', subject: 'users' })
  async delete(
    @Param('id', ParseMongoIdPipe) id: string
  ): Promise<User | boolean> {
    return await this.usersService.delete(id)
  }

  @Get()
  @CheckAbilities({ action: 'read', subject: 'users' })
  async findAll(): Promise<User[] | null> {
    return await this.usersService.findAll()
  }

  @Get(':id')
  @CheckAbilities({ action: 'read', subject: 'users' })
  async findById(
    @Param('id', ParseMongoIdPipe) id: string
  ): Promise<User | null> {
    return await this.usersService.findById(id)
  }
}
