import express from "express";
const app = express()

const PORT = 3000

app.use(express.json())
app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})

app.get('/', (req, res)=> {
    res.status(200).send("<h1> Sana sana colita de rana bish yeah!")
})

app.get('/shop',(req, res)=>{
    res.status(232).send("<h1> A simple shop</h1>")
})

app.get('/shop/:id',(req, res)=>{
    const data = req.params
    res.status(232).send(`<a href='/'> Book: ${data.id} </a>`)
})