import { IsArray, IsInt } from 'class-validator';

export class UpdateIdsDTO {
  @IsInt({
    each: true,
    message: 'Todos os itens devem ser numéricos.',
  })
  @IsArray({
    message: 'Por favor, forneça uma lista de itens.',
  })
  ids: number[];
}
