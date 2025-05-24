import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateCustomFieldDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
