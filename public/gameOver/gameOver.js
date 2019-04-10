// js for game over screen, after completing the campaign:


window.onload = () => {
  const summary = document.getElementById('summary');
  let result = JSON.parse(localStorage.getItem('Go'));
  const stats = result.playerStats;

  // results: eliminated, conquest, timeEnds

  switch (stats.result) {

    case 'eliminated':

      summary.innerHTML = 'You were eliminated!<br><br>'+
        'Combat stats: Wins: '+result.wins +' Losses: '+result.losses +'. in '+result.turn +' turns.';
    break;
    case 'conquest':

      summary.innerHTML = 'You conquested all lands, well done!<br><br>'+
        'Combat stats: Wins: '+result.wins +' Losses: '+result.losses +'. in '+result.turn +' turns.';
    break;
    case 'eliminated':

      summary.innerHTML = 'You were eliminated!<br><br>'+
        'Combat stats: Wins: '+result.wins +' Losses: '+result.losses +'. in '+result.turn +' turns.';  
    break;  
  }
}

