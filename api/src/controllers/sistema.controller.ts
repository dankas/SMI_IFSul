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
import {Sistema} from '../models';
import {SistemaRepository} from '../repositories';

export class SistemaController {
  constructor(
    @repository(SistemaRepository)
    public sistemaRepository : SistemaRepository,
  ) {}

  @post('/sistemas')
  @response(200, {
    description: 'Sistema model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sistema)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sistema, {
            title: 'NewSistema',
            
          }),
        },
      },
    })
    sistema: Sistema,
  ): Promise<Sistema> {
    return this.sistemaRepository.create(sistema);
  }

  @get('/sistemas/count')
  @response(200, {
    description: 'Sistema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sistema) where?: Where<Sistema>,
  ): Promise<Count> {
    return this.sistemaRepository.count(where);
  }

  @get('/sistemas')
  @response(200, {
    description: 'Array of Sistema model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sistema, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sistema) filter?: Filter<Sistema>,
  ): Promise<Sistema[]> {
    return this.sistemaRepository.find(filter);
  }

  @patch('/sistemas')
  @response(200, {
    description: 'Sistema PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sistema, {partial: true}),
        },
      },
    })
    sistema: Sistema,
    @param.where(Sistema) where?: Where<Sistema>,
  ): Promise<Count> {
    return this.sistemaRepository.updateAll(sistema, where);
  }

  @get('/sistemas/{id}')
  @response(200, {
    description: 'Sistema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sistema, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sistema, {exclude: 'where'}) filter?: FilterExcludingWhere<Sistema>
  ): Promise<Sistema> {
    return this.sistemaRepository.findById(id, filter);
  }

  @patch('/sistemas/{id}')
  @response(204, {
    description: 'Sistema PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sistema, {partial: true}),
        },
      },
    })
    sistema: Sistema,
  ): Promise<void> {
    await this.sistemaRepository.updateById(id, sistema);
  }

  @put('/sistemas/{id}')
  @response(204, {
    description: 'Sistema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sistema: Sistema,
  ): Promise<void> {
    await this.sistemaRepository.replaceById(id, sistema);
  }

  @del('/sistemas/{id}')
  @response(204, {
    description: 'Sistema DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sistemaRepository.deleteById(id);
  }
}
