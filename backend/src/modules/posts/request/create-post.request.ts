import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePostRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  public content: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  public governmentId: string;
}
