import {Entity, model, property, hasMany} from '@loopback/repository';
import {Oneshot} from './oneshot.model';
import {Series} from './series.model';

@model()
export class Artist extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  biography?: string;

  @property({
    type: 'object',
  })
  avatar?: object;

  @property({
    type: 'string',
  })
  type?: string;

  @hasMany(() => Oneshot)
  onshots?: Oneshot[];

  @hasMany(() => Series)
  series?: Series[];

  constructor(data?: Partial<Artist>) {
    super(data);
  }
}
