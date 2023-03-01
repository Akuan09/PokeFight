// const imgPoke = document.getElementById("poke")
// const changePoke = document.getElementById("changePoke")
// const guessPoke = document.getElementById("guess")
// const responce = document.getElementById("reponse")
// const score = document.getElementById("score")
// const test = document.getElementById("test")

// changePoke.addEventListener("click",startTheGame)
// test.addEventListener("click",pokeAlea)
// let i;
// let scr = 0;

// function pokeAlea(){
//     if (guessPoke.value.toUpperCase() == i.name.toUpperCase()){
//         responce.innerHTML = `Bravo le nom était bien ${i.name}`
//         scr++
//     }else{
//         responce.innerHTML = `Perdu, le nom était ${i.name}`
//     }
//     i = pokemon[Math.floor(Math.random()*pokemon.length)]
//     imgPoke.src = i.image
//     guessPoke.value = ""
//     score.innerHTML = `Score : ${scr}`
// }

// function startTheGame(){
//     i = pokemon[Math.floor(Math.random()*pokemon.length)]
//     imgPoke.src = i.image
// }


const imgPoke = document.getElementById("imgPoke")
const randomPoke = document.getElementById("randomPoke")
const pokeName = document.getElementById("pokeName")
const idPokedex = document.getElementById("pokedex")
const type = document.getElementsByClassName("type")
const stat = document.getElementsByClassName("stat")

let player = 1;

document.addEventListener("keyup",(e)=>{
    if (e.code == "Digit1"){
        team.click()
    }else if (e.code == "Digit2"){
        team2.click()
    }else if (e.code == "KeyP"){
        startLaps.click()
    }
})

let index;

function changePoke(){
    i = pokemon[Math.floor(Math.random()*pokemon.length)]
    index = i
    imgPoke.src = i.image
    pokeName.innerHTML = i.name
    idPokedex.innerHTML = `${i.pokedexId}/151`
    for (let y in i.apiTypes){
        type[y].innerHTML = i.apiTypes[y].name + `<img src=${i.apiTypes[y].image} class="imgType">`
        type[1].innerHTML = i.apiTypes[y].name + `<img src=${i.apiTypes[y].image} class="imgType">`
    }
    // type[0].innerHTML = i.apiTypes[0].name + `<img src=${i.apiTypes[0].image} class="imgType">`
    // type[1].innerHTML = i.apiTypes[1].name + `<img src=${i.apiTypes[1].image} class="imgType">`
    stat[0].innerHTML = `HP : ${i.stats.HP}`
    stat[1].innerHTML = `ATT : ${i.stats.attack}`
    stat[2].innerHTML = `DEF : ${i.stats.defense}`
    stat[3].innerHTML = `ATT SPE : ${i.stats.special_attack}`
    stat[4].innerHTML = `DEF SPE : ${i.stats.special_defense}`
    stat[5].innerHTML = `VIT : ${i.stats.speed}`
}

const raccourcis = document.getElementById("raccourci")
const racc = document.getElementById("racc")
const close = document.getElementById("close")

raccourcis.addEventListener("click",()=>{
    if (racc.style.visibility == "visible"){
        racc.style.visibility = ""
    }else{
        racc.style.visibility = "visible"
    }
})
close.addEventListener("click",()=>racc.style.visibility = "")

const team = document.getElementById("team1")
const ekip = document.getElementById("ekip")
const ekip2 = document.getElementById("ekip2")
const team2 = document.getElementById("team2")
const clos = document.getElementById("clos")
const clos2 = document.getElementById("clos2")

team.addEventListener("click",()=>{
    if(ekip.style.visibility == "visible"){
        ekip.style.visibility = ""
    }else{
        ekip.style.visibility = "visible"
    }
})
clos.addEventListener("click",()=>ekip.style.visibility = "")

team2.addEventListener("click",()=>{
    if(ekip2.style.visibility == "visible"){
        ekip2.style.visibility = ""
    }else{
        ekip2.style.visibility = "visible"
    }
})
clos2.addEventListener("click",()=>ekip2.style.visibility = "")

let test=0
let store

function createSlot(){
    let aj
    if(test<6){
        if (player == 1){
            aj = ekip
            store = lopm
        }else{
            aj = ekip2
            store = lopm2
        }
        const unPoke = document.createElement("div")
        unPoke.classList.add("unPoke")
        unPoke.id = index.name
        aj.appendChild(unPoke)

        const miniPoke = document.createElement("img")
        miniPoke.alt = "image du pokemon"
        miniPoke.classList.add("miniPoke")
        miniPoke.src = index.image
        unPoke.appendChild(miniPoke)

        const miniPokeName = document.createElement("p")
        miniPokeName.id = "miniPokeName"
        miniPokeName.innerHTML = index.name
        unPoke.appendChild(miniPokeName)

        const supprimer = document.createElement("button")
        supprimer.innerHTML = "Supprimer de l'équipe"
        supprimer.id = unPoke.id + "_del"
        supprimer.classList.add("lala")
        supprimer.addEventListener("click",deleteSlot)
        unPoke.appendChild(supprimer)

        store.push({
            i : test,
            id : index.id,
            name : index.name,
            image : index.image,
            HP : index.stats.HP,
        })

        test++
    }
}

function deleteSlot(e){
    if (comp.innerHTML != "Tour finit"){
        let popo = e.target.id.split("_")
        if (popo[1] == "del"){
            let parent = document.getElementById(popo[0])
            parent.parentNode.removeChild(parent)
            test--
        }
    }
}

const addPoke = document.getElementById("add")

changePoke()

const comp = document.getElementById("compteur")
let lop = comp.dataset.label

const startLaps = document.getElementById("start")
const btnPanel = document.getElementById("buttonpanel")

startLaps.addEventListener("click",startTime)

let interval

function startTime(){
    addPoke.addEventListener("click",createSlot)
    randomPoke.addEventListener("click",changePoke)
    document.addEventListener("keyup",touch)
    interval = setInterval(compteur,1000)
}

function compteur(){
    if(lop != "0s"){
        let te = parseInt(lop)
        te--
        lop = te + "s"
        comp.innerHTML = lop
    }else{
        comp.innerHTML = "Tour finit"
        lop = "10"
        addPoke.removeEventListener("click",createSlot)
        randomPoke.removeEventListener("click",changePoke)
        document.removeEventListener("keyup",touch)
        test = 0
        addStorage()
        clearInterval(interval)
        if (player == 1){
            player = 2
        }else{
            startLaps.removeEventListener("click",startTime)
            const fight = document.createElement("a")
            fight.href = "fight.html"
            btnPanel.appendChild(fight)
            const btnFight = document.createElement("button")
            btnFight.id = "fight"
            btnFight.classList.add("panel")
            btnFight.innerHTML = "Commencer le combat"
            fight.appendChild(btnFight)
        }
    }
}

function touch(e){
    if (e.code == "KeyR"){
        changePoke()
    }else if(e.code == "KeyE"){
        createSlot()
    }
}

let lopm = []
let lopm2 = []

function addStorage(){
    // console.log(store)
    let myStr = JSON.stringify(store)
    if (player==1){
        localStorage.setItem("team1",myStr)
    }else{
        localStorage.setItem("team2",myStr)

    }
}