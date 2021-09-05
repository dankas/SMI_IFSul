import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Sistema, SistemaRelations} from '../models';

export class SistemaRepository extends DefaultCrudRepository<
  Sistema,
  typeof Sistema.prototype.nome,
  SistemaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Sistema, dataSource);
  }
}
