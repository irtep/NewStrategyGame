function drawUnits(canvas,ctx) {
  gameObject.army1.forEach((unit) => { // draw army 1
    const shortDesc = unit.quantity + ' x ' + unit.unit;
    let actionDesc;
    
    if (unit.order === 'standby') {
      actionDesc = 'order: ' + unit.order;    
    } else if (unit.order === 'shoot'){ // need to make owns for shooting and moving
      actionDesc = 'order: ' + unit.order + ' at ' + unit.target.unit;
    } else if (unit.order === 'melee'){ // need to make owns for shooting and moving
      actionDesc = 'order: ' + unit.order;
    } else {
      actionDesc = 'order: ' + unit.order + ' at ' + unit.target;
    }
    // paint units circle
    ctx.beginPath();  
    ctx.fillStyle = 'black';
    if (unit.details.type === 'infantry' || unit.details.type === 'cavalry' || unit.details.type === 'commander'){  
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
        ctx.fillText(unit.details.desc, unit.location.x-40, unit.location.y +53); 
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
    // paint firing lines:
    if (unit.firing === true){
      ctx.beginPath();
      ctx.moveTo(unit.location.x, unit.location.y);
      ctx.lineTo(unit.firingAt.location.x, unit.firingAt.location.y);
      ctx.stroke();
      ctx.fillStyle = 'red';
      ctx.fillText('firing!', unit.location.x-40, unit.location.y +33);
    }
  })
  
  gameObject.army2.forEach((unit) => { // draw army 2
    const shortDesc = unit.quantity + ' x ' + unit.unit;
    let actionDesc;
    
    if (unit.order === 'standby') {
      actionDesc = 'order: ' + unit.order;        
    } else if (unit.order === 'shoot'){ // need to make owns for shooting and moving
      actionDesc = 'order: ' + unit.order + ' at ' + unit.target.unit;
    } else {
      actionDesc = 'order: ' + unit.order + ' at ' + unit.target;
    }  
    // paint units circle
    ctx.beginPath();  
    ctx.fillStyle = 'black';
    if (unit.details.type === 'infantry' || unit.details.type === 'cavalry' || unit.details.type === 'commander'){  
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
        ctx.fillText(unit.details.desc, unit.location.x-40, unit.location.y +53);  
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
    // paint firing lines:
    if (unit.firing === true){
      ctx.beginPath();
      ctx.moveTo(unit.location.x, unit.location.y);
      ctx.lineTo(unit.firingAt.location.x, unit.firingAt.location.y);
      ctx.stroke();
      ctx.fillStyle = 'red';
      ctx.fillText('firing!', unit.location.x-40, unit.location.y +33);
    }
  }) 
}

function drawTerrain(canvas,ctx) {
  gameObject.terrain.terrain.forEach((unit) => { // draw terrain  
    
    if (unit.type === 'building'){
      const x = unit.location.x;
      const y = unit.location.y; 
      const wi = unit.size.width;
      const he = unit.size.height;
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillRect(x, y, wi, he);
      ctx.stroke();
      ctx.closePath();
    } else {
      for (let i = 0; i < unit.locations.length; i++){
        const x = unit.locations[i].x;
        const y = unit.locations[i].y;
        const rad = unit.radiuses[i];
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0,60,0)';
        ctx.arc(x, y, rad, 0, 2 * Math.PI);
        //ctx.arc(10, 10, 50, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }
  });
}                             
                             

function draw() {
  const canvas = document.getElementById('kanveesi');
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
  drawTerrain(canvas, ctx);
  drawUnits(canvas, ctx);
}