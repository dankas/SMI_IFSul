import {Entity, model, property, hasMany} from '@loopback/repository';
import {Equipamento} from './equipamento.model';

@model()
export class Localizacao extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IDlocal?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'object',
    default: {},
  })
  caracteristicas?: object;

  @property({
    type: 'object',
    default: {},
  })
  local?: object;

  @hasMany(() => Equipamento)
  equipamentos: Equipamento[];

  constructor(data?: Partial<Localizacao>) {
    super(data);
  }
}

export interface LocalizacaoRelations {
  // describe navigational properties here
}

export type LocalizacaoWithRelations = Localizacao & LocalizacaoRelations;
