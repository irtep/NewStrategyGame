function drawUnits(canvas,ctx) {
  gameObject.army1.forEach((unit) => { // draw army 1
    const shortDesc = unit.quantity + ' x ' + unit.unit;
    let actionDesc;
    
    if (unit.order === 'standby') {
      actionDesc = 'order: ' + unit.order;    
    } else {
      actionDesc = 'order: ' + unit.order + ' at ' + unit.target;
    }
    // paint units circle
    ctx.beginPath();  
    ctx.fillStyle = 'black';
    if (unit.details.type === 'infantry'){  
      const totalSize = unit.details.size * unit.quantity;
      ctx.arc(unit.location.x, unit.location.y, totalSize, 0, 2 * Math.PI);
    } else {
      ctx.arc(unit.location.x, unit.location.y, unit.details.size, 0, 2 * Math.PI); 
    } 
    ctx.fill();
    ctx.closePath();
    // paint range limit: 
    ctx.beginPath();  
    ctx.strokeStyle = 'gold';
    if (unit.highlighted === true){
      if (unit.details.rangedWeapons.length > 0){
        const foundWeapon = searchStatsOfWeapon(unit.details.rangedWeapons[0], 'ranged');
        const weaponRadius = foundWeapon.range;
        ctx.arc(unit.location.x, unit.location.y, weaponRadius, 0, 2 * Math.PI);
        // text:
        ctx.font = '15px serif';
        ctx.fillStyle = 'gold';
        ctx.fillText('main weapon range', unit.location.x-40, unit.location.y +33); 
      }
    } else { // if no ranged weapon:
      ctx.arc(unit.location.x, unit.location.y, 0, 0, 2 * Math.PI); 
    } 
    ctx.stroke();
    ctx.closePath();
    // write info texts:
    ctx.font = '15px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(shortDesc, unit.location.x-40, unit.location.y);
    ctx.fillText(actionDesc, unit.location.x-40, unit.location.y +13);  
  })
  
  gameObject.army2.forEach((unit) => { // draw army 2
    const shortDesc = unit.quantity + ' x ' + unit.unit;
    let actionDesc;
    
    if (unit.order === 'standby') {
      actionDesc = 'order: ' + unit.order;    
    } else {
      actionDesc = 'order: ' + unit.order + ' at ' + unit.target;
    }
    // paint units circle
    ctx.beginPath();  
    ctx.fillStyle = 'black';
    if (unit.details.type === 'infantry'){  
      const totalSize = unit.details.size * unit.quantity;
      ctx.arc(unit.location.x, unit.location.y, totalSize, 0, 2 * Math.PI);
    } else {
      ctx.arc(unit.location.x, unit.location.y, unit.details.size, 0, 2 * Math.PI); 
    } 
    ctx.fill();
    ctx.closePath();
    // paint range limit: 
    ctx.beginPath();  
    ctx.strokeStyle = 'purple';
    if (unit.highlighted === true){
      if (unit.details.rangedWeapons.length > 0){
        const foundWeapon = searchStatsOfWeapon(unit.details.rangedWeapons[0], 'ranged');
        const weaponRadius = foundWeapon.range;
        ctx.arc(unit.location.x, unit.location.y, weaponRadius, 0, 2 * Math.PI);
        // text:
        ctx.font = '15px serif';
        ctx.fillStyle = 'purple';
        ctx.fillText('main weapon range', unit.location.x-40, unit.location.y +33); 
      }
    } else { // if no ranged weapon:
      ctx.arc(unit.location.x, unit.location.y, 0, 0, 2 * Math.PI); 
    } 
    ctx.stroke();
    ctx.closePath();
    // write info texts:
    ctx.font = '15px serif';
    ctx.fillStyle = 'blue';
    ctx.fillText(shortDesc, unit.location.x-40, unit.location.y);
    ctx.fillText(actionDesc, unit.location.x-40, unit.location.y +13);  
  }) 
}

function draw() {
  const canvas = document.getElementById('kanveesi');
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
  // add drawTerrain
  drawUnits(canvas,ctx);
}