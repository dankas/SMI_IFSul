import {Entity, model, property, hasMany} from '@loopback/repository';
import {Medicao} from './medicao.model';

@model()
export class Componente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IDcomp?: number;


  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
  })
  descricao?: string;

  @property({
    type: 'object',
    default: {},
  })
  especificacoes?: object;

  @property({
    type: 'string',
  })
  tipo?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  comissionado?: boolean;

  @property({
    type: 'date',
  })
  data_comissionamento?: string;

  @property({
    type: 'date',
  })
  data_descomissionamento?: string;

  @property({
    type: 'string',
  })
  patrimonio?: string;

  @hasMany(() => Medicao)
  medicoes: Medicao[];

  @property({
    type: 'number',
  })
  localizacaoId?: number;

  constructor(data?: Partial<Componente>) {
    super(data);
  }
}

export interface ComponenteRelations {
  // describe navigational properties here
}

export type ComponenteWithRelations = Componente & ComponenteRelations;
