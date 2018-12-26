import {Entity, model, property, hasMany} from '@loopback/repository';
import {Image} from './image.model';
import {Artist} from './artist.model';
import {Chapter} from './chapter.model';

@model()
export class Oneshot extends Entity {
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

  @hasMany(() => Artist)
  artists?: Artist[];

  @hasMany(() => Chapter)
  chapters?: Chapter[];

  constructor(data?: Partial<Oneshot>) {
    super(data);
  }
}
