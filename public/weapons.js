// constructor: (nombre, range, type, attacks, str, ap, wounds, barrage)

const rangedWeapons = [
  new weapon('assault rifle', 300, 'rapid', 1, 3, 0, 1, false),
  new weapon('laser rifle', 300, 'rapid', 1, 4, 0, 1, false),
  new weapon('heavy machinegun', 450, 'heavy', 3, 5, 1, 1, false),
  new weapon('battlecannon', 600, 'heavy', 'd6', 8, 3, 'd6', false)
];
const meleeWeapons = [
  new weapon('bayonet', 0, 'melee', 0, 0, 0, 1, false),
  new weapon('chainsword', 0, 'melee', 1, 0, 0, 1, false) 
];