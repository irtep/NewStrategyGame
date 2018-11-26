
const express = require('express');
const app = express();

app.use(express.static('public'));

// ----------------- HANDLE GETS -------------------

app.get("/", (request, response) => {
  console.log("get received");
  response.sendFile(__dirname + '/views/start.html');
});

app.get("/combat", (request, response) => {
  console.log("get received");
  response.sendFile(__dirname + '/views/index.html');
});
// ----------------- HANDLE GETS END ---------------------
// --------------------- LISTEN PORT ---------------------
const listener = app.listen(process.env.PORT, () => {
  console.log('listening on port ' + listener.address().port);
});
