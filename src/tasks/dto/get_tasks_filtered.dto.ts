import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from '../task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([Status.DONE, Status.IN_PROGRESS, Status.OPEN])
  status: Status;

  @IsOptional()
  @IsNotEmpty({ message: 'ne doit pas etre null' })
  search: string;
}
