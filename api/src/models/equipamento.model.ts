import {Entity, model, property, hasMany} from '@loopback/repository';
import {Medicao} from './medicao.model';

@model()
export class Equipamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IDequip?: number;

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

  @property({
    type: 'number',
  })
  localizacaoId?: number;

  @hasMany(() => Medicao)
  medicoes: Medicao[];

  constructor(data?: Partial<Equipamento>) {
    super(data);
  }
}

export interface EquipamentoRelations {
  // describe navigational properties here
}

export type EquipamentoWithRelations = Equipamento & EquipamentoRelations;
