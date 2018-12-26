import {Entity, model, property, hasMany} from '@loopback/repository';
import {Image} from './image.model';
import {Volume} from './volume.model';
import {Chapter} from './chapter.model';
import {Artist} from './artist.model';

@model()
export class Series extends Entity {
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
    itemType: 'Image',
  })
  preview?: Image[];

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

  @hasMany(() => Artist)
  artists?: Artist[];

  constructor(data?: Partial<Series>) {
    super(data);
  }
}
