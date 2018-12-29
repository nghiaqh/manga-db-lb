import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  BelongsToAccessor,
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
  public readonly artist: BelongsToAccessor<
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
    this.artist = this.createBelongsToAccessorFor(
      'artist',
      getArtistsRepository,
    );
    this.chapters = this.createHasManyRepositoryFactoryFor(
      'chapters',
      getChaptersRepository,
    );
  }
}
