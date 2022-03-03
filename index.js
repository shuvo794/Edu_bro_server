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
    const allBooksCollection = database.collection("allBooks");
    const allBlogsCollection = database.collection("allBlogs");
    const allNotesCollection = database.collection("allNotes");
    const userCollection = database.collection("user");


    // All Questions 

    // POST Question
    app.post('/postQuestion', async (req, res) => {
      const allQuestions = req.body;
      const result = await allQuestionsCollection.insertOne(allQuestions);
      res.json(result);
      console.log(result)

    });

    // Get all questions api 
    app.get("/allQuestions", async (req, res) => {
      const cursor = allQuestionsCollection.find({});
      const allQuestions = await cursor.toArray();
      res.send(allQuestions);
    });
    // get single questions
    app.get('/question/:id', async (req, res) => {
      const id = req.params.id;
      const result = await allQuestionsCollection.findOne({ _id: ObjectId(id) })
      res.json(result)
    })



    // all books 

    // POST Books
    app.post('/postBooks', async (req, res) => {
      const allBooks = req.body;
      const result = await allBooksCollection.insertOne(allBooks);
      res.json(result);
      console.log(result)

    });

    // Get all books api 
    app.get("/allBooks", async (req, res) => {
      const cursor = allBooksCollection.find({});
      const allBooks = await cursor.toArray();
      res.send(allBooks);
    });



    // all blogs 

    // POST blogs
    app.post('/postBlogs', async (req, res) => {
      const allBlogs = req.body;
      const result = await allBlogsCollection.insertOne(allBlogs);
      res.json(result);
      console.log(result)

    });

    // Get all blogs api 
    app.get("/allBlogs", async (req, res) => {
      const cursor = allBlogsCollection.find({});
      const allBlogs = await cursor.toArray();
      res.send(allBlogs);
    });
    // get single blog
    app.get('/blog-details/:id', async (req, res) => {
      const id = req.params.id;
      const result = await allBlogsCollection.findOne({ _id: ObjectId(id) })
      res.json(result)
    })



    // All notes 

    // POST notes
    app.post('/postNotes', async (req, res) => {
      const allNotes = req.body;
      const result = await allNotesCollection.insertOne(allNotes);
      res.json(result);
      console.log(result)

    });

    // Get all notes api 
    app.get("/allNotes", async (req, res) => {
      const cursor = allNotesCollection.find({});
      const allNotes = await cursor.toArray();
      res.send(allNotes);
    });


    // User Info 

    // add user 
    app.post("/users", async (req, res) => {
      const result = await userCollection.insertOne(req.body);
      res.send(result);
      console.log(result)
    });
    // upsert for google login 
    app.put('/users', async (req, res) => {
      const user = req.body;
      const filter = { email: user.email }
      const options = { upsert: true }
      const updatDoc = { $set: user }
      const result = await userCollection.updateOne(filter, updatDoc, options)
      res.json(result)
    })

    // update user
    app.put('/updateUser', async (req, res) => {
      const user = req.body;
      const filter = { email: user.email }
      const updateDoc = {
        $set: {
          department: user.department,
          university: user.university
        }
      }
      const result = await userCollection.updateOne(filter, updateDoc)
      res.json(result)
    })

    // get single user
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email
      const query = { email: email }
      const user = await userCollection.findOne(query)
      res.json(user)
    })

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
