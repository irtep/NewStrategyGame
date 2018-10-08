// imperial guard:
// seq: nombre, type, desc, meleeWeapons, rangedWeapons,
//stats, size, army, order, targeted, quantity
const imperials = [
  new gameUnit(
  'Guardsman', 'infantry','human imperial soldiers. ok shooters, bad in melee', ['bayonet'], ['assault rifle'],
  {m: 6, s: 3, t: 3, ws: 4, bs: 4, a: 1, w: 1, i: 3, ld: 8, sv: 5}, 1, 'imperials','standby', null, null),
  new gameUnit(
  'Grizzly battletank', 'vehicle', 'excellent medium battletank', [null], ['battlecannon', 'heavy machinegun'],
  {m: 6, s: 6, t: 7, ws: 6, bs: 4, a: 2, w: 10, i: 3, ld: 8, sv: 3}, 10,  'imperials')
];