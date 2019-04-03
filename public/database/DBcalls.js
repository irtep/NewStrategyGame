function checkDatabase(why, data){
  const http = new XMLHttpRequest();
  const url = '/dbBusiness'; // showData, loadGame, saveGame, saveHighscore
  let params = 'MSG='+ why;
  
  /* handle data like this
  armiesInDb.push(updatedLists);
  const feedback = document.getElementById('feedback');
  const theList = JSON.stringify({armiesInDb}); console.log('sending: ', theList);
  const http = new XMLHttpRequest();
  const url = '/updateAll';
  const params = 'MSG=' + theList;
  */
  
  console.log('database request: ', params);
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  http.onreadystatechange = () => {
    
    if (http.readyState == 4 && http.status == 200) {
      const resp = JSON.parse(http.responseText);
      console.log("response from server: ", resp);
    }
  }
  
  http.send(params); 
  console.log("getting info from database, wait!");
}
