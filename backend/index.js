import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js"

const app = express();

app.use(express.json());

mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
        console.log("Connected to database");
        app.listen(process.env.PORT, () => {
            console.log(`listening on port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Hi");
});

app.get("/books", async (req, res) => {
    
})

app.post("/books", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    }   catch (error) {
            console.log(error.message);
            res.status(500).send({message: error.message});
    }
});





