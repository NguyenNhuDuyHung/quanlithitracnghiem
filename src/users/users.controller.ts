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
import { UsersService } from './services/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './schemas/user.schema'
import { ParseMongoIdPipe } from '../utils/validation.pipe'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[] | null> {
    return await this.usersService.findAll()
  }

  @Get('id/:id')
  async findById(
    @Param('id', ParseMongoIdPipe) id: string
  ): Promise<User | null> {
    return await this.usersService.findById(id)
  }

  @Get('search')
  async search(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 0,
    @Query('email') email?: string,
    @Query('fullname') fullname?: string
  ): Promise<{
    users: User[]
    total: number
    page: number
    limit: number
  } | null> {
    return await this.usersService.search(limit, page, email, fullname)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseMongoIdPipe) id: string
  ): Promise<User | boolean> {
    return await this.usersService.delete(id)
  }
}
