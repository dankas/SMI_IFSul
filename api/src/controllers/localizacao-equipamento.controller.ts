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
  Localizacao,
  Equipamento,
} from '../models';
import {LocalizacaoRepository} from '../repositories';

export class LocalizacaoEquipamentoController {
  constructor(
    @repository(LocalizacaoRepository) protected localizacaoRepository: LocalizacaoRepository,
  ) { }

  @get('/localizacaos/{id}/equipamentos', {
    responses: {
      '200': {
        description: 'Array of Localizacao has many Equipamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Equipamento>,
  ): Promise<Equipamento[]> {
    return this.localizacaoRepository.equipamentos(id).find(filter);
  }

  @post('/localizacaos/{id}/equipamentos', {
    responses: {
      '200': {
        description: 'Localizacao model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipamento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Localizacao.prototype.IDlocal,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipamento, {
            title: 'NewEquipamentoInLocalizacao',
            exclude: ['IDequip'],
            optional: ['localizacaoId']
          }),
        },
      },
    }) equipamento: Omit<Equipamento, 'IDequip'>,
  ): Promise<Equipamento> {
    return this.localizacaoRepository.equipamentos(id).create(equipamento);
  }

  @patch('/localizacaos/{id}/equipamentos', {
    responses: {
      '200': {
        description: 'Localizacao.Equipamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipamento, {partial: true}),
        },
      },
    })
    equipamento: Partial<Equipamento>,
    @param.query.object('where', getWhereSchemaFor(Equipamento)) where?: Where<Equipamento>,
  ): Promise<Count> {
    return this.localizacaoRepository.equipamentos(id).patch(equipamento, where);
  }

  @del('/localizacaos/{id}/equipamentos', {
    responses: {
      '200': {
        description: 'Localizacao.Equipamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Equipamento)) where?: Where<Equipamento>,
  ): Promise<Count> {
    return this.localizacaoRepository.equipamentos(id).delete(where);
  }
}
