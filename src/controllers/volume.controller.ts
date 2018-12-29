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
import {Volume} from '../models';
import {VolumeRepository} from '../repositories';

export class VolumeController {
  constructor(
    @repository(VolumeRepository)
    public volumeRepository : VolumeRepository,
  ) {}

  @post('/volumes', {
    responses: {
      '200': {
        description: 'Volume model instance',
        content: {'application/json': {schema: {'x-ts-type': Volume}}},
      },
    },
  })
  async create(@requestBody() volume: Volume): Promise<Volume> {
    return await this.volumeRepository.create(volume);
  }

  @get('/volumes/count', {
    responses: {
      '200': {
        description: 'Volume model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Volume)) where?: Where,
  ): Promise<Count> {
    return await this.volumeRepository.count(where);
  }

  @get('/volumes', {
    responses: {
      '200': {
        description: 'Array of Volume model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Volume}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Volume)) filter?: Filter,
  ): Promise<Volume[]> {
    return await this.volumeRepository.find(filter);
  }

  @patch('/volumes', {
    responses: {
      '200': {
        description: 'Volume PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() volume: Volume,
    @param.query.object('where', getWhereSchemaFor(Volume)) where?: Where,
  ): Promise<Count> {
    return await this.volumeRepository.updateAll(volume, where);
  }

  @get('/volumes/{id}', {
    responses: {
      '200': {
        description: 'Volume model instance',
        content: {'application/json': {schema: {'x-ts-type': Volume}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Volume> {
    return await this.volumeRepository.findById(id);
  }

  @patch('/volumes/{id}', {
    responses: {
      '204': {
        description: 'Volume PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() volume: Volume,
  ): Promise<void> {
    await this.volumeRepository.updateById(id, volume);
  }

  @put('/volumes/{id}', {
    responses: {
      '204': {
        description: 'Volume PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() volume: Volume,
  ): Promise<void> {
    await this.volumeRepository.replaceById(id, volume);
  }

  @del('/volumes/{id}', {
    responses: {
      '204': {
        description: 'Volume DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.volumeRepository.deleteById(id);
  }
}
