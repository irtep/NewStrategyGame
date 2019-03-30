  var gameObject = { // seq: nombre, location, type, desc, meleeWeapons, rangedWeapons,
                       //stats, size, army, order, targeted, quantity
    // MELEE:
    gameMode: null, // 'skirmish' or 'melee', as from here it is checked what happens after fight.
    factions: [humans, elves], // player 1: 0 player 2: 1.
    army1: armies[2], // 0 ig, 1 sm, 2 kingd, 3 elves
    army2: armies[3],  // but start will overwrite
    terrain: worlds[2], // 0 farm, 1 forest, 2 village 
    selectedUnits: {player1: null, player2: null}, 
    targetedUnits: {player2: null, player2: null},
    // CAMPAIGN:
    campaignArmies: {
      humans: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false, nombre: 'humans'},
      elves: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false, nombre: 'elves'},
      dwarves: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false, nombre: 'dwarves'},
      vampires: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false, nombre: 'vampires'},
      savages: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false, nombre: 'savages'},
      armyOfPlayer: null,
      shoppingCart: null,
      cities: [
  // constructor:  public/combat/contructors.js
  // human start cities: city(nombre, income, shortDesc, longDesc, zones, controlledBy, unitsByControlled, unitsByInvaded, exits, defender
  new city('Crossroads', 100, 'Busy city in good strategic location', 'to be added..', 
           ['piece162', 'piece163', 'piece164'], 'human', [], [], 
           ['Centerwoods', 'Lurin', 'Arequipa', 'Lima'], null),
  new city('Riversend', 120, 'Wealthy port city. Good location', 'to be added..', ['piece136', 'piece137', 'piece155', 'piece156'], 'human', [], [],
          ['Lima', 'Seagarden', 'Centerwoods', 'Tumbes'], null),
  new city('Northfield', 90, 'Human northern city. Good connections', 'to be added..', ['piece88'], 'human', [], [],
          ['Centerwoods', 'Cajamarca', 'Lurin', 'Whitetower', 'Quito'], null),
  // elf cities:
  new city('Centerwoods', 100, 'Elf city in great center forest.', 'to be added..', ['piece104'], 'elf', [], [],
          ['Tumbes', 'Cajamarca', 'Northfield', 'Lurin', 'Crossroads', 'Riversend'], null),
  new city('Whitetower', 100, 'Old elven capital at tropical east forest.', 'to be added..', ['piece131', 'piece132', 'piece150', 'piece151'], 'elf', [], [],
          ['Quito', 'Arequipa', 'Lurin', 'Northfield'], null),
  new city('Seagarden', 110, 'Wealthy elven city.', 'to be added..', ['piece215', 'piece234'], 'elf', [], [],
          ['Riversend', 'Arequipa', 'Lima', 'Southdig'], null),
  // dwarf cities:
  new city('Ironhall', 100, 'Important dwarf stronghold in center north.', 'to be added..', ['piece8', 'piece27', 'piece28', 'piece9'], 'dwarf', [], [],
          ['Tumbes', 'Cajamarca', 'Steelhammer'], null),
  new city('Steelhammer', 100, 'Northeastern dwarf stronghold.', 'to be added..', ['piece15', 'piece16'], 'dwarf', [], [],
          ['Ironhall', 'Cajamarca', 'Quito'], null),
  new city('Southdig', 110, 'Southern rich dwarf city.', 'to be added..', ['piece242', 'piece243'], 'dwarf', [], [],
          ['Seagarden', 'Arequipa', 'Lima'], null),
  // neutral towns
  new city('Tumbes', 55, 'Bit remote location. But climate is nice and cool. Also access to coast brings some extra income in.', 'to be added..', ['piece41'], 'neutral', [], [],
          ['Riversend', 'Centerwoods', 'Ironhall', 'Cajamarca'], null),
  new city('Cajamarca', 35, 'Northern neutral stronghold. good strategical location', 'to be added..', ['piece67'], 'neutral', [], [],
          ['Tumbes', 'Northfield', 'Centerwoods', 'Ironhall', 'Steelhammer'], null),
  new city('Quito', 35, 'Somewhat remote location, but must have if you want to control east.', 'to be added..', ['piece74'], 'neutral', [], [],
          ['Steelhammer', 'Northfield', 'Whitetower'], null),
  new city('Lurin', 35, 'Important neutral stronghold in center north.', 'to be added..', ['piece145'], 'neutral', [], [],
          ['Crossroads', 'Northfield', 'Centerwoods', 'Whitetower'], null),
  new city('Lima', 35, 'Link between big time citadels Seagarden, Riversend and Crossroads.', 'to be added..', ['piece179'], 'neutral', [], [],
          ['Arequipa', 'Riversend', 'Crossroads', 'Seagarden'], null),
  new city('Arequipa', 35, 'Southern neutral stronghold. Who controls this can strike prettymuch everywhere in south', 'to be added..', ['piece204'], 'neutral', [], [],
          ['Crossroads', 'Whitetower', 'Seagarden', 'Southdig', 'Lima'], null)
      ],
      factions: [], // do not confuse with factions of melee part!!
      contested: [], // here are the contested cities.
      selected : { // this is to setup combat in campaign:
        army1: {chosenArmy: null, units: []},
        army2: {chosenArmy: null, units: []},
        field: null // can be used like this: worlds[0] 
    }
    },
    turn: 1,
    phaze: 'hire',
    campaignPlay: false, // tells if combat is on.
    comingFromFight: false,
    playerStats: {name: null, wins: 0, losses: 0, result: 'loss', pw: null}
  };
              
              
/* this is how it is in setup of skirmish
selected : {
army1: {chosenArmy: null, pointsLeft: 200, units: [], ready: false},
army2: {chosenArmy: null, pointsLeft: 200, units: [], ready: false},
field: worlds[0] // defaulted to 0
}
*/