import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './books.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    SequelizeModule.forFeature([Book]),
    FilesModule
  ]
})
export class BooksModule {}
