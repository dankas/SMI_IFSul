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
import {Medicao} from '../models';
import {MedicaoRepository} from '../repositories';

export class MedicaoController {
  constructor(
    @repository(MedicaoRepository)
    public medicaoRepository : MedicaoRepository,
  ) {}

  @post('/medicoes')
  @response(200, {
    description: 'Medicao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Medicao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicao, {
            title: 'NewMedicao',
            exclude: ['IDmed'],
          }),
        },
      },
    })
    medicao: Omit<Medicao, 'IDmed'>,
  ): Promise<Medicao> {
    return this.medicaoRepository.create(medicao);
  }

  @get('/medicoes/count')
  @response(200, {
    description: 'Medicao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Medicao) where?: Where<Medicao>,
  ): Promise<Count> {
    return this.medicaoRepository.count(where);
  }

  @get('/medicoes')
  @response(200, {
    description: 'Array of Medicao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Medicao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Medicao) filter?: Filter<Medicao>,
  ): Promise<Medicao[]> {
    return this.medicaoRepository.find(filter);
  }

  @patch('/medicoes')
  @response(200, {
    description: 'Medicao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicao, {partial: true}),
        },
      },
    })
    medicao: Medicao,
    @param.where(Medicao) where?: Where<Medicao>,
  ): Promise<Count> {
    return this.medicaoRepository.updateAll(medicao, where);
  }

  @get('/medicoes/{id}')
  @response(200, {
    description: 'Medicao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Medicao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Medicao, {exclude: 'where'}) filter?: FilterExcludingWhere<Medicao>
  ): Promise<Medicao> {
    return this.medicaoRepository.findById(id, filter);
  }

  @patch('/medicoes/{id}')
  @response(204, {
    description: 'Medicao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicao, {partial: true}),
        },
      },
    })
    medicao: Medicao,
  ): Promise<void> {
    await this.medicaoRepository.updateById(id, medicao);
  }

  @put('/medicoes/{id}')
  @response(204, {
    description: 'Medicao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() medicao: Medicao,
  ): Promise<void> {
    await this.medicaoRepository.replaceById(id, medicao);
  }

  @del('/medicoes/{id}')
  @response(204, {
    description: 'Medicao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.medicaoRepository.deleteById(id);
  }
}
