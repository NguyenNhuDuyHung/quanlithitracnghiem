import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUserCatalogueDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string

  @IsOptional()
  @IsBoolean({ message: 'Status must be a boolean' })
  status: boolean
}
