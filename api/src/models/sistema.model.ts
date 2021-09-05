import {Entity, model, property} from '@loopback/repository';

@model()
export class Sistema extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  nome: string;

  @property({
    type: 'object',
    default: {},
  })
  descricao?: object;


  constructor(data?: Partial<Sistema>) {
    super(data);
  }
}

export interface SistemaRelations {
  // describe navigational properties here
}

export type SistemaWithRelations = Sistema & SistemaRelations;
