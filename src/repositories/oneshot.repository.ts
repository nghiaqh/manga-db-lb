import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Oneshot, Chapter, Artist} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ArtistRepository} from './artist.repository';
import {ChapterRepository} from './chapter.repository';

export class OneshotRepository extends DefaultCrudRepository<
  Oneshot,
  typeof Oneshot.prototype.id
> {
  public readonly artists: HasManyRepositoryFactory<
    Artist,
    typeof Oneshot.prototype.id
  >;

  public readonly chapters: HasManyRepositoryFactory<
    Chapter,
    typeof Oneshot.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('ArtistRepository')
    getArtistsRepository: Getter<ArtistRepository>,
    @repository.getter('ChapterRepository')
    getChaptersRepository: Getter<ChapterRepository>,
  ) {
    super(Oneshot, dataSource);
    this.artists = this._createHasManyRepositoryFactoryFor(
      'artists',
      getArtistsRepository,
    );
    this.chapters = this._createHasManyRepositoryFactoryFor(
      'chapters',
      getChaptersRepository,
    );
  }
}
