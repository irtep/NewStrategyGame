  const gameObject = { // seq: nombre, location, type, desc, meleeWeapons, rangedWeapons,
                       //stats, size, army, order, targeted, quantity
    // MELEE:
    factions: [humans, elves], // player 1: 0 player 2: 1.
    army1: armies[2], // 0 ig, 1 sm, 2 kingd, 3 elves
    army2: armies[3],  // but start will overwrite
    terrain: worlds[2], // 0 farm, 1 forest, 2 village 
    selectedUnits: {player1: null, player2: null}, 
    targetedUnits: {player2: null, player2: null},
    // CAMPAIGN:
    campaignArmies: {
      humans: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false},
      elves: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false},
      dwarves: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false},
      vampires: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false},
      savages: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false}
    },
    turn: 1
  };
              
              