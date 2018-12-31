import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Artist, Manga} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';

export class ArtistRepository extends DefaultCrudRepository<
  Artist,
  typeof Artist.prototype.id
> {
  public readonly mangas: HasManyRepositoryFactory<
    Manga,
    typeof Artist.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('MangaRepository')
    getMangaRepository: Getter<MangaRepository>,
  ) {
    super(Artist, dataSource);

    this.mangas = this.createHasManyRepositoryFactoryFor(
      'mangas',
      getMangaRepository,
    );
  }
}
