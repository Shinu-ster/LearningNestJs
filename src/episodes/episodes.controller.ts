import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
/*
    3.
    @Controller -> Decorator
    Requests and Responses
    Flow:
    Client -> Controller -> Service -> Database/Logic -> Controller -> Client
*/

// Commented out returns are simple https responses
// Which is replaced by 7. ServiceClass logics
@Controller('episodes')
export class EpisodesController {
  // This says controllers depends on EpisodesSerive to get data (Dependency Injection)
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService, // 12. Injecting Config Service
  ) {}

  @Get() // Get Request Decorator
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(sort);
    // return 'all episodes';
  }

  @Get('featured') // url is /episodes/featured
  findFeatured() {
    return this.episodesService.findFeatured();
    // return 'featured episodes';
  }

  @Get(':id') // Parametrized decorators
  findOne(@Param() id: string) {
    // 8. @Param Decorater extracts params from the url
    // It specifically picks id from the url instead of all params as object
    console.log(id);
    return this.episodesService.findOne(id);
    // return 'one episode';
  }

  @Post()
  create(@Body() input: CreateEpisodeDto) {
    // 9. @Body Decorater extracts the data sent in req.body
    console.log(input);
    return this.episodesService.create(input);
    // return 'new episodes';
  }
}
