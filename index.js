const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.24hkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// console.log('mogno  :',uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {

        await client.connect();
        const database = client.db("Edu-Bro");
        const usersCollection = database.collection('users');

        const allQuestionCollection = database.collection('allQuestions');


        // add user info
        app.post("/addUserInfo", async (req, res) => {
            const result = await usersCollection.insertOne(req.body)
            res.send(result)
        })
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running The Server')

});

app.listen(port, () => {
    console.log('Running server is port', port);
});