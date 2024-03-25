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

const toDoListDB = client.db("ToDoList")
const myTasks = toDoListDB.collection("List")

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})

app.get('/', (req, res)=> {
    res.status(200).send("<h1> The one who left it all!")
})

app.get('/shop',(req, res)=>{
    res.status(232).send("<h1> A simple shop</h1>")
})


app.post('/savetask', (req, res) => {
    // Route adds a new book
    const data = req.body
    if (!data.task)
        return res.status(400).send("No task found.")
    if (data.task.length > 160)
    return res.status(400).send("limit exceeded (160)")
    if (!data.visibility)
        return res.status(400).send("No visibility found.")
    if (!data.status)
        return res.status(400).send("No status found.")

    myTasks.insertOne(data)
    .then(response=>{
        return res.status(201).send(JSON.stringify(response))
    })
    .catch(err=>console.log(err))
})

app.get('/status/:id', (req, res) => {
    // route show a specific book
    const data = req.params

    const filter = {
        "_id": new ObjectId(data.id)
        // "status" : "complete"
    }

    myTasks.findOne(filter)
        .then(response => {
            // console.log(response)
            res.status(200).send(response)
        })
        .catch(err => console.log(err))
    // return res.status(200).send(`<a href='/'> Book: ${data.id}</a>`)
})
