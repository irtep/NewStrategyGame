function checkDatabase(why, origData){
  const data = JSON.stringify(origData);
  const http = new XMLHttpRequest();
  const url = '/'+ why; // showHighcores, loadGame, saveGame, saveHighscore
  let params = 'MSG='+ why;
  
  /* handle data like this
  armiesInDb.push(updatedLists);
  const feedback = document.getElementById('feedback');
  const theList = JSON.stringify({armiesInDb}); console.log('sending: ', theList);
  const http = new XMLHttpRequest();
  const url = '/updateAll';
  const params = 'MSG=' + theList;
  */
  
  
  switch (why) {
  
    case 'showGames': 
      params = 'MSG=showGames';
    break;     
    case 'loadGame':    
      params = 'MSG=loadGame';
    break;
    case 'saveGame':     
      params = 'MSG='+ data;
    break;
    case 'saveHighScore':    
      params = 'MSG='+ data;
    break;
    default: console.log('could not find what on checkDatabase');
  }
  
  console.log('database request: ', params);
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  http.onreadystatechange = () => {
    
    if (http.readyState == 4 && http.status == 200) {
      const resp = JSON.parse(http.responseText);
      //console.log("response from server: ", resp);
      
      if (why === 'showGames' || why === 'loadGame') {
        // listOfGames is global variable in mainMenu.js
        listOfGames = resp;    
      }
    }
  }
  
  http.send(params); 
  console.log("getting info from database, wait!");
}
