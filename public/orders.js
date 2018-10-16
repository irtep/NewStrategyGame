// ORDERS:
const orders = [
  'standby',
  'move',
  'shoot',
  'assault',
  'run'
];

function moveUnit(to, who){
  //collisionDetect(locFrom, radiusFrom, locTo, radiusTo)

}
// standby (do not move, but shoot closest enemy in LOS and in range)
  // check range of weapon(s), then if any enemies around
    // shoot closest

// hunt to shoot (start to move towards target in order to get in range an in LOS. stop moving when in range)
  // check where is target and if in range.
    // if in range shoot. if not in range move towards

// hunt to assault (start to move towards target in order to engage in melee)

// move to direction (move to w,nw,n,ne,e,se,s,sw. shoot targets while moving)

// shoot target, but keep position. (shoot target, but dont chase if target out of los/range)

// embark to transport or building (embark to transport that is near)

// disembark troops (disembard troops from transport or from building)

// join squad (characters only. join squad that is near)

// run (double movement, but no shooting)