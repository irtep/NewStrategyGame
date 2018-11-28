function updatePoints(points1, points2){
  document.getElementById('p1PointsLeft').innerHTML = points1;
  document.getElementById('p2PointsLeft').innerHTML = points2;
}

function addUnit(targetArmy, targetUnit){
  const whoIsIt = targetArmy; // army1 or army2
  const newUnit = {unit: null, id: null, location: {x: 0, y: 0, z: 0}, quantity: null, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null, notMoved: false}; // army, unit and quantity... all else to default
  
  // fill mandatory fields: army, unit and quantity with newValues:
  newUnit.unit = JSON.parse(JSON.stringify(targetUnit.unit));
  newUnit.army = JSON.parse(JSON.stringify(targetArmy));
  newUnit.quantity = JSON.parse(JSON.stringify(targetUnit.quantity));
}