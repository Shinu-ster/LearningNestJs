import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { ApiKeyGuard } from 'src/api-key/api-key.guard';

/*
    3.
    @Controller -> Decorator
    Requests and Responses
    Flow:
    Client -> Controller -> Service -> Database/Logic -> Controller -> Client
*/

// 28.
UseGuards(ApiKeyGuard); // Passing guard to all the episode route
// To access this route you need to have valid request headers

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
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number, // 25. adding new query to limit the number of episodes returned
    // DefaultValuePipe does the following
    // if the limit parameter is present use the limit parameter
    // if not then use the default value 100
    // ParseIntPipe - Transform the string value to a number
    // Shit tons of pipes are present check docs
    // We can even create custom pipes
  ) {
    console.log(sort);
    // return 'all episodes';
    return this.episodesService.findAll(sort);
  }

  @Get('featured') // url is /episodes/featured
  findFeatured() {
    return this.episodesService.findFeatured();
    // return 'featured episodes';
  }

  @Get(':id') // Parametrized decorators
  async findOne(@Param() id: string) {
    // 8. @Param Decorater extracts params from the url
    // It specifically picks id from the url instead of all params as object
    console.log(id);
    // return this.episodesService.findOne(id); 24.
    // adding a handler to handle when episode not found
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found'); //  These exceptions returns status code automaticallly
    }
    return episode;
    // return 'one episode';
  }

  // 29. Gaurds can also be passed to single handler to by following
  // @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() input: CreateEpisodeDto) {
    // 9. @Body Decorater extracts the data sent in req.body
    console.log(input);
    return this.episodesService.create(input);
    // return 'new episodes';
  }
}
