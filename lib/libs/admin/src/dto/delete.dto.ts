import { ArrayMinSize, IsArray, IsInt } from 'class-validator';

export class DeleteDTO {
  @IsArray({ message: 'Por favor, forneça uma lista de itens.' })
  @ArrayMinSize(1, { message: 'A lista de itens não pode estar vazia.' })
  @IsInt({ each: true, message: 'Todos os itens devem ser números inteiros.' })
  ids: number[];
}
