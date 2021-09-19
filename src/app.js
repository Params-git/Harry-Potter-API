const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const { getCharacters, getCharacterById, addOrUpdateCharacter, deleteCharacter } = require("../db/dynamo");
const hbs = require("hbs");
const routes = require("../router/route");

app.use(express.json());
app.set('view engine', 'hbs');
app.use(routes);

app.listen(port, () => {
    console.log(`connection setup at ${port}`);
})