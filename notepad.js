/*

Start to look good.
To add: 
- more maps, more armies. More test.
- Better and clearer user interface.
- campaign tool.
- Better highlight system.

Continue: continue with endTurn.js. Should setUp fights and after that combats should come back to endTurn.js          
*/
/*
Known bugs:
  Sometimes after fight or fighting opponent unit just standbies and waits there. at engine.js i think
*/

/*
Usefull about mouse coordinates:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button
*/

  /* classes to elements:
  element.style.backgroundColor = "red";
  document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");
  .topBorder
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

