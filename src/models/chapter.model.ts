import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import {Image} from './image.model';
import {Manga} from './manga.model';
import {Volume} from './volume.model';

@model()
export class Chapter extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  shortTitle?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  shortDescription?: string;

  @property({
    type: 'array',
    itemType: 'number',
  })
  preview?: number[];

  @property({
    type: 'number',
    required: true,
  })
  number: number;

  @property({
    type: 'date',
  })
  publishedAt: Date;

  @property({
    type: 'date',
  })
  modifiedAt: Date;

  @hasMany(() => Image, {keyTo: 'id'})
  images?: Image[];

  @belongsTo(() => Manga)
  mangaId: number;

  @belongsTo(() => Volume)
  volumeId?: number;

  constructor(data?: Partial<Chapter>) {
    super(data);
  }
}
