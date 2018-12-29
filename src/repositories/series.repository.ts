import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {Series, Volume, Chapter, Artist} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ArtistRepository} from './artist.repository';
import {VolumeRepository} from './volume.repository';
import {ChapterRepository} from './chapter.repository';

export class SeriesRepository extends DefaultCrudRepository<
  Series,
  typeof Series.prototype.id
> {
  public readonly artist: BelongsToAccessor<Artist, typeof Series.prototype.id>;

  public readonly volumes: HasManyRepositoryFactory<
    Volume,
    typeof Series.prototype.id
  >;

  public readonly chapters: HasManyRepositoryFactory<
    Chapter,
    typeof Series.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('ArtistRepository')
    getArtistsRepository: Getter<ArtistRepository>,
    @repository.getter('VolumeRepository')
    getVolumesRepository: Getter<VolumeRepository>,
    @repository.getter('ChapterRepository')
    getChaptersRepository: Getter<ChapterRepository>,
  ) {
    super(Series, dataSource);
    this.artist = this.createBelongsToAccessorFor(
      'artist',
      getArtistsRepository,
    );
    this.volumes = this.createHasManyRepositoryFactoryFor(
      'chapters',
      getVolumesRepository,
    );
    this.chapters = this.createHasManyRepositoryFactoryFor(
      'chapters',
      getChaptersRepository,
    );
  }
}
