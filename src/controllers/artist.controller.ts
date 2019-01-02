import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Artist, Manga } from '../models';
import { ArtistRepository } from '../repositories';

export class ArtistController {
  constructor(
    @repository(ArtistRepository)
    public artistRepository: ArtistRepository,
  ) { }

  @post('/api/artists', {
    responses: {
      '200': {
        description: 'Artist model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Artist } } },
      },
    },
  })
  async create(@requestBody() artist: Artist): Promise<Artist> {
    return await this.artistRepository.create(artist);
  }

  @get('/api/artists/count', {
    responses: {
      '200': {
        description: 'Artist model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Artist)) where?: Where,
  ): Promise<Count> {
    return await this.artistRepository.count(where);
  }

  @get('/api/artists', {
    responses: {
      '200': {
        description: 'Array of Artist model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Artist } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Artist)) filter?: Filter,
  ): Promise<Artist[]> {
    return await this.artistRepository.find(filter);
  }

  @patch('/api/artists', {
    responses: {
      '200': {
        description: 'Artist PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() artist: Artist,
    @param.query.object('where', getWhereSchemaFor(Artist)) where?: Where,
  ): Promise<Count> {
    return await this.artistRepository.updateAll(artist, where);
  }

  @get('/api/artists/{id}', {
    responses: {
      '200': {
        description: 'Artist model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Artist } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Artist> {
    return await this.artistRepository.findById(id);
  }

  @patch('/api/artists/{id}', {
    responses: {
      '204': {
        description: 'Artist PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() artist: Artist,
  ): Promise<void> {
    await this.artistRepository.updateById(id, artist);
  }

  @put('/api/artists/{id}', {
    responses: {
      '204': {
        description: 'Artist PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() artist: Artist,
  ): Promise<void> {
    await this.artistRepository.replaceById(id, artist);
  }

  @del('/api/artists/{id}', {
    responses: {
      '204': {
        description: 'Artist DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.artistRepository.deleteById(id);
  }
}
