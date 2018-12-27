import {
  DefaultCrudRepository,
  juggler,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {Image, Chapter} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ChapterRepository} from './chapter.repository';

export class ImageRepository extends DefaultCrudRepository<
  Image,
  typeof Image.prototype.id
> {
  public readonly chapter: BelongsToAccessor<
    Chapter,
    typeof Image.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('ChapterRepository')
    getChaptersRepository: Getter<ChapterRepository>,
  ) {
    super(Image, dataSource);
    this.chapter = this._createBelongsToAccessorFor(
      'chapter',
      getChaptersRepository,
    );
  }
}
