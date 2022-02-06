const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eeiu8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log('mogno  :',uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {


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