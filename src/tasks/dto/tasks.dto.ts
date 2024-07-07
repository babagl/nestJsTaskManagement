import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty({ message: 'veuillez renseigner ce champs' })
  title: string;
  @IsNotEmpty()
  description: string;
}
