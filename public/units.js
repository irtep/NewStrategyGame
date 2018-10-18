// imperial guard:
// seq: nombre, type, desc, meleeWeapons, rangedWeapons,
//stats, size, army
// move, strength, toughness, weaponSkill, ballisticSkill, attacks, wounds, initiative, leadership, armourSave
const imperials = [
  new gameUnit(
  'Guardsman', 'infantry','human imperial soldiers. ok shooters, bad in melee', ['bayonet'], ['assault rifle'],
  {m: 6, s: 3, t: 3, ws: 3, bs: 3, a: 1, w: 1, i: 3, ld: 8, sv: 5}, 1, 'imperials'),
  new gameUnit(
  'Grizzly battletank', 'vehicle', 'excellent medium battletank', [null], ['battlecannon', 'heavy machinegun'],
  {m: 6, s: 6, t: 7, ws: 2, bs: 3, a: 2, w: 10, i: 2, ld: 8, sv: 3}, 10,  'imperials'),
  new gameUnit(
  'Lizard light tank', 'carrier', 'light tank that can carry soldiers', [null], ['heavy machinegun'],
  {m: 9, s: 5, t: 6, ws: 2, bs: 3, a: 2, w: 7, i: 2, ld: 8, sv: 3}, 9,  'imperials'),
  new gameUnit(
  'Ranger', 'infantry', 'elite imperial soldier', ['bayonet'], ['sniper rifle',],
  {m: 7, s: 3, t: 3, ws: 4, bs: 4, a: 1, w: 1, i: 4, ld: 8, sv: 5}, 1,  'imperials')
];