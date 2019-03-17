
// seq: nombre, type, desc, meleeWeapons, rangedWeapons,
//stats, size, army, unitSize, longDesc, limit,

// move, strength, toughness, weaponSkill, ballisticSkill, attacks, wounds, initiative, leadership, armourSave
// defMods: +1 is better to defend, -1 is less to defend
// ballistic skill: lower is better.  weapon skill: higher is better!

// FA-BA:

const humans = [
  new gameUnit(
  'Knight commander', 'commander','Battlegroup commander, heavily armed and armoured, mounted on powerful warhorse', 
  ['lance'], ['crossbow'],
  {m: 8, s: 4, t: 4, ws: 5, bs: 2, a: 3, w: 3, i: 5, ld: 10, sv: 2, defMods: 0, pointCost: 10}, 2, 'humans', 1,
  'Mounted on his trusly warhorse he can move swiftly around battle field. With decades of battlefield experience he/she is master of both melee and ranged combat.', 1),
  new gameUnit(
  'Knight', 'cavalry','Tough elite unit mounted on warhorses. Well armed with lances and armoured with excellent plate armours',
  ['lance', 'shield'], ['no weapon'],
  {m: 8, s: 4, t: 4, ws: 5, bs: 4, a: 2, w: 2, i: 4, ld: 9, sv: 2, defMods: 1, pointCost: 7}, 2, 'humans', 5,
  'Tough elite unit mounted on warhorses. Well armed with lances, shields and armoured with excellent plate armours', 5),
  new gameUnit(
  'Swordsman', 'infantry', 'Infantryman of human. Well trained. Armed with sword and shield.', 
  ['longsword', 'shield'], ['no weapon'],
  {m: 5, s: 3, t: 3, ws: 3, bs: 4, a: 1, w: 1, i: 3, ld: 8, sv: 5, defMods: 1, pointCost: 3}, 1,  'humans', 10,
  'Professional infantry soldiers, lightly armoured, armed with longsword and shield.', 5),
  new gameUnit(
  'Crossbowman', 'infantry', 'Good and cheap ranged unit. Crossbows are deadly and easy to use.', 
  ['dagger'], ['crossbow'],
  {m: 5, s: 3, t: 3, ws: 2, bs: 3, a: 1, w: 1, i: 3, ld: 8, sv: 6, defMods: 0, pointCost: 5}, 1,  'humans', 10,
  'Usually not that trained, but using crossbows with deadly accuration doesnt need that much training. Mostly considered as unfair weapon as most unworthy rookie soldier can kill a noble life-time of trained knight with one shot.', 6),
  new gameUnit(
  'Longbowman', 'infantry', 'It takes lots of training to be a good archer, like these guys are.', 
  ['dagger'], ['longbow'],
  {m: 5, s: 3, t: 3, ws: 2, bs: 3, a: 1, w: 1, i: 3, ld: 8, sv: 6, defMods: 0, pointCost: 7}, 1,  'humans', 10,
  'I takes a lot of training to be a good archer, like these guys are. Absolutely deadly fire rate. Usually against most of the units it is one volley that all it takes to destroy the unit', 5),
  new gameUnit(
  'Peasant', 'infantry', 'These guys are not really fighters, but sometimes quantity overwhelmes quality.', 
  ['spear'], ['no weapon'],
  {m: 4, s: 3, t: 3, ws: 2, bs: 5, a: 1, w: 1, i: 3, ld: 7, sv: 6, defMods: 0, pointCost: 1}, 1,  'humans', 20,
  'These guys are excellent farmers... but in battlefield not worth much. However sometimes quantity overwhelmes quality', 10)
];

const elves = [
  new gameUnit(
  'Elven lord', 'commander','Elven lords are very dangerous, both melee and ranged combat.', 
  ['enhanced sword'], ['elven longbow'],
  {m: 5, s: 3, t: 3, ws: 5, bs: 2, a: 3, w: 3, i: 6, ld: 10, sv: 2, defMods: 0, pointCost: 15}, 1, 'elves', 1,
    'Elven lords are very dangerous, both melee and ranged combat.', 1),
  new gameUnit(
  'Green dragon', 'monster','Huge winged monster that burns everything, except those that it will rip to parts.',
  ['teeth and claws'], ['dragonfire'],
  {m: 8, s: 6, t: 7, ws: 4, bs: 4, a: 5, w: 10, i: 3, ld: 10, sv: 2, defMods: 0, pointCost: 60}, 10, 'elves', 1,
  'Huge winged monster that burns everything, except those that it will rip to parts.', 2),
  new gameUnit(
  'Elf ranger', 'infantry', 'Excellent scout unit that can fight both ranged and melee.', 
  ['longsword'], ['elven shortbow'],
  {m: 7, s: 3, t: 3, ws: 4, bs: 3, a: 1, w: 1, i: 4, ld: 8, sv: 5, defMods: 1, pointCost: 4}, 1,  'elves', 10,
  'Excellent scout unit that can fight both ranged and melee.', 5),
  new gameUnit(
  'Elven archer', 'infantry', 'Longbow is very deadly ranged weapon and these guys are best archers around.', 
  ['dagger'], ['elven longbow'],
  {m: 5, s: 3, t: 3, ws: 3, bs: 2, a: 1, w: 1, i: 4, ld: 8, sv: 5, defMods: 0, pointCost: 10}, 1,  'elves', 10,
  'Longbow is very deadly ranged weapon and these guys are the best archers around.', 5),
  new gameUnit(
  'Elf rider', 'cavalry', 'Riding fast horse these elves like to ride around enemies while peppering them with deadly accuracy with their bows.', 
  ['longsword'], ['elven longbow'],
  {m: 9, s: 3, t: 3, ws: 4, bs: 3, a: 1, w: 2, i: 4, ld: 8, sv: 4, defMods: 1, pointCost: 8}, 2,  'elves', 5,
  'Riding fast horse these elves like to ride around enemies while peppering them with deadly accuracy with their bows.', 5),
  new gameUnit(
  'Swordmaster', 'infantry', 'Most of the elves love their bows but in some cases they decide to dedicate to join the swordmaster brotherhood to dedicate their life to train fighting with swords.', 
  ['nodachi'], ['no weapon'],
  {m: 5, s: 3, t: 3, ws: 6, bs: 3, a: 2, w: 1, i: 5, ld: 8, sv: 4, defMods: 1, pointCost: 5}, 1,  'elves', 10,
  'Most of the elves love their bows but in some cases they decide to dedicate to join the swordmaster brotherhood to dedicate their life to train fighting with swords.', 3),
  new gameUnit(
  'Unicorn', 'monster', 'Mythical horselike creature, that can stick you with his magical horn. Fast but not very armoured.', 
  ['unicorn horn'], ['no weapon'],
  {m: 9, s: 4, t: 4, ws: 4, bs: 3, a: 2, w: 2, i: 5, ld: 8, sv: 5, defMods: 1, pointCost: 5}, 2,  'elves', 5,
  'Mythical horselike creature, that can stick you with his magical horn. Fast but they as they are not armoured, they can not take that much punishment.', 2)
];

const dwarves = [
  new gameUnit(
  'Dwarf warchief', 'commander','Battlegroup commander, heavily armed and armoured, veteran of hundreads of battles', 
  ['runic axe', 'shield'], ['no weapon'],
  {m: 4, s: 4, t: 4, ws: 6, bs: 2, a: 3, w: 4, i: 3, ld: 10, sv: 1, defMods: 1, pointCost: 25}, 1, 'dwarves', 1,
  'Battlegroup commander, heavily armed and armoured, veteran of hundreads of battles', 1),
  new gameUnit(
  'Dwarf infantry', 'infantry','Tough and well armed, but somewhat slow.',
  ['battleaxe', 'shield'], ['no weapon'],
  {m: 4, s: 4, t: 4, ws: 3, bs: 4, a: 1, w: 1, i: 3, ld: 9, sv: 3, defMods: 1, pointCost: 3}, 1, 'dwarves', 10,
  'Dwarf infantry is made of dwarven citizens. Tough and well armed, but somewhat slow.', 6),
  new gameUnit(
  'Mountain guardian', 'infantry', 'Elite infantry of dwarves. If you are opponent, watch out for these guys!', 
  ['halberd', 'shield'], ['no weapon'],
  {m: 4, s: 4, t: 5, ws: 5, bs: 4, a: 2, w: 2, i: 4, ld: 9, sv: 1, defMods: 0, pointCost: 8}, 1,  'dwarves', 10,
  'Unlike normal dwarf infantry, these elite infantry are professionals. If you are opponent, watch out for these guys!', 6),
  new gameUnit(
  'Steel golem', 'monster', 'Steam-powered monstrosity. Controlled by dwarf warchief to punish enemies', 
  ['steel fists'], ['auto crossbow'],
  {m: 5, s: 6, t: 7, ws: 4, bs: 4, a: 3, w: 7, i: 3, ld: 10, sv: 2, defMods: 0, pointCost: 30}, 4,  'dwarves', 1,
  'Steam-powered monstrosity. Controlled by dwarf warchief with mystical psionic stones of elven origin. Only dwarves possess information how to construct these metallic monsters.', 3),
  new gameUnit(
  'Steamtank', 'monster', 'Steam-powered battlewagon. hard to break and causes damage with powerful catapult', 
  ['crash'], ['catapult'],
  {m: 5, s: 5, t: 8, ws: 3, bs: 4, a: 2, w: 10, i: 2, ld: 10, sv: 2, defMods: 0, pointCost: 90}, 13,  'dwarves', 1,
  'Steam-powered battlewagon. hard to break and causes damage with powerful catapult. Humans have tried to copy these, but so far they havent been able to get realiable and powerful enough steam engine made.', 3)
];

const savages = [
  new gameUnit(
  'Giant warchief', 'commander','Huge armoured giant with giant sized sword...RUN!', 
  ['gigantic sword', 'shield'], ['no weapon'],
  {m: 5, s: 7, t: 7, ws: 4, bs: 2, a: 3, w: 9, i: 2, ld: 10, sv: 1, defMods: 0, pointCost: 50}, 10, 'savages', 1,
  'Giants are terrifying, but this giant is bit smarter than normal giant and is _armoured_ and instead of some treetrunk he as managed to get a real huge sword.', 1),
  new gameUnit(
  'Red dragon', 'monster','Huge winged monster that burns everything, except those that it will rip to parts.',
  ['teeth and claws'], ['dragonfire'],
  {m: 8, s: 5, t: 7, ws: 4, bs: 3, a: 4, w: 10, i: 4, ld: 10, sv: 2, defMods: 0, pointCost: 55}, 10, 'savages', 1,
  'Huge winged monster that burns everything. Red dragons are more dangerous with their fire, than their green cousins. But greens are bit better in melee.', 2),
  new gameUnit(
  'Viking raider', 'infantry', 'Elite infantry. Fearless and relentless!', 
  ['battleaxe', 'battleaxe'], ['no weapon'],
  {m: 6, s: 4, t: 4, ws: 5, bs: 4, a: 2, w: 1, i: 5, ld: 9, sv: 4, defMods: 0, pointCost: 4}, 1,  'savages', 10,
  'Viking tribe humans devout themselves to war and raid. Very skillfull fighters, well armed usually, but they are not that heavily armoured, as they prefer speed over armour.', 6),
  new gameUnit(
  'Hill giant', 'monster', 'Huge, Strong, Dumb, but absolutely deadly', 
  ['treetrunk'], ['no weapon'],
  {m: 5, s: 7, t: 7, ws: 4, bs: 4, a: 3, w: 8, i: 2, ld: 10, sv: 4, defMods: 0, pointCost: 45}, 10,  'savages', 1,
  'Hill giants are 5 meters tall strong, but quite dumb humanoids. Every warlords dream soldiers.', 3),
  new gameUnit(
  'Ogre merc', 'infantry', 'Ogre mercenaries are strong and quite well equipped big humanoids.',  
  ['halberd'], ['heavy crossbow'],
  {m: 5, s: 5, t: 5, ws: 4, bs: 4, a: 2, w: 3, i: 2, ld: 10, sv: 3, defMods: 0, pointCost: 7}, 3,  'savages', 5,
  'Ogre mercenaries are strong and quite well equipped humanoids. That are very brutal melee warriors and with deadly heavy crossbows.', 3),
  new gameUnit(
  'Peasant rebel', 'infantry', 'These guys are not really fighters, but sometimes quantity overwhelmes quality.', 
  ['spear'], ['no weapon'],
  {m: 5, s: 3, t: 3, ws: 2, bs: 5, a: 1, w: 1, i: 3, ld: 7, sv: 6, defMods: 0, pointCost: 1}, 1,  'savages', 20,
  'These guys are excellent farmers... but in battlefield not worth much. However sometimes quantity overwhelmes quality', 10)
];

const vampires = [
  new gameUnit(
  'Vampire lord', 'commander','Strong sorcerer that can fight in melee too.', 
  ['enhanced sword'], ['fireball'],
  {m: 5, s: 5, t: 4, ws: 5, bs: 2, a: 4, w: 6, i: 7, ld: 10, sv: 2, defMods: 0, pointCost: 65}, 1, 'vampires', 1,
    'Strong sorcerer that can fight in melee too. Ancient vampire counts are maybe the most dangerous inviduals one can find', 1),
  new gameUnit(
  'Zombie', 'infantry', 'These walking deads are not really good for anything, but they are cheap.', 
  ['spear'], ['no weapon'],
  {m: 3, s: 3, t: 3, ws: 2, bs: 5, a: 1, w: 1, i: 2, ld: 7, sv: 6, defMods: 0, pointCost: 1}, 1,  'vampires', 30,
  'Cheap... you can try to overwhelm your enemy with these..maybe', 10),
  new gameUnit(
  'Skeleton archer', 'infantry', 'Longbow is very deadly ranged weapon. They are not as good shooters as living archers, but still quite good.', 
  ['dagger'], ['longbow'],
  {m: 3, s: 3, t: 3, ws: 2, bs: 4, a: 1, w: 1, i: 2, ld: 8, sv: 6, defMods: 0, pointCost: 6}, 1,  'vampires', 10,
  'Longbow is very deadly ranged weapon. They are not as good shooters as living archers, but still quite good.', 5),
  new gameUnit(
  'Vampire rider', 'cavalry', 'Riding fast dire wolves or other monsters make them fast and deadly melee warriors.', 
  ['longsword'], ['no weapon'],
  {m: 9, s: 5, t: 4, ws: 4, bs: 3, a: 2, w: 3, i: 7, ld: 8, sv: 2, defMods: 1, pointCost: 10}, 2,  'vampires', 5,
  'Riding fast dire wolves or other monsters make them fast and deadly melee warriors. Very well armoured.', 5),
  new gameUnit(
  'Necromancer', 'infantry', 'Can not really fight in melee. But devastating short range fireball launcher.', 
  ['dagger'], ['fireball'],
  {m: 4, s: 3, t: 3, ws: 4, bs: 3, a: 2, w: 1, i: 3, ld: 8, sv: 4, defMods: 1, pointCost: 10}, 1,  'vampires', 1,
  'Can not really fight in melee. But devastating short range fireball launcher.', 3),
  new gameUnit(
  'Black unicorn', 'monster', 'Mythical horselike creature, that can stick you with his magical horn. Fast but not very armoured.', 
  ['unicorn horn'], ['no weapon'],
  {m: 9, s: 4, t: 4, ws: 4, bs: 3, a: 2, w: 2, i: 5, ld: 8, sv: 5, defMods: 1, pointCost: 5}, 2,  'vampires', 5,
  'Mythical horselike creature, that can stick you with his magical horn. Fast but they as they are not armoured, they can not take that much punishment.', 2)
];

// SCI-FI:

const imperials = [
  new gameUnit(
  'Command tank', 'commander', 'communications tank with commander inside', ['crash'], ['heavy machinegun', 'heavy machinegun'],
  {m: 8, s: 5, t: 6, ws: 2, bs: 4, a: 2, w: 7, i: 2, ld: 8, sv: 2, defMods: -1, pointCost: 25}, 9,  'imperials', 1,
  'Tank of commander. Modificated command tank of Lizard light tank design. Armed with twin heavy machine gun.', 1),
  new gameUnit(
  'Guardsman', 'infantry','human imperial soldiers. ok shooters, bad in melee', ['bayonet'], ['assault rifle mk3'],
  {m: 6, s: 3, t: 3, ws: 3, bs: 4, a: 1, w: 1, i: 3, ld: 8, sv: 5, defMods: 0, pointCost: 1}, 1, 'imperials', 10,
  'Well trained and equipped professional soldiers. Backbone of imperial army. Breastplates can save the day and mk3 assault rifle will save a day!', 5),
  new gameUnit(
  'Grizzly battletank', 'vehicle', 'excellent medium battletank', ['crash'], ['battlecannon', 'heavy machinegun'],
  {m: 6, s: 6, t: 7, ws: 2, bs: 4, a: 2, w: 10, i: 2, ld: 8, sv: 3, defMods: -1, pointCost: 30}, 10,  'imperials', 1,
  'Legendary grizzly main battle tank really doesn not need any introduction. Excellent firepower with battle cannon and heavy machine gun, combined with powerful engine and strong armour. ', 3), 
  new gameUnit(
  'Lizard light tank', 'carrier', 'light tank that can carry soldiers', ['crash'], ['heavy machinegun'],
  {m: 9, s: 5, t: 6, ws: 2, bs: 4, a: 2, w: 7, i: 2, ld: 8, sv: 3, defMods: -1, pointCost: 20}, 9,  'imperials', 1,
  'Lizard light tank is fast armoured troop carrier. Equipped with heavy machine gun.', 5),
  new gameUnit(
  'Ranger', 'infantry', 'elite imperial soldier', ['bayonet'], ['sniper rifle',],
  {m: 7, s: 3, t: 3, ws: 3, bs: 3, a: 1, w: 1, i: 4, ld: 8, sv: 5, defMods: 1, pointCost: 4}, 1,  'imperials', 5,
  'Imperial elite soldiers. Expert marksmen, armed with powerful sniper rifles can kill enemy infantry from far.', 5),
  new gameUnit(
  'Elephant artillery', 'vehicle', 'heavy self-propelled cannon', ['crash'], ['meteor cannon'],
  {m: 2, s: 6, t: 6, ws: 2, bs: 4, a: 1, w: 7, i: 2, ld: 8, sv: 3, defMods: -2, pointCost: 28}, 10,  'imperials', 1,
  'Slow artillery unit with light armour. Equipped with devastating meteor cannon. Good for destroying, well... everything', 3)
];

const royalGuard = [
  new gameUnit(
  'Knight commander', 'commander','battlegroup commander, heavily armed and armoured', ['chainsword'], ['laser rifle'],
  {m: 6, s: 4, t: 4, ws: 5, bs: 2, a: 3, w: 3, i: 5, ld: 10, sv: 2, defMods: 0, pointCost: 15}, 2, 'royalGuard', 1,
  'Knight commander is super soldiers amongst the super soldiers. You need decades of service to raise the rank of a Knight Commander. Deadly in melee and ranged combat.', 1),
  new gameUnit(
  'Knight', 'infantry','wearing heavy armour, jetpack and rifle. fast and tough elite unit', ['combat gauntlet'], ['laser rifle'],
  {m: 8, s: 4, t: 4, ws: 4, bs: 3, a: 1, w: 1, i: 4, ld: 9, sv: 3, defMods: 0, pointCost: 10}, 1, 'royalGuard', 8,
  'Knight infantrymen move fast with jetpack, hit hard with combat gauntlets and shoot deadly with laser rifles. Nuff said.', 5),
  new gameUnit(
  'Masticore tank', 'vehicle', 'royal guard heavy tank', ['crash'], ['laser cannon', 'laser cannon', 'heavy machinegun', 'heavy machinegun'],
  {m: 5, s: 7, t: 8, ws: 2, bs: 3, a: 1, w: 12, i: 3, ld: 9, sv: 2, defMods: -2, pointCost: 50}, 12,  'royalGuard', 1,
  'Very heavy tank. With very heavy armour and firepower. Rips armoured units with two laser cannons and infantry with two heavy machine guns.', 3)
];
