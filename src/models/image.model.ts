import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Chapter } from './chapter.model';

@model()
export class Image extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  src: string;

  @property({
    type: 'number',
    required: true,
  })
  number: number;

  @property({
    type: 'number',
    required: true,
  })
  width: number;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @property({
    type: 'number',
    required: true,
  })
  ratio: number;

  @property({
    type: 'boolean',
    default: false,
    required: true,
  })
  isNSFW: boolean;

  @belongsTo(() => Chapter)
  chapterId: number;

  constructor(data?: Partial<Image>) {
    super(data);
  }
}
