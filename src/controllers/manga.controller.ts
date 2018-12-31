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
import {Manga} from '../models';
import {MangaRepository} from '../repositories';

export class MangaController {
  constructor(
    @repository(MangaRepository)
    public mangaRepository: MangaRepository,
  ) {}

  @post('/mangas', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: {'application/json': {schema: {'x-ts-type': Manga}}},
      },
    },
  })
  async create(@requestBody() manga: Manga): Promise<Manga> {
    return await this.mangaRepository.create(manga);
  }

  @get('/mangas/count', {
    responses: {
      '200': {
        description: 'Manga model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Manga)) where?: Where,
  ): Promise<Count> {
    return await this.mangaRepository.count(where);
  }

  @get('/mangas', {
    responses: {
      '200': {
        description: 'Array of Manga model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Manga}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Manga)) filter?: Filter,
  ): Promise<Manga[]> {
    return await this.mangaRepository.find(filter);
  }

  @patch('/mangas', {
    responses: {
      '200': {
        description: 'Manga PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() manga: Manga,
    @param.query.object('where', getWhereSchemaFor(Manga)) where?: Where,
  ): Promise<Count> {
    return await this.mangaRepository.updateAll(manga, where);
  }

  @get('/mangas/{id}', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: {'application/json': {schema: {'x-ts-type': Manga}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Manga> {
    return await this.mangaRepository.findById(id);
  }

  @patch('/mangas/{id}', {
    responses: {
      '204': {
        description: 'Manga PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() manga: Manga,
  ): Promise<void> {
    await this.mangaRepository.updateById(id, manga);
  }

  @put('/mangas/{id}', {
    responses: {
      '204': {
        description: 'Manga PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() manga: Manga,
  ): Promise<void> {
    await this.mangaRepository.replaceById(id, manga);
  }

  @del('/mangas/{id}', {
    responses: {
      '204': {
        description: 'Manga DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mangaRepository.deleteById(id);
  }
}
