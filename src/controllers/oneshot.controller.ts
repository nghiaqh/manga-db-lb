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
import {Oneshot} from '../models';
import {OneshotRepository} from '../repositories';

export class OneshotController {
  constructor(
    @repository(OneshotRepository)
    public oneshotRepository : OneshotRepository,
  ) {}

  @post('/oneshots', {
    responses: {
      '200': {
        description: 'Oneshot model instance',
        content: {'application/json': {schema: {'x-ts-type': Oneshot}}},
      },
    },
  })
  async create(@requestBody() oneshot: Oneshot): Promise<Oneshot> {
    return await this.oneshotRepository.create(oneshot);
  }

  @get('/oneshots/count', {
    responses: {
      '200': {
        description: 'Oneshot model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Oneshot)) where?: Where,
  ): Promise<Count> {
    return await this.oneshotRepository.count(where);
  }

  @get('/oneshots', {
    responses: {
      '200': {
        description: 'Array of Oneshot model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Oneshot}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Oneshot)) filter?: Filter,
  ): Promise<Oneshot[]> {
    return await this.oneshotRepository.find(filter);
  }

  @patch('/oneshots', {
    responses: {
      '200': {
        description: 'Oneshot PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() oneshot: Oneshot,
    @param.query.object('where', getWhereSchemaFor(Oneshot)) where?: Where,
  ): Promise<Count> {
    return await this.oneshotRepository.updateAll(oneshot, where);
  }

  @get('/oneshots/{id}', {
    responses: {
      '200': {
        description: 'Oneshot model instance',
        content: {'application/json': {schema: {'x-ts-type': Oneshot}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Oneshot> {
    return await this.oneshotRepository.findById(id);
  }

  @patch('/oneshots/{id}', {
    responses: {
      '204': {
        description: 'Oneshot PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() oneshot: Oneshot,
  ): Promise<void> {
    await this.oneshotRepository.updateById(id, oneshot);
  }

  @put('/oneshots/{id}', {
    responses: {
      '204': {
        description: 'Oneshot PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() oneshot: Oneshot,
  ): Promise<void> {
    await this.oneshotRepository.replaceById(id, oneshot);
  }

  @del('/oneshots/{id}', {
    responses: {
      '204': {
        description: 'Oneshot DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.oneshotRepository.deleteById(id);
  }
}
