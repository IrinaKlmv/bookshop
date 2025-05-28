import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';
import { FilesService } from 'src/files/files.service';
import { SellBookDto } from './dto/sell-book.dto';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book) private booksRepository: typeof Book,
                private fileService: FilesService) {}

    async getAllBooks() {
        const books = await this.booksRepository.findAll();
        return books;
    }

    async createBook(dto: CreateBookDto, poster) {
        const fileName = await this.fileService.createFile(poster);
        const book = await this.booksRepository.create({...dto, poster: fileName});
        return book;
    }

    async sellBook(dto: SellBookDto) {
        const book = await this.booksRepository.findByPk(dto.bookId);

        if (book.quantity < dto.quantity) {
            throw new HttpException('На складе книг меньше, чем заказано', HttpStatus.BAD_REQUEST);
        }

        const cost = dto.quantity * book.price;
        if (dto.payed < cost) {
            throw new HttpException('Не хватает денег на книги', HttpStatus.BAD_REQUEST);
        }

        book.quantity -= dto.quantity;
        await book.save();

        return book;
    }
}
