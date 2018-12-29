import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import {Image} from './image.model';
import {Oneshot} from './oneshot.model';
import {Series} from './series.model';
import {Volume} from './volume.model';

@model()
export class Chapter extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  number: number;

  @hasMany(() => Image)
  images?: Image[];

  @belongsTo(() => Oneshot)
  oneshotId: number;

  @belongsTo(() => Series)
  seriesId: number;

  @belongsTo(() => Volume)
  volumeId: number;

  constructor(data?: Partial<Chapter>) {
    super(data);
  }
}
