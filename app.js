import express from "express";
import{PORT, MONGODBURL } from './config.js'
import { MongoClient, ServerApiVersion }from "mongodb"
const app = express()



app.use(express.json())

const client = new MongoClient(MONGODBURL,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

const booksDB = client.db("myBookShop")
const myBooks = booksDB.collection("books")

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

app.post('/savebook',(req, res)=>{
    const data = req.body

    if(!data.title)
        return res.status(400).send("No title found.")
    if(!data.author)        
        return res.status(400).send("No author found.")
    if(!data.price)        
        return res.status(400).send("No price found.")
    myBooks.insertOne(data, (error, response)=>{
        if(error){
            console.log("An error occured!")
            return res.sendStatus(500)
        }
    })
    return res.status(201).send("Values are"+JSON.stringify(data))
})

