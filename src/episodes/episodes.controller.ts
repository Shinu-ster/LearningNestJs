import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
  @Get() // Get Request Decorator
  findAll() {
    return 'all episodes';
  }

  @Get('featured') // url is /episodes/featured
  findFeatured() {
    return 'featured episodes';
  }

  @Get(':id') // Parametrized decorators
  findOne(@Param() id: string) {
    console.log(id);
    return 'one episode';
  }

  @Post()
  create() {
    return 'new episodes';
  }
}
