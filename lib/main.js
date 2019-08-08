let fluidContainer = document.getElementsByClassName('container-fluid')[0];
let url = "https://pokeapi.co/api/v2/pokemon/chimchar"
function getTypes(pokemonJson){
    let types = []
    for(let type of pokemonJson.types){
       types.push(type.type.name)
    }
    return types;
}

function getMoves(pokemonJson){
    let moves = []
    for(let move of pokemonJson.moves){
       moves.push(move.move.name)
    }
    return moves;
}

function getAbilities(pokemonJson){
    let abilities = []
    for(ability of pokemonJson.abilities){
       abilities.push(ability.ability.name)
    }
    return abilities;
}

function createCarouselItem(pokemon){
    // div with class caro-item
    let carouselItem = document.createElement('div')
    carouselItem.setAttribute('class','carousel-item active')
    let carouselImg = document.createElement('img')
    carouselImg.setAttribute('class','d-block w-100')
    carouselImg.src = pokemon.image;
    carouselItem.appendChild(carouselImg);
    document.getElementsByClassName('carousel-inner')[0].appendChild(carouselItem);
    // inside the div is an image with class d-block and w-100
}
function createPokemonElement(pokemon){
    // h1 tag for name
    let h1 = document.createElement('h1');
    h1.innerText = pokemon.name;
    // h2 tag for number
    let h2 = document.createElement('h2')
    h2.innerHTML = pokemon.number;

    let img = document.createElement('img')
    img.src = pokemon.image;
    
    // p fag for types
    let p = document.createElement('p');
    for(let type of pokemon.types){
        p.innerText += `${type}`
    }

    // ul tag for moves
    let moveUl = document.createElement('ol');
    for(let move of pokemon.moves){
        moveUl.innerHTML += `<li>${move}</li>`
    }
    // ul for abilities
    let abilitiesUl = document.createElement('ol');
    for(let ability of pokemon.abilities){
        abilitiesUl.innerHTML += `<li>${ability}</li>`
    }
    
    // div container for out pokemon element
    let div = document.createElement('div');
    div.append(h1,h2,img,p,moveUl,abilitiesUl);
    fluidContainer.appendChild(div);
}
fetch(url)
.then((response) => response.json())
.then(function(data){
    console.log(data);
    let name = data.name;
    let number = data.id;
    let types = getTypes(data);
    let moves = getMoves(data);
    let abilities = getAbilities(data);
    let image = data.sprites.front_default;
    let chimchar = new Pokemon(name,number,types,moves,abilities,image);
    console.log(chimchar);
    createPokemonElement(chimchar);
    createCarouselItem(chimchar)
})
.catch(function(error){
    console.log(error)
})