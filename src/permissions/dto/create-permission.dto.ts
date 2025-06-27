import { ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator'

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Module Name is required' })
  @IsString({ message: 'Module Name must be a string' })
  moduleName: string

  @IsArray({ message: 'Action must be an array' })
  @ArrayNotEmpty({ message: 'Action is required' })
  @IsIn(['read', 'create', 'update', 'delete', 'join'], {
    each: true,
    message: 'Each action must be one of: read, create, update, delete, join',
  })
  @IsString({ each: true })
  action: string[]
}
