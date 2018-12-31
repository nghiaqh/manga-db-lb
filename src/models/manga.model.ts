import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import {Volume} from './volume.model';
import {Chapter} from './chapter.model';
import {Artist} from './artist.model';

@model()
export class Manga extends Entity {
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
  description?: string;

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
  isCompleted: boolean;

  @property({
    type: 'boolean',
    default: false,
    required: true,
  })
  isSeries: boolean;

  @property({
    type: 'boolean',
    default: false,
    required: true,
  })
  isTankoubou: boolean;

  @property({
    type: 'boolean',
    default: false,
    required: true,
  })
  isDoujinshi: boolean;

  @property({
    type: 'boolean',
    default: false,
    required: true,
  })
  isNSFW: boolean;

  @hasMany(() => Volume, {keyTo: 'id'})
  volumes?: Volume[];

  @hasMany(() => Chapter, {keyTo: 'id'})
  chapters?: Chapter[];

  @belongsTo(() => Artist)
  artistId: number;

  constructor(data?: Partial<Manga>) {
    super(data);
  }
}
