
function updatePoints(points1, points2){
  document.getElementById('p1PointsLeft').innerHTML = points1;
  document.getElementById('p2PointsLeft').innerHTML = points2;
}

function addUnit(targetArmy, targetUnit, unitSize){
  const whoIsIt = targetArmy; // army1 or army2
  const newUnit = {unit: targetUnit, id: null, location: {x: 0, y: 0, z: 0}, quantity: unitSize, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: targetArmy, details: null,
  firing: false, firingAt: null, notMoved: false}; // army, unit and quantity... all else to default
  
  console.log('newUnit: ', newUnit);
  // add new unit to army of relevant army
  if (targetArmy === 'army1'){
    selected.army1.units.push(newUnit);
  }
  if (targetArmy === 'army2'){
    selected.army2.units.push(newUnit);
  }
  console.log('added to army, selected: ', selected);
};