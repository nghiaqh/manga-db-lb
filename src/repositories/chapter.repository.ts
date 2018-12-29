import {
  DefaultCrudRepository,
  juggler,
  BelongsToAccessor,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Chapter, Oneshot, Series, Volume, Image} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OneshotRepository} from './oneshot.repository';
import {SeriesRepository} from './series.repository';
import {VolumeRepository} from './volume.repository';
import {ImageRepository} from './image.repository';

export class ChapterRepository extends DefaultCrudRepository<
  Chapter,
  typeof Chapter.prototype.id
> {
  public readonly oneshot: BelongsToAccessor<
    Oneshot,
    typeof Chapter.prototype.id
  >;

  public readonly series: BelongsToAccessor<
    Series,
    typeof Chapter.prototype.id
  >;

  public readonly volume: BelongsToAccessor<
    Volume,
    typeof Chapter.prototype.id
  >;

  public readonly images: HasManyRepositoryFactory<
    Image,
    typeof Chapter.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('OneshotRepository')
    getOneshotRepository: Getter<OneshotRepository>,
    @repository.getter('SeriesRepository')
    getSeriesRepository: Getter<SeriesRepository>,
    @repository.getter('VolumeRepository')
    getVolumeRepository: Getter<VolumeRepository>,
    @repository.getter('ImageRepository')
    getImagesRepository: Getter<ImageRepository>,
  ) {
    super(Chapter, dataSource);
    this.oneshot = this.createBelongsToAccessorFor(
      'oneshot',
      getOneshotRepository,
    );
    this.series = this.createBelongsToAccessorFor(
      'series',
      getSeriesRepository,
    );
    this.volume = this.createBelongsToAccessorFor(
      'volume',
      getVolumeRepository,
    );
    this.images = this.createHasManyRepositoryFactoryFor(
      'images',
      getImagesRepository,
    );
  }
}
