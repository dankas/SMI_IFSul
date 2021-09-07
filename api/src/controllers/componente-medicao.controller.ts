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
  Componente,
  Medicao,
} from '../models';
import {ComponenteRepository} from '../repositories';

export class ComponenteMedicaoController {
  constructor(
    @repository(ComponenteRepository) protected componenteRepository: ComponenteRepository,
  ) { }

  @get('/componentes/{id}/medicaos', {
    responses: {
      '200': {
        description: 'Array of Componente has many Medicao',
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
    return this.componenteRepository.medicoes(id).find(filter);
  }

  @post('/componentes/{id}/medicaos', {
    responses: {
      '200': {
        description: 'Componente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medicao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Componente.prototype.IDcomp,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicao, {
            title: 'NewMedicaoInComponente',
            exclude: ['IDmed'],
            optional: ['componenteId']
          }),
        },
      },
    }) medicao: Omit<Medicao, 'IDmed'>,
  ): Promise<Medicao> {
    return this.componenteRepository.medicoes(id).create(medicao);
  }

  @patch('/componentes/{id}/medicaos', {
    responses: {
      '200': {
        description: 'Componente.Medicao PATCH success count',
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
    return this.componenteRepository.medicoes(id).patch(medicao, where);
  }

  @del('/componentes/{id}/medicaos', {
    responses: {
      '200': {
        description: 'Componente.Medicao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Medicao)) where?: Where<Medicao>,
  ): Promise<Count> {
    return this.componenteRepository.medicoes(id).delete(where);
  }
}
