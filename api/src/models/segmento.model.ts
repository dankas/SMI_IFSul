import {Entity, model, property} from '@loopback/repository';

@model()
export class Segmento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  nome: string;

  @property({
    type: 'object',
    required: true,
  })
  descricao: object;


  constructor(data?: Partial<Segmento>) {
    super(data);
  }
}

export interface SegmentoRelations {
  // describe navigational properties here
}

export type SegmentoWithRelations = Segmento & SegmentoRelations;
