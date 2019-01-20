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
import { Manga, Image } from '../models';
import { MangaRepository, VolumeRepository, ChapterRepository, ImageRepository } from '../repositories';

export class MangaController {
  constructor(
    @repository(MangaRepository)
    public mangaRepository: MangaRepository,
    @repository(ChapterRepository)
    public chapterRepository: ChapterRepository,
    @repository(VolumeRepository)
    public volumeRepository: VolumeRepository,
    @repository(ImageRepository)
    public imageRepository: ImageRepository
  ) { }

  @post('/api/mangas', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Manga } } },
      },
    },
  })
  async create(@requestBody() manga: Manga): Promise<Manga> {
    return await this.mangaRepository.create(manga);
  }

  @get('/api/mangas/count', {
    responses: {
      '200': {
        description: 'Manga model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Manga)) where?: Where,
  ): Promise<Count> {
    return await this.mangaRepository.count(where);
  }

  @get('/api/mangas', {
    responses: {
      '200': {
        description: 'Array of Manga model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Manga } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Manga)) filter?: Filter
  ): Promise<Manga[] | object[]> {

    const mangas = await this.mangaRepository.find(filter);

    // workaround as filter[include]=artist does not work
    const result = []
    for (const manga of mangas) {
      const data = await this.getMangaData(manga)
      result.push(data)
    }

    return result
  }

  @patch('/api/mangas', {
    responses: {
      '200': {
        description: 'Manga PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() manga: Manga,
    @param.query.object('where', getWhereSchemaFor(Manga)) where?: Where,
  ): Promise<Count> {
    return await this.mangaRepository.updateAll(manga, where);
  }

  @get('/api/mangas/{id}', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Manga } } },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number
  ): Promise<Manga | object> {
    const manga = await this.mangaRepository.findById(id);
    return await this.getMangaData(manga)
  }

  @patch('/api/mangas/{id}', {
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

  @put('/api/mangas/{id}', {
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

  @del('/api/mangas/{id}', {
    responses: {
      '204': {
        description: 'Manga DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mangaRepository.deleteById(id);
  }

  async getMangaData(manga: Manga): Promise<object> {
    // number of volumes
    const volumesCount = await this.volumeRepository.count({ mangaId: manga.id })

    // number of chapters
    const chaptersCount = await this.chapterRepository.count({ mangaId: manga.id })

    // get artist details
    const artist = await this.mangaRepository.artist(manga.id)

    // get preview images
    let previewImages: Image[] = []

    if (manga.preview) {
      for (const imageId of manga.preview) {
        const images = await this.imageRepository.find({
          where: {
            id: imageId
          }
        })
        previewImages = previewImages.concat(images)
      }
    }
    else if (chaptersCount.count) {
      const firstChapter = await this.chapterRepository.find({
        where: {
          mangaId: manga.id
        },
        limit: 1,
        order: manga.isSeries ? ['number DESC'] : ['number ASC']
      })
      previewImages = await this.imageRepository.find({
        where: {
          chapterId: firstChapter[0].id
        },
        limit: 4,
        order: ['number ASC']
      })
    }

    return {
      ...manga,
      artist,
      volumesCount: volumesCount.count,
      chaptersCount: chaptersCount.count,
      previewImages
    }
  }
}
