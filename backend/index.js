import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js"

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

app.use("/books", bookRoutes);





