import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<Artist>) {
    super(data);
  }
}
