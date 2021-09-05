import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Equipamento} from '../models';
import {EquipamentoRepository} from '../repositories';

export class EquipamentosController {
  constructor(
    @repository(EquipamentoRepository)
    public equipamentoRepository : EquipamentoRepository,
  ) {}

  @post('/equipamentos')
  @response(200, {
    description: 'Equipamento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Equipamento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipamento, {
            title: 'NewEquipamento',
            exclude: ['IDequip'],
          }),
        },
      },
    })
    equipamento: Omit<Equipamento, 'IDequip'>,
  ): Promise<Equipamento> {
    return this.equipamentoRepository.create(equipamento);
  }

  @get('/equipamentos/count')
  @response(200, {
    description: 'Equipamento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Equipamento) where?: Where<Equipamento>,
  ): Promise<Count> {
    return this.equipamentoRepository.count(where);
  }

  @get('/equipamentos')
  @response(200, {
    description: 'Array of Equipamento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Equipamento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Equipamento) filter?: Filter<Equipamento>,
  ): Promise<Equipamento[]> {
    return this.equipamentoRepository.find(filter);
  }

  @patch('/equipamentos')
  @response(200, {
    description: 'Equipamento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipamento, {partial: true}),
        },
      },
    })
    equipamento: Equipamento,
    @param.where(Equipamento) where?: Where<Equipamento>,
  ): Promise<Count> {
    return this.equipamentoRepository.updateAll(equipamento, where);
  }

  @get('/equipamentos/{id}')
  @response(200, {
    description: 'Equipamento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Equipamento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Equipamento, {exclude: 'where'}) filter?: FilterExcludingWhere<Equipamento>
  ): Promise<Equipamento> {
    return this.equipamentoRepository.findById(id, filter);
  }

  @patch('/equipamentos/{id}')
  @response(204, {
    description: 'Equipamento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipamento, {partial: true}),
        },
      },
    })
    equipamento: Equipamento,
  ): Promise<void> {
    await this.equipamentoRepository.updateById(id, equipamento);
  }

  @put('/equipamentos/{id}')
  @response(204, {
    description: 'Equipamento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() equipamento: Equipamento,
  ): Promise<void> {
    await this.equipamentoRepository.replaceById(id, equipamento);
  }

  @del('/equipamentos/{id}')
  @response(204, {
    description: 'Equipamento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.equipamentoRepository.deleteById(id);
  }
}
