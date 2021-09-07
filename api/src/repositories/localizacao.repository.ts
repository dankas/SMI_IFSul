import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Localizacao, LocalizacaoRelations, Componente} from '../models';
import {ComponenteRepository} from './componente.repository';

export class LocalizacaoRepository extends DefaultCrudRepository<
  Localizacao,
  typeof Localizacao.prototype.IDlocal,
  LocalizacaoRelations
> {

  public readonly componentes: HasManyRepositoryFactory<Componente, typeof Localizacao.prototype.IDlocal>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ComponenteRepository') protected componenteRepositoryGetter: Getter<ComponenteRepository>,
  ) {
    super(Localizacao, dataSource);
    this.componentes = this.createHasManyRepositoryFactoryFor('componentes', componenteRepositoryGetter,);
    this.registerInclusionResolver('componentes', this.componentes.inclusionResolver);
  }
}
