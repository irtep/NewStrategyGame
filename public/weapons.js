// constructor: (nombre, range, type, attacks, str, ap, wounds, barrage) not sure if barrage will be added...

const rangedWeapons = [           //r           a  s   ap  w
  new weapon('assault rifle mk3', 300, 'rapid', 1, 3,  0,  1, false),
  new weapon('laser rifle', 300, 'rapid',       1, 4,  0,  1, false),
  new weapon('sniper rifle', 450, 'rifle',      1, 4,  0,  1, false),
  new weapon('heavy machinegun', 450, 'heavy',  3, 5,  1,  1, false),
  new weapon('battlecannon', 600, 'heavy',    'd6',8,  3, 'd6', false),
  new weapon('meteor cannon', 600, 'heavy',   'd6',9,  4,  5, false)
];
const meleeWeapons = [
  new weapon('unarmed', 0, 'melee', 0, 0, 0, 1, false),
  new weapon('crash', 0, 'melee', 0, 0, 4, 3, false), // basic tank attack
  new weapon('bayonet', 0, 'melee', 0, 0, 0, 1, false),
  new weapon('chainsword', 0, 'melee', 1, 0, 0, 1, false) 
];