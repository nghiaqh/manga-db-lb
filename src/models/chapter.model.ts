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

  @property({
    type: 'number',
    required: true,
  })
  number: number;

  @hasMany(() => Image)
  images?: Image[];

  @belongsTo(() => Oneshot)
  onshotId: string;

  @belongsTo(() => Series)
  seriesId: string;

  @belongsTo(() => Volume)
  volumeId: string;

  constructor(data?: Partial<Chapter>) {
    super(data);
  }
}
