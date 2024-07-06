import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from '../tasks.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([Status.DONE, Status.IN_PROGRESS, Status.OPEN])
  status: Status;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
