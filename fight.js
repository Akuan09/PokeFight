const pteam1 = document.getElementById("player1")

let team1 = localStorage.getItem("team1")
team1 = JSON.parse(team1)
let teampp2 = localStorage.getItem("team2")
teampp2 = JSON.parse(teampp2)

console.log(team1)
console.log(teampp2)

const ekip1 = document.getElementsByClassName("imgTeam")
const ekipp2 = document.getElementsByClassName("imgTeam2")

const nom = document.getElementsByClassName("blase")
const nom2 = document.getElementsByClassName("blase2")

const lp = document.getElementsByClassName("lp")
const lp2 = document.getElementsByClassName("lp2")

const imgPokee = document.getElementsByClassName("poketeam1")
const imgPokee2 = document.getElementsByClassName("poketeam2")

function addTeams(){
        for (let i in team1){
        ekip1[i].src = team1[i].image
        nom[i].innerHTML = team1[i].name
        lp[i].innerHTML = team1[i].HP + "HP"
        lp[i].id = team1[i].i
        imgPokee[i].src = team1[i].image
        imgPokee[i].id = team1[i].id
    }
    for (let y in teampp2){
        ekipp2[y].src = teampp2[y].image
        nom2[y].innerHTML = teampp2[y].name
        lp2[y].innerHTML = teampp2[y].HP + "HP"
        lp2[y].id = teampp2[y].i
        imgPokee2[y].src = teampp2[y].image
        imgPokee2[y].id = teampp2[y].id
    }
}

addTeams()

let pokeAtt
let pokeDef
let click=0
let turn = 1

const attack = document.getElementById("combat")

attack.addEventListener("click",selectPoke)

function selectPoke(e){
    if (click==0){
        if ((turn==1 && e.target.classList[1]=="poketeam1")||(turn==2 && e.target.classList[1]=="poketeam2")){
            pokeAtt = e.target.id
            click++
        }
    }else{
        if ((turn==1 && e.target.classList[1]=="poketeam2")||(turn==2 && e.target.classList[1]=="poketeam1")){
            pokeDef = e.target.id
            attaque()
            click = 0
        }
    }
}

let damage;
function attaque(){
    // récup l'att du poke 1 et la def du poke 2    
    let pokemonATT = pokemon[pokeAtt-1].stats.attack
    let pokemonDEF = pokemon[pokeDef-1].stats.defense
    damage = pokemonATT - pokemonDEF
    if(damage>-10 && damage<=5){
        damage = 5
    }else if (damage<=-10 && damage>-20){
        damage = 4
    }else if (damage<=-20 && damage>-30){
        damage = 3
    }else if (damage<=-30 && damage>-40){
        damage = 2
    }else if (damage<=40){
        damage = 1
    }
    makeDamage()
}

function makeDamage(){
    let pokeHP;
    let lala
    if (turn==1){
        pokeHP = pokemon[pokeDef-1].stats.HP
        pokeHP -= damage
        for (let i in teampp2){
            if (pokeDef == teampp2[i].id){
                lala = teampp2[i].i
                break
            }
        }
        lp2[lala].innerHTML = pokeHP + "HP"
    }
}

// Rajouter le tour du Joueur 2, juste finir les conditions et changer la variable turn a chaque tour
// Faire en sorte que quand un pokemon tombe a 0HP il ne peut plus attaquer ni etre attaquer
// Faire la condition de win