import { Request, Response } from "express";
import log from "../logger";
import sequelize from "../db/connect";
import { createBook, deleteBook, getBooks, getBook, updateBook } from "../service/books.service";


export async function createBookHandler(req:Request, res: Response) {
    const body = req.body;
    try {
        const result = await createBook(body)
        return res.send(result);
    } catch (error) {
        res.status(400)
        return res.send(error);
    }
}

export async function getBooksHandler(req:Request, res: Response) {
    try {
        const results = await getBooks();
        return res.send(results)
    } catch(error: any) {
        res.status(400)
        return res.send(error)
    }
}

export async function getBookHandler(req:Request, res: Response) {
    const id = req.params.id
    try {
        const results = await getBook(id);
        return res.send(results)
    } catch(error: any) {
        res.status(400)
        return res.send(error)
    }
}

export async function deleteBookHandler(req:Request, res: Response) {
    const id = req.params.id
    try {
        const result = await deleteBook(id)
        return res.send(result);
    } catch(error: any) {
        res.status(400)
        return res.send(error)
    }
}

export async function updateBookHandler(req:Request, res: Response) {
    const body = req.body;
    const idToUpdate = req.params.id
    try {
        const result = await updateBook(idToUpdate, body)
        return res.send(result);
    } catch (error) {
        res.status(400)
        return res.send(error);
    }
}