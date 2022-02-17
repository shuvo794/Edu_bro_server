const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.24hkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log('mogno  :',uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("Edu-Bro");
    const allQuestionsCollection = database.collection("allQuestions");
    const reviewCollection = database.collection("review");
    const userCollection = database.collection("user");
    const booksCollection = database.collection("books");



  // Get our api 
  app.get("/allQuestions", async (req, res) => {
    const cursor = allQuestionsCollection.find({});
    const allQuestions = await cursor.toArray();
    res.send(allQuestions);
  });


    // add user 
    app.post("/addUserInfo", async (req, res) => {
      const result = await userCollection.insertOne(req.body);
      res.send(result);
    });



  } finally {
    // await client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running The Server");
});

app.listen(port, () => {
  console.log("Running server is port", port);
});
