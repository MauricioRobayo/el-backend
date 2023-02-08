import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsUrl()
  readonly imageUrl: string;
}
