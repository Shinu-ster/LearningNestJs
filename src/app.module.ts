import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';
// import { ConfigModule } from './config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
// import { ServiceModule } from './controller/service/service.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    // EpisodesModule,
    TopicsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        databaseConfig(configService),
    }),
    AuthModule,
    // ServiceModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//30. Making a demo db to make a simple CRUD
