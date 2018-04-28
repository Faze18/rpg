var luke = {
    name: "Luke Skywalker",
    attackPower: 10,
    attackDamage: 10,
    defendDamage: 30,
    startingAttack: 10,
    health: 125,
    startingHealth: 125,
    healthID: "#lukeHealthText",
    locationID: "#luke"

};
var vader = {
    name: "Darth Vader",
    attackPower: 15,
    attackDamage: 15,
    defendDamage: 15,
    startingAttack: 15,
    health: 150,
    startingHealth: 150,
    healthID: "#vaderHealthText",
    locationID: "#darth"


};
var starDestroyer = {
    name: "Star Destroyer",
    attackPower: 12,
    attackDamage: 12,
    defendDamage: 6,
    startingAttack: 12,
    health: 100,
    startingHealth: 100,
    healthID: "#starDestroyerHealthText",
    locationID: "#starDestroyer"


};
var deathStar = {
    name: "Death Star",
    attackPower: 20,
    attackDamage: 20,
    defendDamage: 30,
    startingAttack: 20,
    health: 200,
    startingHealth: 200,
    healthID: "#deathStarHealthText",
    locationID: "#deathStar"

};

var divClone;
var selected;
var defenderSelected;
var defenderSelect;
var gameOver = false;
var win = false;
var attackerSelected = false;
var defenderSelected = false;
var character = "";
var defenderCharacter;
var yourCharacterText;
var enemiesText;
var enemiesLeft = 3;
var status;
$( "#reset" ).hide();

var starDestroyerHealth = starDestroyer.health;
var lukeHealth = luke.health;
var darthHealth = vader.health;
var deathStarHealth = deathStar.health;

var lukeText = luke.name;
var darthText = vader.name;
var starDestroyerText = starDestroyer.name;
var deathStarText = deathStar.name;

function healthCheck() {
    if ( character.health <= 0 ) {
        gameOver = true;
        status = "LOSE";
    }
    if ( defenderCharacter.health <= 0 ) {
        $( "#defender" ).empty();
        if ( defenderSelected ) {
            enemiesLeft--;
        }
        defenderSelected = false;
    }
    if ( enemiesLeft == 0 ) { gameOver = true; status = "WIN"; }
}


// DISPLAY THE VARIABLES
// document.querySelector( "#lukeNameText" ).innerHTML = lukeText;
$( "#lukeNameText" ).html( luke.name );
$( "#vaderNameText" ).html( vader.name );
$( "#starDestroyerNameText" ).html( starDestroyer.name );
$( "#deathStarNameText" ).html( deathStar.name );

$( "#lukeHealthText" ).html( "Health:  " + luke.health );
$( "#vaderHealthText" ).html( "Health:  " + vader.health );
$( "#starDestroyerHealthText" ).html( "Health:  " + starDestroyer.health );
$( "#deathStarHealthText" ).html( "Health:  " + deathStar.health );

// document.querySelector( "#lukeHealthText" ).innerHTML = "Health:  " + lukeHealth;
document.querySelector( "#vaderHealthText" ).innerHTML = "Health:  " + darthHealth;
document.querySelector( "#starDestroyerHealthText" ).innerHTML = "Health:  " + starDestroyerHealth;
document.querySelector( "#deathStarHealthText" ).innerHTML = "Health:  " + deathStarHealth;



$( document ).ready( function () {
//Clone the Div
var divClone = $("#divCopy").clone(); 
game();
function game(){
    //SEMI WORKING
    $( ".col-lg-2" ).on( "click", $( this ), function () {
        // selected =  $(this ).detach("span" ); 
        if ( attackerSelected && defenderSelected ) {
            return false;
        }

        if ( attackerSelected && !defenderSelected ) {
            defenderCharacter = $( this ).attr( "value" );
            defenderSelect = $( this ).detach();
            $( "#defender" ).append( defenderSelect );
            defenderSelected = true;

            if ( defenderCharacter == "luke" ) {
                defenderCharacter = luke;

            }
            if ( defenderCharacter == "darth" ) {
                defenderCharacter = vader;
            }
            if ( defenderCharacter == "starDestroyer" ) {
                defenderCharacter = starDestroyer;

            }
            if ( defenderCharacter == "deathStar" ) {
                defenderCharacter = deathStar;
            }
        }
        if ( !attackerSelected ) {
            character = $( this ).attr( "value" );
            selected = $( this ).detach();
            $( "#player" ).append( selected );
            attackerSelected = true;

            if ( character == "luke" ) {
                character = luke;
            }
            if ( character == "darth" ) {
                character = vader;
            }
            if ( character == "starDestroyer" ) {
                character = starDestroyer;
            }
            if ( character == "deathStar" ) {
                character = deathStar;
            }
        }
        // Text update position
        if ( attackerSelected ) {
            yourCharacterText = $( "#yourCharacter" ).detach();
            $( "#yourCharacter2" ).append( yourCharacterText );
            $( "#enemiesText" ).text( "Enemies available to attack:" );
        }



    } );
    //***************ATTACK **************
    //***************ATTACK **************
    //***************ATTACK **************

    $( "#attack" ).click( function () {

        if ( !defenderSelected || !attackerSelected ) {
            if ( !attackerSelected ) {
                $( "#attackText" ).html( "Select An Attacker!" );
            }
            else {
                $( "#attackText" ).html( "Select An Enemy!" );
            }
        }

        $( "#attackText" ).html( "You attacked " + defenderCharacter.name + " for " + character.attackDamage + " health.<br>" );

        defenderCharacter.health -= character.attackDamage;
        if ( defenderCharacter.health > 0 ) {
            $( "#attackText" ).append( defenderCharacter.name + " attacked you for " + defenderCharacter.attackDamage + " health." );
            character.health -= defenderCharacter.attackDamage;
        }
        else {
            $( "#attackText" ).html( "You have defeated " + defenderCharacter.name + ". Select a new enemy." );
        }
        character.attackDamage += character.attackPower;
        healthCheck();
        $( character.healthID ).html( "Health:  " + character.health );
        $( defenderCharacter.healthID ).html( "Health:  " + defenderCharacter.health );




        if ( gameOver ) {
            $( "#attackText" ).text( "GAME OVER: You " + status );
            $( "#reset" ).show();

        }
    } );
    //***************reset **************
    //***************reset **************
    //***************reset **************
    $( "#reset" ).click( function () {
        restart();
    });
    

    function restart() {
        $("#divCopy").replaceWith(divClone.clone()); 
        defenderCharacter = undefined;
        character = undefined;
        $( "#yourCharacter2" ).empty();
        $( "#enemiesText" ).empty();
        attackerSelected=false;
        defenderSelected=false;
        luke.attackDamage=luke.startingAttack;
        vader.attackDamage=vader.startingAttack;
        starDestroyer.attackDamagehealth=starDestroyer.startingAttack;
        deathStar.attackDamage=deathStar.startingAttack;

        luke.health=luke.startingHealth;
        vader.health=vader.startingHealth;
        starDestroyer.health=starDestroyer.startingHealth;
        deathStar.health=deathStar.startingHealth;
        enemiesLeft=3;
        gameOver=false;
        game();

    }
}
} );
