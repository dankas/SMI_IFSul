import {Entity, model, property} from '@loopback/repository';

@model()
export class Medicao extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IDmed?: number;

  @property({
    type: 'object',
    default: {},
  })
  data?: object;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
  })
  componenteId?: number;

  constructor(data?: Partial<Medicao>) {
    super(data);
  }
}

export interface MedicaoRelations {
  // describe navigational properties here
}

export type MedicaoWithRelations = Medicao & MedicaoRelations;
