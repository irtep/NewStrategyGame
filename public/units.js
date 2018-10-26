// imperial guard:
// seq: nombre, type, desc, meleeWeapons, rangedWeapons,
//stats, size, army
// move, strength, toughness, weaponSkill, ballisticSkill, attacks, wounds, initiative, leadership, armourSave
// defMods: +1 is better to defend, -1 is less to defend
// ballistic skill: lower is better.  weapon skill: higher is better!
const imperials = [
  new gameUnit(
  'Command tank', 'commander', 'communications tank with commander inside', ['crash'], ['heavy machinegun', 'heavy machinegun'],
  {m: 8, s: 5, t: 6, ws: 2, bs: 4, a: 2, w: 7, i: 2, ld: 8, sv: 2, defMods: -1, pointCost: 0}, 9,  'imperials'),
  new gameUnit(
  'Guardsman', 'infantry','human imperial soldiers. ok shooters, bad in melee', ['bayonet'], ['assault rifle mk3'],
  {m: 6, s: 3, t: 3, ws: 3, bs: 4, a: 1, w: 1, i: 3, ld: 8, sv: 5, defMods: 0, pointCost: 1}, 1, 'imperials'),
  new gameUnit(
  'Grizzly battletank', 'vehicle', 'excellent medium battletank', ['crash'], ['battlecannon', 'heavy machinegun'],
  {m: 6, s: 6, t: 7, ws: 2, bs: 4, a: 2, w: 10, i: 2, ld: 8, sv: 3, defMods: -1, pointCost: 30}, 10,  'imperials'),
  new gameUnit(
  'Lizard light tank', 'carrier', 'light tank that can carry soldiers', ['crash'], ['heavy machinegun'],
  {m: 9, s: 5, t: 6, ws: 2, bs: 4, a: 2, w: 7, i: 2, ld: 8, sv: 3, defMods: -1, pointCost: 20}, 9,  'imperials'),
  new gameUnit(
  'Ranger', 'infantry', 'elite imperial soldier', ['bayonet'], ['sniper rifle',],
  {m: 7, s: 3, t: 3, ws: 3, bs: 3, a: 1, w: 1, i: 4, ld: 8, sv: 5, defMods: 1, pointCost: 4}, 1,  'imperials'),
  new gameUnit(
  'Elephant artillery', 'vehicle', 'heavy self-propelled cannon', ['crash'], ['meteor cannon'],
  {m: 2, s: 6, t: 6, ws: 2, bs: 4, a: 1, w: 7, i: 2, ld: 8, sv: 3, defMods: -2, pointCost: 28}, 10,  'imperials')
];

const royalGuard = [
  new gameUnit(
  'Knight commander', 'commander','battlegroup commander, heavily armed and armoured', ['chainsword'], ['laser rifle'],
  {m: 6, s: 4, t: 4, ws: 5, bs: 2, a: 3, w: 3, i: 5, ld: 10, sv: 2, defMods: 0, pointCost: 0}, 2, 'royalGuard'),
  new gameUnit(
  'Knight', 'infantry','wearing heavy armour, jetpack and rifle. fast and tough elite unit', ['combat gauntlet'], ['laser rifle'],
  {m: 8, s: 4, t: 4, ws: 4, bs: 3, a: 1, w: 1, i: 4, ld: 9, sv: 3, defMods: 0, pointCost: 10}, 1, 'royalGuard'),
  new gameUnit(
  'Masticore tank', 'vehicle', 'royal guard heavy tank', ['crash'], ['laser cannon', 'laser cannon', 'heavy machinegun', 'heavy machinegun'],
  {m: 5, s: 7, t: 8, ws: 2, bs: 3, a: 1, w: 12, i: 3, ld: 9, sv: 2, defMods: -2, pointCost: 50}, 12,  'royalGuard')
];