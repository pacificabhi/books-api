import { error } from "console";
import sequelize from "../db/connect";
import log from "../logger";
import { BookData } from "../models/books.model";

const tableName = 'books'

export async function createBook(book: BookData) {
    const id = book.id
    const title = book.title
    const author = book.author
    const publishedYear = book.publishedYear

    const sql = `INSERT INTO ${tableName} (id, title, author, publishedyear) VALUES ('${id}', '${title}', '${author}', '${publishedYear}');`;
    try {
        await sequelize.query(sql, {raw: true})
        return book
    } catch (error:any) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            throw `id '${id}' already exists`
        }
        throw 'Something went wrong'
    }
}

export async function deleteBook(id: string) {
    const doesExist = await getBook(id);
    if(doesExist.length == 0) {
        throw `${id} does not exist`
    }
    const sql = `DELETE from ${tableName} WHERE id='${id}'`
    const [results, metadata] = await sequelize.query(sql, {raw: true})
    return `${id} deleted`
}

export async function getBooks() {
    
    const sql = `SELECT * from ${tableName}`
    const [results, metadata] = await sequelize.query(sql, {raw: true})
    return results
}

export async function getBook(id: string) {
    const sql = `SELECT * from ${tableName} WHERE id='${id}'`
    const [results, metadata] = await sequelize.query(sql, {raw: true})
    if(results.length == 0) {
        throw `${id} does not exist`
    }
    return results
}


export async function updateBook(idToUpdate: string, book: BookData) {
    const id = book.id

    if(id !== idToUpdate) {
        throw `id to update with ${idToUpdate} not matched id passed in body (${id})`
    }

    const doesExist = await getBook(idToUpdate);
    if(doesExist.length == 0) {
        throw `${idToUpdate} does not exist`
    }

    const title = book.title
    const author = book.author
    const publishedYear = book.publishedYear


    const sql = `UPDATE ${tableName} SET title='${title}', author='${author}', publishedyear='${publishedYear}' WHERE id='${idToUpdate}';`;
    try {
        await sequelize.query(sql, {raw: true})
        return book
    } catch (error:any) {
        throw 'Something went wrong'
    }
}