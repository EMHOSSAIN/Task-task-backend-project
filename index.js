const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.ah4ac9g.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {

          const selector = client.db("selectorData").collection("selector");
        const NameselectorCollaction = client.db("selectorData").collection("userData");

        app.get('/data', async(req,res)=>{
            const query = {};
            const result= await selector.find(query).toArray();
            res.send(result)
        })
    
    app.post('/data', async (req,res)=>{
        const user = req.body;
        const result = await NameselectorCollaction.insertOne(user);
        res.send(result)
    })

    app.get('/userData', async(req,res)=>{
        const query = {};
        const result= await NameselectorCollaction.find(query).toArray();
        res.send(result)
    })

    app.get('/user/:id', async (req,res)=>{
        const id = req.params.id;
        const quere= {_id: new ObjectId(id)};
        const result = await NameselectorCollaction.findOne(quere)
        res.send(result)
    })

    app.put('/updateData/:id', async(req,res)=>{
        const id = req.params.id
        console.log(id)
        const filter = {_id: new ObjectId(id)}
        const user = req.body;
        const option = {upsert:true};
        const updateUser = {
            $set:{
              name:user.name,
              value:user.value
            }
        }
        const result = await NameselectorCollaction.updateOne(filter,updateUser,option)
        res.send(result)
    })

         app.get('/', (req, res) => {
    res.send('test-task-surver running')
})



app.listen(port, () => {
    console.log(`test-task-surver running ${port}`)
})

        
    } finally {
        
    }

   

}
run().catch(error => console.log(error))