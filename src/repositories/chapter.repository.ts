import {
  DefaultCrudRepository,
  BelongsToAccessor,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Chapter, Manga, Volume, Image} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';
import {VolumeRepository} from './volume.repository';
import {ImageRepository} from './image.repository';

export class ChapterRepository extends DefaultCrudRepository<
  Chapter,
  typeof Chapter.prototype.id
> {
  public readonly manga: BelongsToAccessor<Manga, typeof Chapter.prototype.id>;

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
    @repository.getter('MangaRepository')
    getMangaRepository: Getter<MangaRepository>,
    @repository.getter('VolumeRepository')
    getVolumeRepository: Getter<VolumeRepository>,
    @repository.getter('ImageRepository')
    getImagesRepository: Getter<ImageRepository>,
  ) {
    super(Chapter, dataSource);
    this.manga = this.createBelongsToAccessorFor('manga', getMangaRepository);
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
