// js for game over screen, after completing the campaign:

let highscores = [];

function calculatePoints(results){
  var points = 0;
  
  // points from wins:
  points = points + results.playerStats.wins;
  
  // points from controlled lands:
  for (let i = 0; i < results.campaignArmies.cities.length; i++) {
    console.log('checking cities: ', results.campaignArmies.cities[i], results.campaignArmies.cities[i].controlledBy, 'you: ', results.playerStats.faction);
    if (results.playerStats.faction == results.campaignArmies.cities[i].controlledBy){
      points = points + 10;
    }
  }

  // extra points for conquest
  if (results.playerStats.result === 'conquest') {
    points = points + 5;
  }
  
  // deduct points for long game:
  points = points - results.playerStats.turn;
  
  return points;
}

window.onload = () => {
  const summary = document.getElementById('summary');
  let result = JSON.parse(localStorage.getItem('Go'));
  const stats = result.playerStats;
  const pointsTotal = calculatePoints(result);
  let resultEntry = null;

  // results: eliminated, conquest, timeEnds

  switch (stats.result) {

    case 'eliminated':

      summary.innerHTML = 'You were eliminated!<br><br>'+
        'Combat stats: Wins: '+stats.wins +' Losses: '+stats.losses +'. in '+stats.turn +' turns.';
      resultEntry = 'eliminated';
    break;
    case 'conquest':

      summary.innerHTML = 'You conquested all lands, well done!<br><br>'+
        'Combat stats: Wins: '+stats.wins +' Losses: '+stats.losses +'. in '+stats.turn +' turns.';
      resultEntry = 'conquested all';
    break;
    case 'timeEnds':

      summary.innerHTML = 'Time ran out, good job for surviving!<br><br>'+
        'Combat stats: Wins: '+stats.wins +' Losses: '+stats.losses +'. in '+stats.turn +' turns.';  
      resultEntry = 'survived';
    break;  
  }
  
  summary.innerHTML = summary.innerHTML + '<br><br> You scored '+ pointsTotal + 'points.';
  
  // make highscore check and entry of good enough:
  
  const entry = {name: stats.name, faction: stats.faction, result: resultEntry, turns: stats.turn, wins: stats.wins, losses: stats.losses, points: pointsTotal};
  
  console.log('entry: ', entry);
  checkDatabase('fetchHighScores');
  setTimeout(()=> {
    console.log(highscores);
    // 1 sec to give time to update
    highscores.push(entry); 
    
    // update new list:
    checkDatabase('saveHighScore', highscores);
    ;
  }, 1000);
}

