import { IsIn, IsOptional } from 'class-validator';
import { type Role, ROLES } from '../entities/user.entity';

export class FindAllQueryDto {
  @IsOptional()
  @IsIn(ROLES)
  role?: Role;
}
