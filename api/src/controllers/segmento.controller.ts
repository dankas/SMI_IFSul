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
import {Segmento} from '../models';
import {SegmentoRepository} from '../repositories';

export class SegmentoController {
  constructor(
    @repository(SegmentoRepository)
    public segmentoRepository : SegmentoRepository,
  ) {}

  @post('/segmentos')
  @response(200, {
    description: 'Segmento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Segmento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Segmento, {
            title: 'NewSegmento',
            
          }),
        },
      },
    })
    segmento: Segmento,
  ): Promise<Segmento> {
    return this.segmentoRepository.create(segmento);
  }

  @get('/segmentos/count')
  @response(200, {
    description: 'Segmento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Segmento) where?: Where<Segmento>,
  ): Promise<Count> {
    return this.segmentoRepository.count(where);
  }

  @get('/segmentos')
  @response(200, {
    description: 'Array of Segmento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Segmento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Segmento) filter?: Filter<Segmento>,
  ): Promise<Segmento[]> {
    return this.segmentoRepository.find(filter);
  }

  @patch('/segmentos')
  @response(200, {
    description: 'Segmento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Segmento, {partial: true}),
        },
      },
    })
    segmento: Segmento,
    @param.where(Segmento) where?: Where<Segmento>,
  ): Promise<Count> {
    return this.segmentoRepository.updateAll(segmento, where);
  }

  @get('/segmentos/{id}')
  @response(200, {
    description: 'Segmento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Segmento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Segmento, {exclude: 'where'}) filter?: FilterExcludingWhere<Segmento>
  ): Promise<Segmento> {
    return this.segmentoRepository.findById(id, filter);
  }

  @patch('/segmentos/{id}')
  @response(204, {
    description: 'Segmento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Segmento, {partial: true}),
        },
      },
    })
    segmento: Segmento,
  ): Promise<void> {
    await this.segmentoRepository.updateById(id, segmento);
  }

  @put('/segmentos/{id}')
  @response(204, {
    description: 'Segmento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() segmento: Segmento,
  ): Promise<void> {
    await this.segmentoRepository.replaceById(id, segmento);
  }

  @del('/segmentos/{id}')
  @response(204, {
    description: 'Segmento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.segmentoRepository.deleteById(id);
  }
}
