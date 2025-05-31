import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

    async getAllAuthors() {
        const authors = await this.authorRepository.findAll({include: {all: true}});
        return authors;
    }

    async createAuthor(dto: CreateAuthorDto) {
        const author = await this.authorRepository.create(dto);
        return author;
    }
}
