import { PartialType } from '@nestjs/swagger';
import { CreateUserCatalogueDto } from './create-user_catalogue.dto';

export class UpdateUserCatalogueDto extends PartialType(CreateUserCatalogueDto) {}
