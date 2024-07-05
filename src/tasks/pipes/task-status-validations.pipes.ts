import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Status } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [Status.OPEN, Status.IN_PROGRESS, Status.DONE];
  transform(value: any) {
    console.log(`value${value}`);
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }
  /**
   * @param status is a value of status
   * @returns true if value exist
   */
  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx != -1;
  }
}
