import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Book } from './books.model';
import { SellBookDto } from './dto/sell-book.dto';

@ApiTags('Книги')
@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @ApiOperation({summary: 'Получить все книги'})
    @ApiResponse({status: 200, type: [Book]})
    @Get()
    getAll() {
        return this.booksService.getAllBooks();
    }

    @ApiOperation({summary: 'Создать книгу'})
    @ApiResponse({status: 200, type: Book})
    @Post()
    @UseInterceptors(FileInterceptor('poster'))
    createBook(@Body() dto: CreateBookDto,
               @UploadedFile() poster) {
        return this.booksService.createBook(dto, poster);
    }

    @ApiOperation({summary: 'Продать книгу'})
    @ApiResponse({status: 200, type: Book})
    @Post('/sell')
    sellBook(@Body() dto: SellBookDto) {
        return this.booksService.sellBook(dto);
    }
}
