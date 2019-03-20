// constructor: (nombre, range, type, attacks, str, ap, wounds, barrage, reloadSpeed) not sure if barrage will be added...

const rangedWeapons = [           //r           a  s   ap  w , rSpeed
  // SCI-FI
  new weapon('assault rifle mk3', 300, 'rapid', 1, 3,  0,  1, false, 2),
  new weapon('laser rifle', 300, 'rapid',       1, 4,  0,  1, false, 2),
  new weapon('sniper rifle', 450, 'rifle',      1, 4,  0,  1, false, 6),
  new weapon('heavy machinegun', 450, 'heavy',  3, 5,  1,  1, false, 2),
  new weapon('battlecannon', 600, 'heavy',    'd6',8,  3, 'd6', false, 5),
  new weapon('meteor cannon', 600, 'heavy',   'd6',9,  4,  5, false, 7),
  new weapon('laser cannon', 500, 'heavy',      1, 9,  3, 'd6', false, 6),
  // FA-BA
  new weapon('no weapon', 0, 'nothing',         0, 0, 0, 0, false, 0),
  new weapon('elven longbow', 300, 'bow',       2, 4, 1, 1, false, 3),
  new weapon('longbow', 250, 'bow',             2, 3, 1, 1, false, 4),
  new weapon('elven shortbow', 200, 'bow',      2, 3, 0, 1, false, 3),
  new weapon('crossbow', 300, 'bow',            1, 4, 1, 1, false, 7),
  new weapon('heavy crossbow', 300, 'bow',      1, 5, 2, 2, false, 8),
  new weapon('dragonfire', 100, 'heavy',     'd6', 9, 3, 2, false, 3),
  new weapon('flamer', 100, 'heavy',         'd6', 7, 3, 1, false, 3),
  new weapon('auto crossbow', 300, 'bow',       3, 4, 1, 1, false, 2),
  new weapon('catapult', 450, 'heavy',       'd6',8,  3, 'd6', false, 8),
  new weapon('fireball', 150, 'magic',       'd6',5,  2, 'd6', false, 2)
];
const meleeWeapons = [           //r        a  s  ap w
  // SCI-FI
  new weapon('unarmed', 0, 'melee',         0, 0, 0, 1, false),
  new weapon('crash', 0, 'melee',           0, 0, 4, 3, false), // basic tank attack, in fa-ba too
  new weapon('bayonet', 0, 'melee',         0, 0, 0, 1, false),
  new weapon('shield', 0, 'melee',          0, 0, -1, 1, false),
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
  new weapon('enhanced sword', 0, 'melee',  1, 2, 2, 2, false),
  new weapon('nodachi', 0, 'melee',         0, 2, 2, 2, false),
  new weapon('unicorn horn', 0, 'melee',    0, 1, 2, 1, false),
  new weapon('runic axe', 0, 'melee',       1, 2, 3, 2, false),
  new weapon('halberd', 0, 'melee',         0, 2, 3, 2, false),
  new weapon('gigantic sword', 0, 'melee',  0, 2, 4, 'd6', false),
  new weapon('steel fists', 0, 'melee',     0, 0, 2, 'd6', false),
  new weapon('treetrunk', 0, 'melee',       0, 0, 3, 'd6', false)
];