// Class Work
const welcomeMessage = document.getElementById('welcome');
// console.log(welcomeMessage);
const welcomeMessage2 = document.querySelector('#welcome');
const div = document.querySelector('div');

const formLabels = document.getElementsByClassName('form-label');
// console.log(formLabels);
// console.log(Array.from(formLabels)); // to create an array

const myName = document.createElement('h3');
myName.textContent = 'Jonny';
// console.log(myName);
div.append(myName);

welcomeMessage.remove();

const divHeader = document.getElementById('header');
divHeader.innerHTML = `<img
        id="header-img"
        src="https://external-preview.redd.it/tQged7mKJ3cUpNMq5IMeceZvyKP3cTyHqhNmKEQ0Vv8.png?auto=webp&s=fb5fd61cae0bc9cde2bc2a006b1e2aeb0c935ce9"
    />`;

const divLecture = document.querySelector('div.lecture-container');
// console.log(divLecture);
divLecture.remove();

const pokeContainer = document.querySelector('#poke-container');

function addPoke(e) {
    e.preventDefault();
    // console.log(e);
    const name = document.getElementById('name-input').value;
    const imgURL = document.getElementById('img-input').value;

    const newPoke = {
        id: pokemonDB.length + 1,
        name: name,
        img: imgURL,
        likes: 0,
    };

    renderPokemon(newPoke);
}
const pokeForm = document.getElementById('poke-form');
pokeForm.addEventListener('submit', addPoke);

function renderPokemon(character) {
    // console.log(character);
    const pokeCard = document.createElement('div');
    pokeCard.id = `poke-${character.id}`;
    pokeCard.class = 'poke-card';

    const pokePic = document.createElement('img');
    pokePic.src = character.img;
    pokePic.alt = `picture of ${character.name}`;

    const pokeName = document.createElement('h3');
    pokeName.textContent = character.name;

    const pokeLikes = document.createElement('h3');
    pokeLikes.textContent = 'Likes: ';

    const likesNum = document.createElement('h5');
    likesNum.className = 'likes-num';
    likesNum.textContent = character.likes;

    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.textContent = '❤️';

    likeBtn.addEventListener('click', addLikes);

    function addLikes() {
        // console.log('clicked');

        // increase likesNum and likes in the object
        character.likes += 1;
        // console.log(` likes in object ${character.likes}`);
        likesNum.textContent = character.likes;
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => pokeCard.remove());

    pokeCard.append(pokePic, pokeName, pokeLikes, likesNum, likeBtn, deleteBtn);
    pokeContainer.append(pokeCard);
}

pokemonDB.forEach((character) => renderPokemon(character));
