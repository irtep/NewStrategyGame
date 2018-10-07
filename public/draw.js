function drawUnits(gameObject,canvas,ctx) {
  gameObject.army1.forEach((unit) => { // draw army 1
    const shortDesc = unit.quantity + ' x ' + unit.unit;
    let actionDesc;
    const foundUnit = searchUnitByName(unit.unit, gameObject.factions[0]);
    
    if (unit.order === 'standby') {
      actionDesc = 'order: ' + unit.order;    
    } else {
      actionDesc = 'order: ' + unit.order + ' at ' + unit.targeted;
    }
    // paint units circle
    ctx.beginPath();  
    ctx.fillStyle = 'black';
    if (foundUnit.type === 'infantry'){  
      const totalSize = foundUnit.size * unit.quantity;
      ctx.arc(unit.location.x, unit.location.y, totalSize, 0, 2 * Math.PI);
    } else {
      ctx.arc(unit.location.x, unit.location.y, foundUnit.size, 0, 2 * Math.PI); 
    } 
    ctx.fill();
    ctx.closePath();
    // write info texts:
    ctx.font = '15px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(shortDesc, unit.location.x-40, unit.location.y);
    ctx.fillText(actionDesc, unit.location.x-40, unit.location.y +13);  
  })
  gameObject.army2.forEach((unit) => { // draw army 1
    const shortDesc = unit.quantity + ' x ' + unit.unit;
    let actionDesc;
    const foundUnit = searchUnitByName(unit.unit, gameObject.factions[1]);
    if (unit.order === 'standby') {
      actionDesc = 'order: ' + unit.order;    
    } else {
      actionDesc = 'order: ' + unit.order + ' at ' + unit.targeted;
    }
    // paint units circle
    ctx.beginPath();  
    ctx.fillStyle = 'black';
    if (foundUnit.type === 'infantry'){  
      const totalSize = foundUnit.size * unit.quantity;
      ctx.arc(unit.location.x, unit.location.y, totalSize, 0, 2 * Math.PI);
    } else {
      ctx.arc(unit.location.x, unit.location.y, foundUnit.size, 0, 2 * Math.PI); 
    } 
    ctx.fill();
    ctx.closePath();
    // write info texts:
    ctx.font = '15px serif';
    ctx.fillStyle = 'blue';
    ctx.fillText(shortDesc, unit.location.x-40, unit.location.y);
    ctx.fillText(actionDesc, unit.location.x-40, unit.location.y +13);  
  }) 
}

function draw(gameObject) {
    const canvas = gameObject.canvas;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
        drawUnits(gameObject,canvas,ctx);
}