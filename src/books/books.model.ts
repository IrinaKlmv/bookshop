import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Author } from "src/authors/authors.model";

interface BookCreationAttrs {
    name: string;
    year: number;
    pages: number;
    price: number;
    quantity: number;
    poster: string;
    authorId: number;
}

@Table({tableName: 'books'})
export class Book extends Model<Book, BookCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Евгений Онегин', description: 'Название книги'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @ApiProperty({example: '2010', description: 'Год издания'})
    @Column({type: DataType.INTEGER, allowNull: false})
    year: number;

    @ApiProperty({example: '200', description: 'Количество страниц'})
    @Column({type: DataType.INTEGER, allowNull: false})
    pages: number;

    @ApiProperty({example: '320', description: 'Цена за штуку'})
    @Column({type: DataType.FLOAT, allowNull: false})
    price: number;

    @ApiProperty({example: '10', description: 'Количество книг в ниличии'})
    @Column({type: DataType.INTEGER, allowNull: false})
    quantity: number;

    @ApiProperty({example: 'poster.jpg', description: 'Постер книги'})
    @Column({type: DataType.STRING})
    poster: string;

    @ForeignKey(() => Author)
    @Column({type: DataType.INTEGER})
    authorId: number;
}
