import { type Role, ROLES } from "../entities/user.entity";
import { IsIn, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'

export class UserDto {

  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  email!: string;

  @IsIn(ROLES)
  role!: Role;
}