/*

     <script>
                        // start of script ***********************************************************************



function GameCharacter(nombre, race, guild, hitPoints, speed, strenght, mskill, 
    rskill, magic, armour, initiative, basesize, attacks, selectedCode) 
    {
    
    this.nombre = nombre;
    this.race = race;
    this.guild = guild;
    this.hitPoints = hitPoints;
    this.speed = speed;
    this.strenght = strenght;
    this.mskill = mskill;
    this.rskill = rskill;
    this.magic = magic;
    this.armour = armour;
    this.initiative = initiative;
    this.basesize = basesize;
    this.attacks = attacks;
    this.selectedCode = selectedCode;

}   

function CharInGame(nombre, race, guild, hitPoints, speed, strenght, mskill, 
    rskill, magic, armour, initiative, basesize, attacks, exp, level, clothes, head,
    righth, lefth, gold, team, x, y, engaged, enabled, order, targeted, hpATM) 
    {
    
    this.nombre = nombre;
    this.race = race;
    this.guild = guild;
    this.hitPoints = hitPoints;
    this.speed = speed;
    this.strenght = strenght;
    this.mskill = mskill;
    this.rskill = rskill;
    this.magic = magic;
    this.armour = armour;
    this.initiative = initiative;
    this.basesize = basesize;
    this.attacks = attacks;

    this.exp = exp;
    this.level = level;
    this.clothes = clothes;
    this.head = head;
    this.righth = righth;
    this.lefth = lefth;
    this.gold = gold;
    this.team = team;
    this.x = x;
    this.y = y;
    this.engaged = engaged;
    this.enabled = enabled;
    this.order = order;
    this.targeted = targeted;
    this.hpATM = hpATM;

}


function drawUnits(gameObject,canvas,ctx) {


    gameObject.pArmy.forEach(function(unit){ // draw enabled from pArmy

        if (unit.enabled === true) {

            ctx.beginPath();  
            ctx.fillStyle = 'black';  
            ctx.arc(unit.x, unit.y, unit.basesize, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.font = '15px serif';
            ctx.fillStyle = 'green';
            ctx.fillText(unit.nombre, unit.x-40, unit.y-13);
            ctx.fillText("Action:", unit.x-40, unit.y);
            ctx.fillStyle = 'white';        
            ctx.fillText(unit.order, unit.x-40, unit.y+13);
            ctx.fillStyle = 'blue';
            ctx.fillText("at:", unit.x-60, unit.y+25);
            ctx.fillStyle = 'white';        
            ctx.fillText(unit.targeted, unit.x-40, unit.y+25); 
            ctx.fillStyle = 'green';
            ctx.fillText("HP:", unit.x-40, unit.y+40);        
            ctx.fillText(unit.hpATM, unit.x-10, unit.y+40); 
            ctx.fillText("/", unit.x+10, unit.y+40); 
            ctx.fillText(unit.hitPoints, unit.x+13, unit.y+40); 


        } //if 

    
    }) // function, for each
    
    gameObject.aArmy.forEach(function(unit){ // draw enabled from aArmy

        if (unit.enabled === true) {

            ctx.beginPath();  
            ctx.fillStyle = 'black';  
            ctx.arc(unit.x, unit.y, unit.basesize, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.font = '15px serif';
            ctx.fillStyle = 'green';
            ctx.fillText(unit.nombre, unit.x-40, unit.y-13);
            ctx.fillText("Action:", unit.x-40, unit.y);
            ctx.fillStyle = 'white';        
            ctx.fillText(unit.order, unit.x-40, unit.y+13);
            ctx.fillStyle = 'blue';
            ctx.fillText("at:", unit.x-60, unit.y+25);
            ctx.fillStyle = 'white';        
            ctx.fillText(unit.targeted, unit.x-40, unit.y+25); 
            ctx.fillStyle = 'green';
            ctx.fillText("HP:", unit.x-40, unit.y+40);        
            ctx.fillText(unit.hpATM, unit.x-10, unit.y+40); 
            ctx.fillText("/", unit.x+10, unit.y+40); 
            ctx.fillText(unit.hitPoints, unit.x+13, unit.y+40); 


        } //if 

    
    }) // function, for each    

    console.log("enabled units drawn.");

} // draw units

function meleeAttack() {

} // of melee attack function

function gox(directionx) {

        //document.getElementById("choose").innerHTML = "";

        $("#directions").hide();


} // function go

function targetIs(whoIsTarget) {

        document.getElementById("choose").innerHTML = "";

} // function targetIs


function selectTarget(WhoTargetting) {

    document.getElementById("choose").innerHTML = "Choose target for attack";
    var howMany = enabledAgrunts.length;
    charInTurn = WhoTargetting;

  

}  // selecttarget function

function nextInTurn(whoWas) {



} // nextinturn function

// spells

function timeForAction() { // main action phase ((timeforaction


} // of time for action

function executeOrder(whoIs, whatOrder, whatTarget) {  // toimi Iron Bralla, mutta Luisilla moven tilalle tulee "nothing" 


// ranged

// melee

}

function lightningBolt() {



} // lightning bolt function


function clearTextBox(whatBox) {  // to clear info text box after when action was not possible
                     $("#actions1line").show();
    document.getElementById("information1").innerHTML = "";
    console.log("clear text box at:",whatBox,"executed");
}

function clearTextBox2(whatBox) {  // to clear info text boxes after selecting movement
                     $("#directions").show();
    document.getElementById("information1").innerHTML = "";
    console.log("clear text box at:",whatBox,"executed");
}

function charMove(whoNow) {  // to select move as an action
    $(document).ready(function(){
       $("#actions1line").hide();
    });
 
    } // of switch

}

function collisionDetect(obj1, obj2) { // collision detector
    // not tested yet.
    /*
    var circle1 = {radius: 20, x: 5, y: 5};
    var circle2 = {radius: 12, x: 10, y: 5}; */ // esimerkin varit
        
    var dx = obj1.x - obj2.x;
    var dy = obj1.y - obj2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < obj1.radius + obj2.radius) {
        obj1.engaged = true;
        obj2.engaged = true;
    // collision detected!
    }
}

function rangedOrSpell() {   // when selected ranged or spell as an action

    $(document).ready(function(){

    $("#actions1line").hide();
        
    });

   
    } // of function

function battleLoop(gameObject){ //((battleloop

    console.log("battleLoop fired");
    var infox1 = document.getElementById("information1");  // declare shortnames for infoboxes
    var infox2 = document.getElementById("information2");
    var infox3 = document.getElementById("information3");
    var infox4 = document.getElementById("information4");
    var infox5 = document.getElementById("information5");
    var infox6 = document.getElementById("information6");
    var infox7 = document.getElementById("information7");
    var infox8 = document.getElementById("information8");
    var infox9 = document.getElementById("information9");    
    var infox10 = document.getElementById("information10");
    
    var bb1 = document.getElementById("tt1"); // and for buttons
    var bb2 = document.getElementById("tt2");
    var bb3 = document.getElementById("tt3");
    var bb4 = document.getElementById("tt4");
    var bb5 = document.getElementById("tt5");
    var bb6 = document.getElementById("tt6");
    var bb7 = document.getElementById("tt7");
    var bb8 = document.getElementById("tt8");
    var bb9 = document.getElementById("tt9");
    var bb10 = document.getElementById("tt10");    

    if (gameObject.pArmy.length === 0 || gameObject.aArmy.length === 0) {
        // end game
    }
    
    gameObject.whoNow = gameObject.pArmy[0]; // set who in turn.

    // choose action for character in turn:
    infox1.innerHTML = "Choose action for:";
    infox2.innerHTML = gameObject.whoNow;    
    infox3.innerHTML = "-----------------";
    infox4.innerHTML = "Available Actions:"; 

    // show action buttons and add action text.
    $("#t1").show();
    bb1.textContent.data = "Move";
    $("#t2").show(); 
    bb2.textContent.data = "attack";
 
    // prepare saving of object, by stringifiyng it:
    var gOstring = JSON.stringify(gameObject);
   // Save gameObject to sessionStorage
    sessionStorage.setItem('objecti', 'gOstring');

    console.log("battleLoop ends");

}   // battleloop

function draw(gameObject) {
   //((draw
    var canvas = gameObject.canvas;
    var ctx = canvas.getContext("2d");

    console.log("draw");
    ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
        // set background
        drawUnits(gameObject,canvas,ctx);

}

function startGame() {

    // name,     race,  guild,              hp,sp,str,mat,rat,mag,arm,ini,base, attacks,exp,level,wear,     head,r,l,g,t,i
    // engaged, enabled/disabled, order, targeted hpATM

    // human        hp:13, speed: 7, str: 10, armour: 10, ini 70, base: 1, attacks 2
    // trollhuman   hp:15, speed: 6,  str: 13, armour: 12, ini 70, base: 2, attacks 2
    // evo-human    hp:15, speed: 8, str: 14, armour: 12, ini 80, base 1, attacks 2
    // wolfman      hp:30, speed: 6, str: 20, armour: 17, ini 60, base: 3, attacks 3
    // dire wolf    hp:22, speed: 8, str 15, armour: 15, ini 60, base: 2, attacks 2
    // ogre         hp:22, speed: 5, str 16, armour: 12, ini 55, base: 2, attacks 2


    var pCommander = {nombre: "nothing", enabled: false};
    var pGrunt1 = {nombre: "nothing", enabled: false};
    var pGrunt2 = {nombre: "nothing", enabled: false};
    var pGrunt3 ;
    var pGrunt4 = {nombre: "nothing", enabled: false};
    var pGrunt5 = {nombre: "nothing", enabled: false};
    var pGrunt6 = {nombre: "nothing", enabled: false};
    var pGrunt7 = {nombre: "nothing", enabled: false};
    var pGrunt8 = {nombre: "nothing", enabled: false};
    var pGrunt9 = {nombre: "nothing", enabled: false};

    var aCommander = {nombre: "nothing", enabled: false};
    var aGrunt1 = {nombre: "nothing", enabled: false};
    var aGrunt2 = {nombre: "nothing", enabled: false}; 
    var aGrunt3 = {nombre: "nothing", enabled: false};
    var aGrunt4 = {nombre: "nothing", enabled: false};
    var aGrunt5 = {nombre: "nothing", enabled: false};
    var aGrunt6 = {nombre: "nothing", enabled: false};
    var aGrunt7 = {nombre: "nothing", enabled: false};
    var aGrunt8 = {nombre: "nothing", enabled: false};
    var aGrunt9 = {nombre: "nothing", enabled: false}; 
    // characters
                            // name,     race,  guild,                  hp,sp,str,mat,rat,mag,arm,ini,base, attacks, selectedCode
    var ironBra = new GameCharacter("Iron Bra","trollhuman","shaman",       15, 5, 10, 5,  4,  8, 12, 50, 2,       2,      1);
    var adri = new GameCharacter("Adri","human","druid",                    13, 7, 8,  6,  5,  7, 10, 60, 1,       2,      2);
    var donManuel = new GameCharacter("Don Manuel","evo-human","knight",    15, 6, 10, 7,  6,  0, 12, 65, 1,       2,      3);
    var luis = new GameCharacter("Luis","wolfman","fighter",                30, 6, 20, 7,  1,  0, 17, 55, 3,       3,      4);
    var queen = new GameCharacter("Queen","dire wolf","fighter",            22, 8, 15, 5,  0,  0, 15, 70, 2,       2,      5);

    // generic monsters
    var ogrebandit = new GameCharacter("Ogre bandit","ogre","fighter",      22, 5, 16, 6,  5,  0, 12, 55, 2,       2,      6);
    var humanbandit = new GameCharacter("Human bandit","human","fighter",   13, 6, 8,  6,  5,  0, 10, 55, 1,       2,      7);


        console.log("Start game, fired");
    // deploy: //x, y, radius, startAngle, endAngle, anticlockwise);
                     
          /*  // sorttaaa initative järjestyksee:
        actionGrunts.sort(function(a, b)  {

        return a.initiative - b.initiative;
     */
    // all sorted

 // statit:
 // nombre, race, guild, hitPoints, speed, strenght, mskill, 
 //   rskill, magic, armour, initiative, basesize, attacks, exp, level, clothes, head,
  //  righth, lefth, gold, team, x, y, engaged, enabled, order, targeted, hpATM

    // make a game object:
    var gameObject = { 
        pArmy:[        
        new CharInGame("Iron Bra","trollhuman","shaman",       15, 5, 10, 5,  4,  8,  12, 50, 30,      2,   0,  1,"iron breastplate","nothing","a steel knife","unarmed",100,"playerTeam", 300, 100, false, true, "nothing", "nothing", 15)
        ,
        new CharInGame("Luis","wolfman","fighter",                 30, 6, 20, 7,  1,  0, 17, 55, 60,       3,   0,  1,"nothing","nothing","unarmed","unarmed",0,"playerTeam", 400, 100, false, true, "nothing", "nothing", 30)
        ],
        aArmy:[        
        new CharInGame("Ogre bandit","ogre","fighter",      22, 5, 16, 6,  5,  0, 12, 40, 40,       2,   0,  1,"iron breastplate","nothing","a steel lance","occupied",100,"aiTeam", 400, 500, false, true, "nothing", "nothing", 22)
        ,
        new CharInGame("Human bandit1","human","fighter",   13, 6, 8,  6,  5,  0, 10, 52, 30,       2,   0,  1,"iron breastplate","nothing","a hunting rifle","occupied",100,"aiTeam", 300, 500, false, true, "nothing", "nothing", 13)
        ,
        new CharInGame("Human bandit2","human","fighter",   13, 6, 8,  6,  5,  0, 10, 48, 30,       2,   0,  1,"iron breastplate","nothing","a hunting knife","occupied",100,"aiTeam", 500, 500, false, true, "nothing", "nothing", 13)
        ],
        canvas: document.getElementById("kanveesi")
        ,
        roundNumber: 1
        ,
        whatNow: "Choose action for:"
        ,
        whoNow: ""
        }
            
        draw(gameObject);
        battleLoop(gameObject);   
        // add who now to commander of player    
} // set teams

    $(document).ready(function(){  // hide all buttons at this point

    $(":button").hide();
        
    });
    
    $(":button").click(function (event) {  // event listener for buttons.
        alert(event.target.id + ' is click!');
    });

window.onload = function() {
  startGame();
};
        </script>
*/