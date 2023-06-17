import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindPostsByGovRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  public governmentId: string;
}
