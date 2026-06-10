import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class PostDto {

  @IsUUID()
  id!: string;

  @IsUUID()
  userId!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content!: string;
}
