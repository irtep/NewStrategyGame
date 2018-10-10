// Distance check
/*
function distanceCheck(fromWhere, toWhere){
  const a = fromWhere.x - toWhere.x // x1 - x2;
  const b = fromWhere.y - toWhere.y // y1 - y2;

  const c = Math.sqrt( a*a + b*b );
  return c;
}  
*/  
/*
// find direct way by less distance
function findDirection(dirFrom, dirTo, distance){
  let shortest;
  let directions = [n: null, ne: null, e: null, se: null, s: null, sw: null, w: null, nw: null];

  // check that if there yet and then 9 directions
  if (dirFrom === dirTo) {
    return 'atDestination';
  } else {
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y);  
    
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y); 
    
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y); 
    
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y); 
    
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y); 
    
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y); 
    
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y); 
    
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y); 
    
    let checkN = {x: dirFrom.x, y: dirFrom.y - 1};
    directions.n = distanceCheck(dirFrom.x, dirFrom.y); 
  }
}
*/
// LOS check
/*
function losCheck(fromWhere, toWhere){
  let path = [];
  let distance = distanceCheck(fromWhere, toWhere);
  let whereNow = fromWhere;
  
  for (; fromWhere === toWhere;) {
    let nextStep = findDirection(whereNow, toWhere, distance);
    
  }
}
*/