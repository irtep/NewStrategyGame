// constructor: (nombre, range, type, attacks, str, ap, wounds, barrage)

const rangedWeapons = [
  new weapon('laser rifle', 24, 'rapid', 1, 3, 0, 1, false),
  new weapon('heavy rifle', 24, 'rapid', 1, 4, 0, 1, false),
  new weapon('heavy machinegun', 36, 'heavy', 3, 5, 1, 1, false),
  new weapon('battlecannon', 72, 'heavy', 'd6', 8, 3, 'd6', false)
];
const meleeWeapons = [
  new weapon('bayonet', 0, 'melee', 0, 0, 0, 1, false),
  new weapon('chainsword', 0, 'melee', 1, 0, 0, 1, false) 
];