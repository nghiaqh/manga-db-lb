import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import {Image} from './image.model';
import {Volume} from './volume.model';
import {Chapter} from './chapter.model';
import {Artist} from './artist.model';

@model()
export class Series extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    default: 'Manga',
  })
  type?: string;

  @property({
    type: 'array',
    itemType: 'number',
  })
  preview?: number[];

  @property({
    type: 'boolean',
    default: false,
    required: true,
  })
  isCompleted: string;

  @hasMany(() => Volume)
  volumes?: Volume[];

  @hasMany(() => Chapter)
  chapters?: Chapter[];

  @belongsTo(() => Artist)
  artistId: number;

  constructor(data?: Partial<Series>) {
    super(data);
  }
}
