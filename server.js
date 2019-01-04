
const express = require('express');
const app = express();

app.use(express.static('public'));

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
// ----------------- HANDLE GETS END ---------------------

// --------------------- LISTEN PORT ---------------------

const listener = app.listen(process.env.PORT, () => {
  console.log('listening on port ' + listener.address().port);
});
