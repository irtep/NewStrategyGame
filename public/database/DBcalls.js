/*
function updateListsFromDB(){
  
  //const armyList = JSON.stringify(armyList);
  const feedback = document.getElementById('feedback');
  const http = new XMLHttpRequest();
  const url = '/showAll';
  const params = 'MSG=show';
  console.log("updating from DB");
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = () => {//Call a function when the state changes.
    
    if(http.readyState == 4 && http.status == 200) {
      const newList = JSON.parse(http.responseText);
      armyList = newList;
      //const forShow1 = sahaList.join('<br>');
      console.log("update ready!: ", armyList);
      armiesInDb = armyList[0].armyList;
      feedback.innerHTML = "Received data from database successfully.";
      
      setTimeout(() => {
        clearFeedback();
      }, 1000);
    }
  }
  http.send(params); 
  feedback.innerHTML = "getting info from database, wait!";
}

function updateListsInDB(updatedLists){
  armiesInDb.push(updatedLists);
  const feedback = document.getElementById('feedback');
  const theList = JSON.stringify({armiesInDb}); console.log('sending: ', theList);
  const http = new XMLHttpRequest();
  const url = '/updateAll';
  const params = 'MSG=' + theList;

  console.log('armies in db', armiesInDb);
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = () => {//Call a function when the state changes.
    
    if(http.readyState == 4 && http.status == 200) {
      
      console.log(http.responseText);
      feedback.innerHTML = http.responseText;
      
      setTimeout(() => {
        clearFeedback();
      }, 1000);
      
    }
  }
  http.send(params);
  feedback.innerHTML = "updating database, wait!";
}
*/