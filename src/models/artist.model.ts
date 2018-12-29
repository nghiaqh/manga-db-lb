import {Entity, model, property, hasMany} from '@loopback/repository';
import {Oneshot} from './oneshot.model';
import {Series} from './series.model';

@model()
export class Artist extends Entity {
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
  oneshots?: Oneshot[];

  @hasMany(() => Series)
  series?: Series[];

  constructor(data?: Partial<Artist>) {
    super(data);
  }
}
