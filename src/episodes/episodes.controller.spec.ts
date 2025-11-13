import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  //16. We can pass mock providers instead of actuall service too
  const mockEpisodesService = {
    findAll: () => [{ id: 'id' }],
    findFeaturedEpisodes: () => [{ id: 'id' }],
    findOne: () => ({ id: 'id' }),
    create: () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    // 13. Auto Generated Testing Modules
    // to run testing do
    // 14. npm run test episodes.controller
    // Firstly it will fail cause it doesn't know how to inject Episodeservice and configService in it
    // we have to import them here too
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule], //Importing it here
      controllers: [EpisodesController],
      // providers: [EpisodesService], // Importing Service Class
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }], // 16. Providing mock service
    }).compile();

    // Extracting Controller for testing
    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // 17. Inorder to test the findOne Handler we are calling the
  // Controller instance method and we test that the value returned is the expected value
  describe('findOne', () => {
    it('should return correct response', () => {
      const episodeId = 'id';
      const result = controller.findOne(episodeId);
      expect(result).toEqual({ id: 'id' });
    });
  });
});

/*
15. Testing tests for Behaviour of Controller checking endpoints, returns values, status and also for db interactions error handlings and many more
*/
