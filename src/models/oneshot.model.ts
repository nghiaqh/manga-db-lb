import {Entity, model, property} from '@loopback/repository';
import {Image} from './image.model';

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

  constructor(data?: Partial<Oneshot>) {
    super(data);
  }
}
