import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {Volume, Manga, Chapter} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';
import {ChapterRepository} from './chapter.repository';

export class VolumeRepository extends DefaultCrudRepository<
  Volume,
  typeof Volume.prototype.id
> {
  public readonly manga: BelongsToAccessor<Manga, typeof Chapter.prototype.id>;

  public readonly chapters: HasManyRepositoryFactory<
    Chapter,
    typeof Manga.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('MangaRepository')
    getMangaRepository: Getter<MangaRepository>,
    @repository.getter('ChapterRepository')
    getChaptersRepository: Getter<ChapterRepository>,
  ) {
    super(Volume, dataSource);
    this.manga = this.createBelongsToAccessorFor('manga', getMangaRepository);
    this.chapters = this.createHasManyRepositoryFactoryFor(
      'chapters',
      getChaptersRepository,
    );
  }
}
