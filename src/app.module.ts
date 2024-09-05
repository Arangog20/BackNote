import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import dbConfig from './persistence/db-config';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './persistence';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    NoteModule,
    PersistenceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
