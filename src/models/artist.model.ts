import { Entity, model, property, hasMany } from '@loopback/repository';
import { Manga } from './manga.model';

@model()
export class Artist extends Entity {
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
  name: string;

  @property({
    type: 'string',
    dataLength: 65000,
  })
  biography?: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'LONGTEXT'
    }
  })
  shortBiography?: string;

  @property({
    type: 'object',
  })
  avatar?: object;

  @property({
    type: 'string',
    default: 'mangaka',
  })
  type?: string;

  @hasMany(() => Manga, { keyTo: 'id' })
  mangas?: Manga[];

  constructor(data?: Partial<Artist>) {
    super(data);
  }
}
