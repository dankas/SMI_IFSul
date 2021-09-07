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
import {Componente} from '../models';
import {ComponenteRepository} from '../repositories';

export class ComponenteController {
  constructor(
    @repository(ComponenteRepository)
    public componenteRepository : ComponenteRepository,
  ) {}

  @post('/componentes')
  @response(200, {
    description: 'Componente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Componente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Componente, {
            title: 'NewComponente',
            exclude: ['IDcomp'],
          }),
        },
      },
    })
    componente: Omit<Componente, 'IDcomp'>,
  ): Promise<Componente> {
    return this.componenteRepository.create(componente);
  }

  @get('/componentes/count')
  @response(200, {
    description: 'Componente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Componente) where?: Where<Componente>,
  ): Promise<Count> {
    return this.componenteRepository.count(where);
  }

  @get('/componentes')
  @response(200, {
    description: 'Array of Componente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Componente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Componente) filter?: Filter<Componente>,
  ): Promise<Componente[]> {
    return this.componenteRepository.find(filter);
  }

  @patch('/componentes')
  @response(200, {
    description: 'Componente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Componente, {partial: true}),
        },
      },
    })
    componente: Componente,
    @param.where(Componente) where?: Where<Componente>,
  ): Promise<Count> {
    return this.componenteRepository.updateAll(componente, where);
  }

  @get('/componentes/{id}')
  @response(200, {
    description: 'Componente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Componente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Componente, {exclude: 'where'}) filter?: FilterExcludingWhere<Componente>
  ): Promise<Componente> {
    return this.componenteRepository.findById(id, filter);
  }

  @patch('/componentes/{id}')
  @response(204, {
    description: 'Componente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Componente, {partial: true}),
        },
      },
    })
    componente: Componente,
  ): Promise<void> {
    await this.componenteRepository.updateById(id, componente);
  }

  @put('/componentes/{id}')
  @response(204, {
    description: 'Componente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() componente: Componente,
  ): Promise<void> {
    await this.componenteRepository.replaceById(id, componente);
  }

  @del('/componentes/{id}')
  @response(204, {
    description: 'Componente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.componenteRepository.deleteById(id);
  }
}
