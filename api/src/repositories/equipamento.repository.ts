import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Equipamento, EquipamentoRelations, Medicao} from '../models';
import {MedicaoRepository} from './medicao.repository';

export class EquipamentoRepository extends DefaultCrudRepository<
  Equipamento,
  typeof Equipamento.prototype.IDequip,
  EquipamentoRelations
> {

  public readonly medicoes: HasManyRepositoryFactory<Medicao, typeof Equipamento.prototype.IDequip>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MedicaoRepository') protected medicaoRepositoryGetter: Getter<MedicaoRepository>,
  ) {
    super(Equipamento, dataSource);
    this.medicoes = this.createHasManyRepositoryFactoryFor('medicoes', medicaoRepositoryGetter,);
    this.registerInclusionResolver('medicoes', this.medicoes.inclusionResolver);
  }
}
