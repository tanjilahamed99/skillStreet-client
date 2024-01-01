const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()


// middlewares
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to my Server site')
})


// notePad
// t1eprIlui9bOVrrD


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://notePad:t1eprIlui9bOVrrD@cluster0.8mn4lkn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const noteCollection = client.db("notePad").collection("note");

        app.get('/note', async (req, res) => {
            const result = await noteCollection.find().toArray()
            res.send(result)
        })

        app.post('/createNote', async (req, res) => {
            const newNote = req.body
            const result = await noteCollection.insertOne(newNote)
            res.send(result)
        })

        app.delete('/note/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await noteCollection.deleteOne(query)
            res.send(result)
        })

        app.patch('/updateNote/:id', async (req, res) => {
            const id = req.params.id
            const updateNote = req.body
            const query = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {

                }
            }

            const result = await noteCollection.updateOne(query, updateDoc)
            res.send(result)

        })


        app.patch('/trash/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const update = req.body
            const updateDoc = {
                $set: {
                    trash: update.trash
                }
            }
            const result = await noteCollection.updateOne(query, updateDoc)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
