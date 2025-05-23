import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
