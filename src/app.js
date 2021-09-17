const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const { getCharacters, getCharacterById, addOrUpdateCharacter, deleteCharacter } = require("../db/dynamo");

app.use(express.json());

app.get("", (req, res) => {
    res.send("Hello World")
})

app.get('/characters', async (req, res) => {
    try {
        const characters = await getCharacters();
        res.json(characters);
    } catch (e) {
        res.status(500).json({ err: 'something went worng' });
    }
})

app.get('/characters/staff', async (req, res) => {
    try {
        const characters = await getCharacters();
        const arr = [];
        for (let i = 0; i < 25; i++) {
            if (characters.Items[i].hogwartsStaff) {
                arr.splice(arr.length, 0, characters.Items[i])
            }
        }
        res.json(arr);
    } catch (e) {
        res.status(500).json({ err: 'something went worng' });
    }
});

app.get('/characters/student', async (req, res) => {
    try {
        const characters = await getCharacters();
        const arr = [];
        for (let i = 0; i < 25; i++) {
            if (characters.Items[i].hogwartsStudent) {
                arr.splice(arr.length, 0, characters.Items[i])
            }
        }
        res.json(arr);
    } catch (e) {
        res.status(500).json({ err: 'something went worng' });
    }
});

app.get('/characters/house/:house', async (req, res) => {
    const house = req.params.house;
    try {
        const characters = await getCharacters();
        const len = characters.Items.length + 1;
        console.log(Number(len));
        const arr = [];
        for (let i = 0; i < 25; i++) {
            if (characters.Items[i].house == house) {
                arr.splice(arr.length, 0, characters.Items[i])
            }
        }
        res.json(arr);
    } catch (e) {
        res.status(500).json({ err: 'something went worng' });
    }
})

app.get('/characters/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const characters = await getCharacterById(id);
        res.json(characters);
    } catch (e) {
        res.status(500).json({ err: 'something went worng' });
    }
})

app.post('/characters', async (req, res) => {
    const character = req.body;
    try {
        const newcharacter = await addOrUpdateCharacter(character);
        res.json(newcharacter);
    } catch (e) {
        res.status(500).json({ err: 'something went worng' });
    }
})


app.put('/characters/:id', async (req, res) => {
    const character = req.body;
    const { id } = req.params;
    character.id = id;
    try {
        const updatedCharacter = await addOrUpdateCharacter(character);
        res.json(updatedCharacter);
    } catch (e) {
        res.status(500).json({ err: 'something went worng' });
    }
})

app.delete('/characters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteCharacter(id));
    } catch (e) {
        res.status(500).json({ err: 'something went worng' });
    }
})

app.listen(port, () => {
    console.log(`connection setup at ${port}`);
})