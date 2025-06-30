import { PartialType } from '@nestjs/swagger';
import { CreateUserCatalogueDto } from './create-user_catalogue.dto';
import { IsArray, IsMongoId, IsOptional } from 'class-validator'

export class UpdateUserCatalogueDto extends PartialType(CreateUserCatalogueDto) {
  @IsArray({ message: 'Permissions must be an array' })
  @IsMongoId({ each: true, message: 'Permissions must be valid MongoDB IDs' })
  @IsOptional()
  permissions: string[]
}
