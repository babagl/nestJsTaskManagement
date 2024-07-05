export interface Tasks {
  id: string;
  title: string;
  description: string;
  status: Status;
}

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'INPROGRESS',
  DONE = 'DONE',
}