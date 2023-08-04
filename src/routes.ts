import { Express, Request, Response } from 'express';
import {
    createBookHandler,
    deleteBookHandler,
    getBookHandler,
    getBooksHandler,
    updateBookHandler
} from './controller/books.controller';
import {validateRequest} from './middleware';

import { createBookSchema, deleteBookSchema } from './schema/book.schema';


export default function(app: Express) {
    // get all books
    app.get('/api/books', getBooksHandler);

    // create new book
    app.post('/api/books', validateRequest(createBookSchema) ,createBookHandler);

    // get book with id
    app.get('/api/books/:id', getBookHandler);

    // update book with id
    app.put('/api/books/:id', updateBookHandler);

    // delete book with id
    app.delete('/api/books/:id', validateRequest(deleteBookSchema), deleteBookHandler);

    // check server health
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
}