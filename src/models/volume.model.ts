import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import {Image} from './image.model';
import {Chapter} from './chapter.model';
import {Series} from './series.model';

@model()
export class Volume extends Entity {
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
    itemType: 'Image',
  })
  preview?: Image[];

  @hasMany(() => Chapter)
  chapters?: Chapter[];

  @belongsTo(() => Series)
  seriesId: string;

  constructor(data?: Partial<Volume>) {
    super(data);
  }
}
