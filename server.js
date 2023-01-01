const { newPost, getPosts, duplicatePost } = require('./consultas')
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.static("public"));

app.use(express.json())

app.get("/posts", async (req, res) => {
    const posts = await getPosts()
    res.json(posts)

})

app.get("/", (req, res) => {
    try {
        res.sendFile('${__dirname}/public/index.html');
    } catch (error) {
        res.json({ message: "Pagina no encontrada" });
    }
});

app.post("/posts", async (req, res) => {
    try {
        const payload = req.body
        const resultDuplicate = await duplicatePost(payload)
        if (
            payload.id === "" ||
            payload.titulo === "" ||
            payload.url === "" ||
            payload.descripcion === ""
        ) {
            console.log("Por Favor completa todos los campos");
        } else if (resultDuplicate[0].num > 0) {
            res.send("Registro ya existe en la base de datos")

        } else {
            await newPost(payload)
            res.send("post Agregado con exito")
        }
    } catch (error) {
        res.json({ message: "Faltan campos por ingresar" });
    }
});




app.listen(3000, console.log("SERVIDOR ENCENDIDO"))
