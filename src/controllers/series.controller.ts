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
import {Series} from '../models';
import {SeriesRepository} from '../repositories';

export class SeriesController {
  constructor(
    @repository(SeriesRepository)
    public seriesRepository : SeriesRepository,
  ) {}

  @post('/series', {
    responses: {
      '200': {
        description: 'Series model instance',
        content: {'application/json': {schema: {'x-ts-type': Series}}},
      },
    },
  })
  async create(@requestBody() series: Series): Promise<Series> {
    return await this.seriesRepository.create(series);
  }

  @get('/series/count', {
    responses: {
      '200': {
        description: 'Series model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Series)) where?: Where,
  ): Promise<Count> {
    return await this.seriesRepository.count(where);
  }

  @get('/series', {
    responses: {
      '200': {
        description: 'Array of Series model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Series}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Series)) filter?: Filter,
  ): Promise<Series[]> {
    return await this.seriesRepository.find(filter);
  }

  @patch('/series', {
    responses: {
      '200': {
        description: 'Series PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() series: Series,
    @param.query.object('where', getWhereSchemaFor(Series)) where?: Where,
  ): Promise<Count> {
    return await this.seriesRepository.updateAll(series, where);
  }

  @get('/series/{id}', {
    responses: {
      '200': {
        description: 'Series model instance',
        content: {'application/json': {schema: {'x-ts-type': Series}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Series> {
    return await this.seriesRepository.findById(id);
  }

  @patch('/series/{id}', {
    responses: {
      '204': {
        description: 'Series PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() series: Series,
  ): Promise<void> {
    await this.seriesRepository.updateById(id, series);
  }

  @put('/series/{id}', {
    responses: {
      '204': {
        description: 'Series PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() series: Series,
  ): Promise<void> {
    await this.seriesRepository.replaceById(id, series);
  }

  @del('/series/{id}', {
    responses: {
      '204': {
        description: 'Series DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.seriesRepository.deleteById(id);
  }
}
