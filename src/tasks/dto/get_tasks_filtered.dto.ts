import { Status } from '../tasks.model';

export class GetTaskFilterDto {
  status: Status;
  search: string;
}
