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
    type: 'array',
    itemType: 'number',
  })
  preview?: number[];

  @hasMany(() => Chapter)
  chapters?: Chapter[];

  @belongsTo(() => Series)
  seriesId: number;

  constructor(data?: Partial<Volume>) {
    super(data);
  }
}
