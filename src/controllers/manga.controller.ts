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

  @post('/mangas', {
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

  @get('/mangas/count', {
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

  @get('/mangas', {
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
    @param.query.object('filter', getFilterSchemaFor(Manga)) filter?: Filter,
    @param.query.string('includeArtist') includeArtist?: boolean,
  ): Promise<Manga[] | object[]> {
    const mangas = await this.mangaRepository.find(filter);

    // workaround as filter[include]=artist does not work
    if (includeArtist) {
      const result = []
      for (const manga of mangas) {
        const artist = await this.mangaRepository.artist(manga.id)
        result.push({
          ...manga,
          artist
        })
      }

      return result
    }

    return mangas
  }

  @patch('/mangas', {
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

  @get('/mangas/{id}', {
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
        limit: 1
      })
      previewImages = await this.imageRepository.find({
        where: {
          chapterId: firstChapter[0].id
        },
        limit: 4,
        order: ['number']
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
