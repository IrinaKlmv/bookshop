import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Book } from "src/books/books.model";

interface AuthorCreationAttrs {
    fio: string;
    birthDate: string;
    deathDate: string;
}

@Table({tableName: 'authors'})
export class Author extends Model<Author, AuthorCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Пушкин А.С.', description: 'Имя автора'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    fio: string;

    @ApiProperty({example: '06.01.1799', description: 'Дата рождения'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    birthDate: string;

    @ApiProperty({example: '10.02.1837', description: 'Дата смерти'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    deathDate: string;

    @HasMany(() => Book)
    books: Book[];
}
