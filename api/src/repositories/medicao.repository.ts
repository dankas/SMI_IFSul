import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Medicao, MedicaoRelations} from '../models';

export class MedicaoRepository extends DefaultCrudRepository<
  Medicao,
  typeof Medicao.prototype.IDmed,
  MedicaoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Medicao, dataSource);
  }
}
