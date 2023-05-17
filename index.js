const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qx5eerd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Data Collections
    const productCollection = client.db("emaJohnDB").collection("products");

    app.get("/products", async (req, res) => {
      console.log(req.query);
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 15;
      const skip = page * limit;
      const result = await productCollection
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();
      res.send(result);
    });

    // For pagination
    app.get("/totalProducts", async (req, res) => {
      const result = await productCollection.estimatedDocumentCount();
      res.send({ totalProducts: result });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Ema-John is Running");
});

app.listen(port, () => {
  console.log(`Ema-John Server is Running on Port:${port}`);
});
