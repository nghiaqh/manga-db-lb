import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {Volume, Series, Chapter} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SeriesRepository} from './series.repository';
import {ChapterRepository} from './chapter.repository';

export class VolumeRepository extends DefaultCrudRepository<
  Volume,
  typeof Volume.prototype.id
> {
  public readonly series: BelongsToAccessor<
    Series,
    typeof Chapter.prototype.id
  >;

  public readonly chapters: HasManyRepositoryFactory<
    Chapter,
    typeof Series.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('SeriesRepository')
    getSeriesRepository: Getter<SeriesRepository>,
    @repository.getter('ChapterRepository')
    getChaptersRepository: Getter<ChapterRepository>,
  ) {
    super(Volume, dataSource);
    this.series = this._createBelongsToAccessorFor(
      'series',
      getSeriesRepository,
    );
    this.chapters = this._createHasManyRepositoryFactoryFor(
      'chapters',
      getChaptersRepository,
    );
  }
}
