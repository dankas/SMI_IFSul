import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Equipamento,
  Medicao,
} from '../models';
import {EquipamentoRepository} from '../repositories';

export class EquipamentoMedicaoController {
  constructor(
    @repository(EquipamentoRepository) protected equipamentoRepository: EquipamentoRepository,
  ) { }

  @get('/equipamentos/{id}/medicaos', {
    responses: {
      '200': {
        description: 'Array of Equipamento has many Medicao',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Medicao)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Medicao>,
  ): Promise<Medicao[]> {
    return this.equipamentoRepository.medicoes(id).find(filter);
  }

  @post('/equipamentos/{id}/medicaos', {
    responses: {
      '200': {
        description: 'Equipamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medicao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Equipamento.prototype.IDequip,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicao, {
            title: 'NewMedicaoInEquipamento',
            exclude: ['IDmed'],
            optional: ['equipamentoId']
          }),
        },
      },
    }) medicao: Omit<Medicao, 'IDmed'>,
  ): Promise<Medicao> {
    return this.equipamentoRepository.medicoes(id).create(medicao);
  }

  @patch('/equipamentos/{id}/medicaos', {
    responses: {
      '200': {
        description: 'Equipamento.Medicao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicao, {partial: true}),
        },
      },
    })
    medicao: Partial<Medicao>,
    @param.query.object('where', getWhereSchemaFor(Medicao)) where?: Where<Medicao>,
  ): Promise<Count> {
    return this.equipamentoRepository.medicoes(id).patch(medicao, where);
  }

  @del('/equipamentos/{id}/medicaos', {
    responses: {
      '200': {
        description: 'Equipamento.Medicao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Medicao)) where?: Where<Medicao>,
  ): Promise<Count> {
    return this.equipamentoRepository.medicoes(id).delete(where);
  }
}
