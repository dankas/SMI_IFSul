import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Componente, ComponenteRelations, Medicao} from '../models';
import {MedicaoRepository} from './medicao.repository';

export class ComponenteRepository extends DefaultCrudRepository<
  Componente,
  typeof Componente.prototype.IDcomp,
  ComponenteRelations
> {

  public readonly medicoes: HasManyRepositoryFactory<Medicao, typeof Componente.prototype.IDcomp>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MedicaoRepository') protected medicaoRepositoryGetter: Getter<MedicaoRepository>,
  ) {
    super(Componente, dataSource);
    this.medicoes = this.createHasManyRepositoryFactoryFor('medicoes', medicaoRepositoryGetter,);
    this.registerInclusionResolver('medicoes', this.medicoes.inclusionResolver);
  }
}
