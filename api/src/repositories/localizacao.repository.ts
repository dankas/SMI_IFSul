import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Localizacao, LocalizacaoRelations, Equipamento} from '../models';
import {EquipamentoRepository} from './equipamento.repository';

export class LocalizacaoRepository extends DefaultCrudRepository<
  Localizacao,
  typeof Localizacao.prototype.IDlocal,
  LocalizacaoRelations
> {

  public readonly equipamentos: HasManyRepositoryFactory<Equipamento, typeof Localizacao.prototype.IDlocal>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EquipamentoRepository') protected equipamentoRepositoryGetter: Getter<EquipamentoRepository>,
  ) {
    super(Localizacao, dataSource);
    this.equipamentos = this.createHasManyRepositoryFactoryFor('equipamentos', equipamentoRepositoryGetter,);
    this.registerInclusionResolver('equipamentos', this.equipamentos.inclusionResolver);
  }
}
