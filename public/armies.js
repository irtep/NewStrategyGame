// armeis, need to fill: unit and quantity. everything else to default

// Imperial Armies 100p:
const armies = 
[[   // 0
  {unit: 'Command tank', id: 1, location: {x: 0, y: 0, z: 0}, quantity: 1, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null},
  
  {unit: 'Guardsman', id: 1, location: {x: 0, y: 0, z: 0}, quantity: 10, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null},
  
  {unit: 'Grizzly battletank', id: 2, location: {x: 0, y: 0, z: 0}, quantity: 1, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null},
  
  {unit: 'Lizard light tank', id: 3, location: {x: 360, y: 25, z: 0}, quantity: 1, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null},
  
  {unit: 'Ranger', id: 4, location: {x: 490, y: 25, z: 0}, quantity: 3, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null},
  
  {unit: 'Elephant artillery', id: 5, location: {x: 620, y: 25, z: 0}, quantity: 1, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null}
],
[   // 1
  {unit: 'Knight commander', id: 1, location: {x: 0, y: 0, z: 0}, quantity: 1, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null},
  
  {unit: 'Masticore tank', id: 2, location: {x: 0, y: 0, z: 0}, quantity: 1, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null},
  
  {unit: 'Knight', id: 3, location: {x: 360, y: 25, z: 0}, quantity: 5, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army1', details: null,
  firing: false, firingAt: null}
]
];



// Model:
/*
[{unit: 'Guardsman', id: 5, location: {x: 100, y: 500, z: 0}, quantity: 5, order: 'standby', target: null, 
             engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army2', details: null,
            firing: false, firingAt: null}, 
            {unit: 'Grizzly battletank', id: 6, location: {x: 590, y: 510, z: 0}, quantity: 1, order: 'standby', target: null, 
             engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army2', details: null,
            firing: false, firingAt: null}, 
            {unit: 'Guardsman', id: 7, location: {x: 500, y: 500, z: 0}, quantity: 6, order: 'standby', target: null, 
             engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: 'army2', details: null,
            firing: false, firingAt: null}
           ]
*/