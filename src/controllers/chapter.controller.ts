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
import {Chapter} from '../models';
import {ChapterRepository} from '../repositories';

export class ChapterController {
  constructor(
    @repository(ChapterRepository)
    public chapterRepository : ChapterRepository,
  ) {}

  @post('/chapters', {
    responses: {
      '200': {
        description: 'Chapter model instance',
        content: {'application/json': {schema: {'x-ts-type': Chapter}}},
      },
    },
  })
  async create(@requestBody() chapter: Chapter): Promise<Chapter> {
    return await this.chapterRepository.create(chapter);
  }

  @get('/chapters/count', {
    responses: {
      '200': {
        description: 'Chapter model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Chapter)) where?: Where,
  ): Promise<Count> {
    return await this.chapterRepository.count(where);
  }

  @get('/chapters', {
    responses: {
      '200': {
        description: 'Array of Chapter model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Chapter}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Chapter)) filter?: Filter,
  ): Promise<Chapter[]> {
    return await this.chapterRepository.find(filter);
  }

  @patch('/chapters', {
    responses: {
      '200': {
        description: 'Chapter PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() chapter: Chapter,
    @param.query.object('where', getWhereSchemaFor(Chapter)) where?: Where,
  ): Promise<Count> {
    return await this.chapterRepository.updateAll(chapter, where);
  }

  @get('/chapters/{id}', {
    responses: {
      '200': {
        description: 'Chapter model instance',
        content: {'application/json': {schema: {'x-ts-type': Chapter}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Chapter> {
    return await this.chapterRepository.findById(id);
  }

  @patch('/chapters/{id}', {
    responses: {
      '204': {
        description: 'Chapter PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() chapter: Chapter,
  ): Promise<void> {
    await this.chapterRepository.updateById(id, chapter);
  }

  @put('/chapters/{id}', {
    responses: {
      '204': {
        description: 'Chapter PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() chapter: Chapter,
  ): Promise<void> {
    await this.chapterRepository.replaceById(id, chapter);
  }

  @del('/chapters/{id}', {
    responses: {
      '204': {
        description: 'Chapter DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.chapterRepository.deleteById(id);
  }
}
