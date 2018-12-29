import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Artist, Oneshot, Series} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OneshotRepository} from './oneshot.repository';
import {SeriesRepository} from './series.repository';

export class ArtistRepository extends DefaultCrudRepository<
  Artist,
  typeof Artist.prototype.id
> {
  public readonly oneshots: HasManyRepositoryFactory<
    Oneshot,
    typeof Artist.prototype.id
  >;

  public readonly series: HasManyRepositoryFactory<
    Series,
    typeof Artist.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('OneshotRepository')
    getOneshotRepository: Getter<OneshotRepository>,
    @repository.getter('SeriesRepository')
    getSeriesRepository: Getter<SeriesRepository>,
  ) {
    super(Artist, dataSource);
    this.oneshots = this.createHasManyRepositoryFactoryFor(
      'oneshots',
      getOneshotRepository,
    );
    this.series = this.createHasManyRepositoryFactoryFor(
      'series',
      getSeriesRepository,
    );
  }
}
