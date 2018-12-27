import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
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
  public readonly artists: HasManyRepositoryFactory<
    Artist,
    typeof Series.prototype.id
  >;

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
    this.artists = this._createHasManyRepositoryFactoryFor(
      'artists',
      getArtistsRepository,
    );
    this.volumes = this._createHasManyRepositoryFactoryFor(
      'chapters',
      getVolumesRepository,
    );
    this.chapters = this._createHasManyRepositoryFactoryFor(
      'chapters',
      getChaptersRepository,
    );
  }
}
