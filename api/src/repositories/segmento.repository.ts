import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Segmento, SegmentoRelations} from '../models';

export class SegmentoRepository extends DefaultCrudRepository<
  Segmento,
  typeof Segmento.prototype.nome,
  SegmentoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Segmento, dataSource);
  }
}
