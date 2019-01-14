               
const worlds = [ // AREA: a farm  -------------------------
              {terrain: 
              [  // buildings:
              {building: 'small building', location: {x: 250, y: 222}, size: {width: 45, height: 45}, type: 'building'},
              {building: 'medium building', location: {x: 550, y: 240}, size: {width: 120, height: 60}, type: 'building'},
              {building: 'large building', location: {x: 420, y: 260}, size: {width: 77, height: 140}, type: 'building'},
               // forests:
              {forest: 'small forest', locations: [{x: 100, y: 330},{x: 155, y: 330},{x: 220, y: 390},{x: 200, y: 330}],
               trees: 4, radiuses: [25, 54, 48, 27], type: 'forest'}
             ],
             deploymentZone1: {x: 50, y: 18}, deploymentZone2: {x: 890, y: 580} 
             },  // AREA:  forest  -------------------------
              {terrain: 
              [  // buildings:
               // forests:
              {forest: 'small forest', locations: [{x: 100, y: 330},{x: 155, y: 330},{x: 220, y: 390},{x: 200, y: 330}],
               trees: 4, radiuses: [25, 54, 48, 27], type: 'forest'},
              {forest: 'small forest', locations: [{x: 300, y: 330},{x: 355, y: 330},{x: 320, y: 390},{x: 300, y: 330}],
               trees: 4, radiuses: [25, 54, 48, 27], type: 'forest'},
              {forest: 'small forest', locations: [{x: 500, y: 330},{x: 555, y: 330},{x: 520, y: 290},{x: 300, y: 130},
                                                   {x: 420, y: 490},{x: 150, y: 30}],
               trees: 4, radiuses: [25, 54, 48, 27, 70, 22], type: 'forest'},
                {forest: 'small forest', locations: [{x: 550, y: 230},{x: 455, y: 230},{x: 520, y: 290},{x: 500, y: 330}],
               trees: 4, radiuses: [55, 74, 58, 47], type: 'forest'},
              {forest: 'small forest', locations: [{x: 700, y: 430},{x: 755, y: 430},{x: 720, y: 490},{x: 700, y: 430}],
               trees: 4, radiuses: [35, 64, 58, 37], type: 'forest'}
             ],
             deploymentZone1: {x: 50, y: 18}, deploymentZone2: {x: 890, y: 580} 
             },// AREA: village  -------------------------
              {terrain: 
              [  // buildings:
              {building: 'small building', location: {x: 250, y: 222}, size: {width: 45, height: 45}, type: 'building'},
              {building: 'medium building', location: {x: 550, y: 240}, size: {width: 120, height: 60}, type: 'building'},
              {building: 'large building', location: {x: 420, y: 260}, size: {width: 77, height: 140}, type: 'building'},
              {building: 'small building', location: {x: 650, y: 192}, size: {width: 45, height: 45}, type: 'building'},
              {building: 'medium building', location: {x: 820, y: 270}, size: {width: 120, height: 60}, type: 'building'},
              {building: 'large building', location: {x: 570, y: 320}, size: {width: 77, height: 140}, type: 'building'},
              {building: 'small building', location: {x: 800, y: 422}, size: {width: 75, height: 95}, type: 'building'},
              {building: 'medium building', location: {x: 250, y: 380}, size: {width: 120, height: 60}, type: 'building'},
              {building: 'large building', location: {x: 200, y: 200}, size: {width: 100, height: 140}, type: 'building'}
             ],
             deploymentZone1: {x: 400, y: 18}, deploymentZone2: {x: 600, y: 580} 
             }
];