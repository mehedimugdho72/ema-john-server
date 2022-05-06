const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


//middleware  
app.use(cors());
app.use(express.json());

// mongodb connecting Code Start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.elgub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// client.connect(err => {
//   const collection = client.db("emaJohn").collection("product");
//   // perform actions on the collection object
//   console.log('Mongo is Connected');
//   client.close();
// });

async function run(){
  try {
    await client.connect();
    const productCollection = client.db('emaJohn').collection('product');
    app.get('/product', async (req, res) => {
      const query = {};
      const curser = productCollection.find(query);
      const products = await curser.toArray();
      res.send(products);
    });
    app.get('/productCount', async(req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const count = await cursor.count();
      res.send({ count });
    });
    
  }
  finally {}

}
run().catch(console.dir);

// mongodb connecting Code







app.get('/', (req, res) => {
    res.send('John is running and watching for Ema')
});


app.listen(port, () => {
    console.log('John is Running on POrt', port);
})