/*
  // Los and range example:
  const testWhere = {x: 250, y: 100};
  const testTo = {x: 100, y: 508};
  losAndRangeCheck(testWhere, testTo, gameObject);
*/

// Collision detect:
function collisionDetect(locFrom, radiusFrom, locTo, radiusTo){
  // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  let circle1 = {radius: null, x: null, y: null};
  let circle2 = {radius: null, x: null, y: null};
  
  circle1.radius = radiusFrom; circle1.x = locFrom.x; circle1.y = locFrom.y;
  circle2.radius = radiusTo; circle2.x = locTo.x; circle2.y = locTo.y;
  
  var dx = circle1.x - circle2.x;
  var dy = circle1.y - circle2.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.radius + circle2.radius) {
    console.log('c detect: collision', circle1.x, circle2.x); 
    return 'collision';
  } else { 
    return 'no collision';
  }
}

// Distance check
function distanceCheck(fromWhere, toWhere){
  const a = fromWhere.x - toWhere.x // x1 - x2;
  const b = fromWhere.y - toWhere.y // y1 - y2;

  const c = Math.sqrt( a*a + b*b );
  return c;
}  

// find direct way by less distance
function findDirection(dirFrom, dirTo, distance){
  let shortest;
  let fullList = [];
  let directions = {n: null, ne: null, e: null, se: null, s: null, sw: null, w: null, nw: null};

  // check that if there yet and then 9 directions
  if (dirFrom === dirTo) {
    return 'atDestination';
  } else { 
    
    let check = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(check, dirTo); 
    
    check = {x: dirFrom.x + 1, y: dirFrom.y - 1};
    directions.ne = distanceCheck(check, dirTo); 
    
    check = {x: dirFrom.x + 1, y: dirFrom.y};
    directions.e = distanceCheck(check, dirTo); 
    
    check = {x: dirFrom.x + 1, y: dirFrom.y + 1};
    directions.se = distanceCheck(check, dirTo); 
    
    check = {x: dirFrom.x, y: dirFrom.y + 1};
    directions.s = distanceCheck(check, dirTo); 
    
    check = {x: dirFrom.x - 1, y: dirFrom.y + 1};
    directions.sw = distanceCheck(check, dirTo); 
    
    check = {x: dirFrom.x - 1, y: dirFrom.y};
    directions.w = distanceCheck(check, dirTo); 
    
    check = {x: dirFrom.x - 1, y: dirFrom.y - 1};
    directions.nw = distanceCheck(check, dirTo); 
  }
  fullList.push(directions.nw);fullList.push(directions.n);fullList.push(directions.ne);
  fullList.push(directions.w);fullList.push(directions.e);
  fullList.push(directions.sw);fullList.push(directions.s);fullList.push(directions.se);
  // check which is the shortest
  const sortedList = fullList.sort((a, b) => a - b);
  for (var key in directions) {
    if (directions.hasOwnProperty(key)) {
      if (directions[key] == sortedList[0]) {
        shortest = key;
        return shortest;
      } 
    }
  } 
}

// LOS and Range check
function losAndRangeCheck(fromWhere, toWhere){
  let path = [];
  let distance = distanceCheck(fromWhere, toWhere);
  let whereNow = fromWhere;
  let collision = false;
  const activeUnit = searchUnitByLocation(fromWhere, gameObject);
  const targetUnit = searchUnitByLocation(toWhere, gameObject);
  console.log('l and r check: ', whereNow, toWhere);
  const forCheckUnits1 = gameObject.army1.concat([]);
  const forCheckUnits2 = gameObject.army2.concat([]);
  const allUnits = forCheckUnits1.concat(forCheckUnits2);
  // terrain can be checked from original gameObject
  // for radius:
  /*
  const foundUnit = searchUnitByName(unit.unit, gameObject.factions[0]);
  const totalSize = foundUnit.size * unit.quantity; // radius
  */
    
  // delete active unit from forCheckUnits1 or 2.
  for (let ii = 0; ii < allUnits.length; ii++) {
    if (fromWhere.x === allUnits[ii].location.x && fromWhere.y === allUnits[ii].location.y) {
      console.log('found to be deleted: ', ii);
      allUnits.splice(ii, 1);
    }
  }
  console.log('allUnits: ', allUnits);
  for (let i = 0; i < distance; i++) {
    let nextStep = findDirection(whereNow, toWhere, distance);

    switch (nextStep) {
      case 'n': whereNow.x = whereNow.x; whereNow.y = whereNow.y -1; break;
      case 'ne': whereNow.x = whereNow.x + 1; whereNow.y = whereNow.y - 1; break; 
      case 'e': whereNow.x = whereNow.x + 1; whereNow.y = whereNow.y; break; 
      case 'se': whereNow.x = whereNow.x + 1; whereNow.y = whereNow.y + 1; break; 
      case 's': whereNow.x = whereNow.x; whereNow.y = whereNow.y + 1; break; 
      case 'sw': whereNow.x = whereNow.x - 1; whereNow.y = whereNow.y + 1; break; 
      case 'w': whereNow.x = whereNow.x - 1; whereNow.y = whereNow.y; break; 
      case 'nw': whereNow.x = whereNow.x - 1; whereNow.y = whereNow.y - 1; break;   
    }
    
    // Check collision:
    for (let ix = 0; ix < allUnits.length; ix++) {
      const foundUnit = searchUnitByName(allUnits[ix].unit, gameObject.factions[0]);
      const radiusOfTarget = foundUnit.size * allUnits[ix].quantity;
      let collisionResult = collisionDetect(whereNow, 1, allUnits[ix].location, radiusOfTarget);

      if (collisionResult === 'collision'){
        console.log('collision: ', allUnits[ix]);
        collision = true;  
      }
      if (collision === true){
        return 'collision';
      } 
    }
    if (collision === true){
      return 'collision';
    }
  }
  if (collision === false){
    console.log('no collision');
    return 'no collision';
  }
}

/*
const dirConf = {n: [0, -1], ne: [1, -1], e: [1, 0],
                se: [1, 1], s: [0, 1], sw: [-1, 1],
                w: [-1, 0], nw: [-1, -1]};
*/