import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/create-author.dto';

@ApiTags('Авторы')
@Controller('authors')
export class AuthorsController {
    constructor(private authorService: AuthorsService) {}

    @ApiOperation({summary: 'Список авторов'})
    @Get()
    async getAllAuthors() {
        const authors = await this.authorService.getAllAuthors();
        return authors;
    }

    @ApiOperation({summary: 'Создать автора'})
    @Post()
    async createAuthor(@Body() dto: CreateAuthorDto) {
        const author = await this.authorService.createAuthor(dto);
        return author;
    }
}
