const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// database access:
const mongoose = require('mongoose', { useNewUrlParser: true }); 
const mongoDB = process.env.SECRET1; // admin
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Schema = mongoose.Schema;

const nlSchema = new Schema( {
  savedGames: {
    type: Array    
  },
  highscores: {
    type: Array    
  } 
});

const nlModel = mongoose.model('nlModel', nlSchema ); 

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// ----------------- HANDLE GETS -------------------

app.get("/", (request, response) => {
  console.log("get received");
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/combat", (request, response) => {
  console.log("get received for combat");
  response.sendFile(__dirname + '/views/combat.html');
});

app.get("/skirmish", (request, response) => {
  console.log("get received for menu");
  response.sendFile(__dirname + '/views/skirmishMenu.html');
});

app.get("/mapscreen", (request, response) => {
  console.log("get received for map");
  response.sendFile(__dirname + '/views/mapscreen.html');
});

app.get("/endTurn", (request, response) => {
  console.log("get received for endTurn");
  response.sendFile(__dirname + '/views/endTurn.html');
});

app.get("/gameOver", (request, response) => {
  console.log("get received for gameOver");
  response.sendFile(__dirname + '/views/gameOver.html');
});
// ----------------- HANDLE GETS END ---------------------

// -------------- DATABASE COMMANDS -------------------

// showGames, loadGame, saveGame, saveHighscore

// this handles contacts with database.
app.post('/showGames', (request, response) => {
  console.log('req', request.body.MSG);
  const received = request.body.MSG;
  const responding = {names: [], pws: []};
  
  // fetch loaded games from server
  nlModel.find((err, results) => {
    
    if (err) console.log(err);
    
    // get details from savedGames:
    for (let i = 0; i < results[0].savedGames.length; i++){
      const jso = JSON.parse(results[0].savedGames[i]);
      
      responding.names.push(jso.name); responding.pws.push(jso.pw);
    } 
    const sending = JSON.stringify(responding);
    
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(sending);      
  });  
});

app.post('/loadGame', (request, response) => {
  console.log('req', request.body.MSG);
  const received = request.body.MSG;
  let responding = null;
  
  // fetch loaded games from server
  nlModel.find((err, results) => {
    
    if (err) console.log(err);
    
    //console.log(results[0].savedGames);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(JSON.stringify(results[0].savedGames));      
  });  
});

app.post('/saveGame', (request, response) => {
  console.log('req', request.body.MSG);
  const received = request.body.MSG;
  let responding = 'hi guys!';
  const nlQuery = { name:  'northernLands' };  
  let loadedGames = null;
  let nameExists = {result: false, index: null};
  const jsoned = JSON.parse(received);
  
  // fetch savedGames from server
  nlModel.find((err, results) => {
    
    if (err) console.log(err);
    
    // check if game with this players name already exists:
    for (let i = 0; i < results[0].savedGames.length; i++){
      const jso = JSON.parse(results[0].savedGames[i]);
      
      if (jso.name === jsoned.name) {
        console.log('found name!');
        nameExists.result = true;
        nameExists.index = i;
      } 
    } 
    
    // push received new game inside
    if (nameExists.result === false) {
      // new name, adding to savedGames list
      console.log('new game, adding');
      results[0].savedGames.push(received);
    }  else {
      // name already exists. replacing:
      console.log('old game, replacing');
      results[0].savedGames[nameExists.index] = received;
    }
      // make update
      nlModel.updateOne(nlQuery, {  
        savedGames: results[0].savedGames
      }, (err) => {
        console.log("game saved"); 
     });
  });

  setTimeout(() => {  // timed so that there is time to add the data
     
    const sending = JSON.stringify(responding);
    console.log("responding with data ");
    console.log('responding: ', responding);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(sending);      
  }, 1000); //timer
});

app.post('/saveHighscore', (request, response) => {
  const received = JSON.parse(request.body.MSG);
  const nlQuery = { name:  'northernLands' };  
  let oldHighscores;  
  console.log('received: ', received);
  
  // get results to delete ended game at savedGame
  // and to old highscore results to update that too.
  nlModel.find((err, results) => {
    
    // find the relevant game at savedGames
    for (let i = 0; i < received.length; i++){
      const playersName = received[i].name;
  
      for (let ii = 0; ii < results[0].savedGames.length; ii++){
        const jso = JSON.parse(results[0].savedGames[ii]);
    
        if (jso.name === playersName) {
          // delete the found game.
          results[0].savedGames.splice(ii, 1);
          ii--; // should not be necessary, but does no harm either... atleast i hope so.
        } 
      }
    }
    
    // add new highscore canditate:
    results[0].highscores.push(received[0]);
    console.log('pushing: ', received[0]);
    
    // sort list by points
    results[0].highscores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
    console.log('length: ', results[0].highscores.length);
    
    // remove 21st entry
    if (results[0].highscores.length > 20) {
      results[0].highscores.splice(20, 1);
      console.log('spliced last entry!');
     }
    
    // make update to highScores
    nlModel.updateOne(nlQuery, {  
    // highscores: received
       highscores: results[0].highscores
    }, (err) => {
      console.log("saved hs"); 
    });
    
    // make update to saved games
    nlModel.updateOne(nlQuery, {  
      savedGames: results[0].savedGames
    }, (err) => {
        console.log("saved sg"); 
    });
    //
  }); 
});

app.post('/fetchHighScores', (request, response) => {
  // fetch highscores from server
  nlModel.find((err, results) => {
    
    if (err) console.log(err);
  
    console.log(results[0].highscores);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(JSON.stringify(results[0].highscores));  

  }); 
});

// --------------------- LISTEN PORT ---------------------

const listener = app.listen(process.env.PORT, () => {
  console.log('listening on port ' + listener.address().port);
});
