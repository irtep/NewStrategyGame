/*

Start to look good.
To add: 
- More test.
- load and delete game 
- complete end game
- top20 players list.

Continue: load game doesnt work... need to investigate, stucks at mapscreen.js at callUpdate..
*/
/*
Known bugs:
  serious:
    #1 long combat problematic as they dont necessarily engage after killing many.. (check from battlelog...)
  
    #2 engage enemy doesnt work almost ever. (fix in, keep checking....)
    
  minors:
    #1
    sometimes when other team is killed, need to click standby, pause or whatever to get continue button

    #2
    map doesnt show most southern towns completely with texts, atleast with this laptop.
    
    #3 when in long battle, sometimes other team doesnt hit...maybe
*/

/*
Usefull about mouse coordinates:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button
*/

/*
for campaign:

map: 3 lands for you, 6 free lands, 3 for dwarves, 3 for elves.

actions: invade, reposition troops, start quest

human campaign:
point cost is upkeep cost in campaign
coast (income 150), woodslands(100), central(150)

query 1: divide troops between your three lands. you have: commander (you), 6 peasants, 2 swordsmen, 2 crossbowmen (290p)
consiquences: if any undefended, bandits take it over after few turns.

query 2: free land 1 asks unification as they have heard rumours about incoming barbarian attack. want to join them?
consiq: free country for you... would be stupid not to take. will be overrun by barbs, if you refuse. you get troops if you take.

query 3: free land 2 asks unification, but only if you join their raid against elves.
consiq: free city, but if you take elves attack you. if you dont take elves take their city as their raid backslashes.
: barbs attack to free land 1 at this point and also to your home coast land and two other free lands.

query 4: free land 5 asks alliance as they have a conflict againts dwarves.
consiq: free city, but conflict with dwarves.
: vampire lord takes control over free land 6 with strong army and starts to rumble

query 5: peasants ask some money as they are forced to fight, instead of work. pay, but less than ask? pay what they ask? dont pay?
consiq: peasant revolt if you dont pay what they ask: you lose all peasant units and 3 of your lands are attacked by peasant armies.

Event: civil war. rebel general takes over half of your troops... damn...
*/
/* Quests:
- Slay Ancient dragon
- Slay vampire lord
- Raid elf land
- Raid north
- Raid dwarf stronghold
*/

// just to store simple move from array to array.. maybe i should make a function for it as i always forget this :)
  /*
  const testFolder = ['fo1', 'fo12'];
  const testFolder2 = ['fo 2', 'fo 3'];
  console.log('t1 t2', testFolder, testFolder2);
  const new1 = testFolder.concat([]);
  const new2 = testFolder2.concat([]);
  new1.push(new2[0]);
  const removed = new2.splice(0, 1);
  console.log('t1 t2 now ', new1, new2);
  */