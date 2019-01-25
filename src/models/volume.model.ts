import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import { Chapter } from './chapter.model';
import { Manga } from './manga.model';

@model()
export class Volume extends Entity {
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
    mysql: {
      dataType: 'LONGTEXT'
    }
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
    type: 'boolean',
    default: false,
    required: true,
  })
  isNSFW: boolean;

  @property({
    type: 'date',
  })
  publishedAt: Date;

  @property({
    type: 'date',
  })
  modifiedAt: Date;

  @hasMany(() => Chapter, { keyTo: 'id' })
  chapters?: Chapter[];

  @belongsTo(() => Manga)
  mangaId: number;

  constructor(data?: Partial<Volume>) {
    super(data);
  }
}
