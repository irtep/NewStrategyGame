// constructor: (nombre, range, type, attacks, str, ap, wounds, barrage) not sure if barrage will be added...

const rangedWeapons = [           //r           a  s   ap  w
  // SCI-FI
  new weapon('assault rifle mk3', 300, 'rapid', 1, 3,  0,  1, false),
  new weapon('laser rifle', 300, 'rapid',       1, 4,  0,  1, false),
  new weapon('sniper rifle', 450, 'rifle',      1, 4,  0,  1, false),
  new weapon('heavy machinegun', 450, 'heavy',  3, 5,  1,  1, false),
  new weapon('battlecannon', 600, 'heavy',    'd6',8,  3, 'd6', false),
  new weapon('meteor cannon', 600, 'heavy',   'd6',9,  4,  5, false),
  new weapon('laser cannon', 500, 'heavy',      1, 9,  3, 'd6', false),
  // FA-BA
  new weapon('no weapon', 0, 'nothing',         0, 0, 0, 0, false),
  new weapon('elven longbow', 300, 'bow',       2, 4, 1, 1, false),,
  new weapon('elven shortbow', 200, 'bow',      2, 3, 0, 1, false),
  new weapon('crossbow', 300, 'bow',            1, 4, 1, 1, false),
  new weapon('dragonfire', 100, 'heavy',     'd6', 9, 3, 1, false)
];
const meleeWeapons = [           //r        a  s  ap w
  // SCI-FI
  new weapon('unarmed', 0, 'melee',         0, 0, 0, 1, false),
  new weapon('crash', 0, 'melee',           0, 0, 4, 3, false), // basic tank attack
  new weapon('bayonet', 0, 'melee',         0, 0, 0, 1, false),
  new weapon('chainsword', 0, 'melee',      1, 0, 0, 1, false),
  new weapon('combat gauntlet', 0, 'melee', 0, 5, 3, 3, false),
  // FA-BA
  new weapon('longsword', 0, 'melee',       1, 0, 1, 1, false),
  new weapon('battleaxe', 0, 'melee',       0, 1, 1, 1, false),
  new weapon('lance', 0, 'melee',           0, 2, 2, 2, false),
  new weapon('spear', 0, 'melee',           0, 0, 0, 1, false),
  new weapon('dagger', 0, 'melee',          2, 0, 0, 1, false),
  new weapon('warhammer', 0, 'melee',       0, 2, 2, 1, false),
  new weapon('teeth and claws', 0, 'melee', 0, 0, 4, 'd6', false),
  new weapon('enhanced sword', 0, 'melee',  1, 2, 2, 2, false)
];