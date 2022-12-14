const express = require("express");
const dbo = require("./db/db");
var cors = require('cors')
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const { ObjectId } = require("mongodb");
const jsonParser = bodyParser.json();

dbo.connectToServer();
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


//Read (GET) -> récupération des pokemons
app.get("/pokemon/list", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection("Pokemon")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching pokemons!");
        } else {
          res.json(result);
        }
      })
});

//Create (POST)-> ajout de pokemon dans la collection pokémon
app.post('/pokemon/insert', jsonParser, (req, res) => {
    const body = req.body;
    console.log('Got body:', body);
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("Pokemon")
        .insertOne(body)
        .then(function (result, err) {
          if (err) {
            res.status(400).send("Error!");
          } else {
            res.json(result);
          }
        })
        .catch(err=>res.json(err)); 

   
});


//Update (POST) -> modification des pokemons 
app.post('/pokemon/edit', jsonParser, (req, res) =>{
  const body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("Pokemon")
  .updateOne({
      name: body.name
  },{
      $set:{ 
        name: body.newname,
        desc: body.newdesc, 
        img : body.newimg,       
        type: body.newtype,
        weakness : body.newweakness,
        height : body.newheight,
        weight : body.newweight,
        gender : body.newgender,
        category : body.newcategory,
        abilities : body.newabilities,
        numero : body.newnum
      }
  })
  .then (function(result,err){
    if (err) {
      res.status(400).send("Error!");
    } else {
      res.json(result);
    }
  })
  .catch(err=>res.json(err))

});

//Delete (DELETE) -> suppression de pokemons
app.delete('/pokemon/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
      .collection("Pokemon")
      .deleteOne({_id:ObjectId(body._id)})
      .then(function (result, err) {
        if (err) {
          res.status(400).send("Error!");
        } else {
          res.json(result);
        }
      })
      .catch(err=>res.json(err)); 
});



//Create (POST) -> ajout de pokemon dans le pokédex
app.post('/pokedex/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
      .collection("Pokedex")
      .insertOne(body)
      .then(function (result, err) {
        if (err) {
          res.status(400).send("Error!");
        } else {
          res.json(result);
        }
      })
      .catch(err=>res.json(err));
});

//Read (GET) -> récupération des pokemon du pokédex
app.get("/pokedex/list", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Pokedex")
    .find({}) 
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });

});

//Delete (DELETE) -> retirer un pokemon du pokédex
app.delete('/pokedex/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
      .collection("Pokedex")
      .deleteOne(body)
      .then(function (result, err) {
        if (err) {
          res.status(400).send("Error!");
        } else {
          res.json(result);
        }
      }).catch(err=>res.json(err));
 
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

