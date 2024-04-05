//päring tuleb sisse, hakkab jooksma

import express from "express";

//const express = require("express"); <- vanamoodi

import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import CMC_API from "./services/CMCApi.js";

dotenv.config(); // Et loeks .env failist asju 

const app = express(); //tõmbab serveri käima peale kasutaja requesti

const PORT = process.env.PORT || 3000; //valid pordi, mida kasutada, määratud .env failis , kui seal pole siis (või (||)) teistele port 3000

app.use(express.json()); // middleware - turvamees: kontrollib (requesti) päringut, autoriseerimist, cors-i, saab panna ka ainult ühele endpointile
//praegusel juhul teeb json faili, et inimesel oleks lihtsam aru saada

app.use(morgan()); //morgan logib requesti ära, kes serveris liigub, mida küsis

app.use(
    cors({ 
        origin: ["http://localhost:5173"],
        optionsSuccessStatus: 200,
    })
);  //kas päriv url on lubatud või mitte. kui sulud tühjad, siis kõik saavad ligi, hetkel ainult üks


app.get("/", (request, response) => {
    response.send({
        message: "Teretulemast minu backendi",
    });
}); //end-pointi tegemine, read only, praegu vastab root küsimusele requesti ja vastusega

app.get("/cryptocurrency/categories", async (request, response) => {
    const catecoryResponse = await CMC_API.get("/v1/cryptocurrency/categories");

    if(!catecoryResponse) {
        response.status(404).send({
            message: "Kategooriaid ei leitud. Hoia FIAT'is",
        });
    }

    response.status(200).json(catecoryResponse);
});


//app.post();

app.listen(PORT,() => {
    console.log(`Server listening on PORT ${PORT}`);
} ); //anname ette, mis porti kuulata. Hea tava logida välja, et kuulamine toimub, et aru saada kas server töötab

// "Server listening " + PORT - vanamoodi string + muutuja printimine