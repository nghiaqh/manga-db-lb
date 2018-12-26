import {Entity, model, property} from '@loopback/repository';
import {Image} from './image.model';

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

  constructor(data?: Partial<Volume>) {
    super(data);
  }
}
