import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateNoteDto {
  @IsNumber()
  readonly movieId: number;

  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsUrl()
  readonly imageUrl: string;
}
