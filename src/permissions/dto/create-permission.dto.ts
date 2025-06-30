import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Module Name is required' })
  @IsString({ message: 'Module Name must be a string' })
  moduleName: string

  @IsIn(['read', 'create', 'update', 'delete', 'join'], {
    message:
      'Action must be either "read", "create", "update", "delete", or "join"',
  })
  @IsNotEmpty({ message: 'Action is required' })
  @IsString({ message: 'Action must be a string' })
  action: string

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string
}
