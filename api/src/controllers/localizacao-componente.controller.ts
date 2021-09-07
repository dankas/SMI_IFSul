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
  Componente,
} from '../models';
import {LocalizacaoRepository} from '../repositories';

export class LocalizacaoComponenteController {
  constructor(
    @repository(LocalizacaoRepository) protected localizacaoRepository: LocalizacaoRepository,
  ) { }

  @get('/localizacaos/{id}/componentes', {
    responses: {
      '200': {
        description: 'Array of Localizacao has many Componente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Componente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Componente>,
  ): Promise<Componente[]> {
    return this.localizacaoRepository.componentes(id).find(filter);
  }

  @post('/localizacaos/{id}/componentes', {
    responses: {
      '200': {
        description: 'Localizacao model instance',
        content: {'application/json': {schema: getModelSchemaRef(Componente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Localizacao.prototype.IDlocal,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Componente, {
            title: 'NewComponenteInLocalizacao',
            exclude: ['IDcomp'],
            optional: ['localizacaoId']
          }),
        },
      },
    }) componente: Omit<Componente, 'IDcomp'>,
  ): Promise<Componente> {
    return this.localizacaoRepository.componentes(id).create(componente);
  }

  @patch('/localizacaos/{id}/componentes', {
    responses: {
      '200': {
        description: 'Localizacao.Componente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Componente, {partial: true}),
        },
      },
    })
    componente: Partial<Componente>,
    @param.query.object('where', getWhereSchemaFor(Componente)) where?: Where<Componente>,
  ): Promise<Count> {
    return this.localizacaoRepository.componentes(id).patch(componente, where);
  }

  @del('/localizacaos/{id}/componentes', {
    responses: {
      '200': {
        description: 'Localizacao.Componente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Componente)) where?: Where<Componente>,
  ): Promise<Count> {
    return this.localizacaoRepository.componentes(id).delete(where);
  }
}
