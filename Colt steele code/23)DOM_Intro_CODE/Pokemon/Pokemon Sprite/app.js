// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
const container=document.querySelector('#container');
for(let i=1;i<=151;i++){
    const pokemon=document.createElement('div');
    const span=document.createElement('span');
    span.innerText=`#${i}`
    pokemon.classList.add("pokemon");
    const image=document.createElement('img');
    image.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
    pokemon.append(image,span);
    container.append(pokemon);

}
