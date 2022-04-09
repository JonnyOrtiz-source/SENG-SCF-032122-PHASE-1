// GLOBAL VARS
const pokeContainer = document.querySelector('#poke-container');
const pokeForm = document.getElementById('poke-form');
const pokeFormContainer = document.getElementById('poke-form-container');
const BASE_URL = 'http://localhost:3000';

// FUNCTIONS
const addPoke = async (e) => {
   e.preventDefault();
   const name = document.getElementById('name-input').value;
   const img = document.getElementById('img-input').value;
   const newPoke = {
      name,
      img,
      likes: 0,
   };
   const config = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify(newPoke),
   };
   try {
      const response = await fetch(`${BASE_URL}/characters`, config);
      if (response.ok) {
         const newPokeObj = await response.json();
         renderPokemon(newPokeObj);
         pokeForm.reset();
         alert('Nice! Your new poke is added to the page!');
      } else {
         throw new Error(`Uh oh.. ${response.status}: ${response.statusText}`);
      }
   } catch (err) {
      alert(err);
   }
};

//  SHOW PAGE - 1 POKE
function showCharacter(character) {
   fetch(`http://localhost:3000/characters/${character.id}`)
      .then((response) => {
         return response.json();
      })
      .then((returnedChar) => {
         const newPokeCard = renderPokemon(returnedChar);
         newPokeCard.id = 'poke-show-card';
         newPokeCard.dataset.id = returnedChar.id;
         newPokeCard.dataset.ability = 'toxicwhip';
         loadComments(newPokeCard, returnedChar);
         pokeContainer.replaceChildren(newPokeCard);
         pokeFormContainer.replaceChildren(commentsForm());
      });
}

function submitComment(e) {
   e.preventDefault();
   const characterId = parseInt(
      document.getElementById('poke-show-card').dataset.id
   );
   const content = document.getElementById('comment-input').value;
   const newComment = { characterId: characterId, content: content };
   const commentsList = document.querySelector('ul');
   fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify(newComment),
   })
      .then((r) => r.json())
      .then((newCommentObj) => renderComment(commentsList, newCommentObj)); //pessimistic rendering
   alert(`Thank you for your comment: "${content}"`);
}

// CREATE COMMENT FORM FOR SHOW PAGE
function commentsForm() {
   const form = document.createElement('form');
   form.id = 'comment-form';
   // attach an event listener to the #comment-form here
   form.addEventListener('submit', (e) => {
      submitComment(e);
      form.reset();
   });

   const commentInput = document.createElement('input');
   commentInput.type = 'text';
   commentInput.id = 'comment-input';

   const label = document.createElement('label');
   label.className = 'form-label';
   label.textContent = 'Give this Poke some 💙 ...  ';

   const submit = document.createElement('input');
   submit.type = 'submit';
   submit.id = 'submit';

   form.append(label, commentInput, submit);

   return form;
}

// rendering one comment ("li") and append
function renderComment(ul, comment) {
   const newComment = document.createElement('li');
   newComment.textContent = comment.content;
   ul.append(newComment);
   return newComment;
}

// LOAD COMMENTS AND RENDER THEM ON POKE SHOW PAGE
function loadComments(pokeCard, character) {
   const commentsDiv = document.createElement('div');
   commentsDiv.id = `comment-card-${character.id}`;
   const commentsList = document.createElement('ul');
   const numComments = document.createElement('h4');
   // numComments.textContent = `${character.comments.length} comments: `
   numComments.textContent = `${character.comments.length} ${
      character.comments.length > 1 ? 'comments' : 'comment'
   } : `;

   // numComments.textContent = character.comments.length + (character.comments.length === 1 ? ' comment:': ' comments:' )

   commentsDiv.append(numComments, commentsList);
   pokeCard.append(commentsDiv);
   character.comments.forEach((comment) =>
      renderComment(commentsList, comment)
   );
}

// INITIALIZE
// re-written to catch any errors
const getPokemon = async () => {
   try {
      const response = await fetch(`${BASE_URL}/characters`);
      if (response.ok) {
         const returnedArr = await response.json();
         returnedArr.forEach((pokeObject) => renderPokemon(pokeObject));
      } else {
         throw new Error(
            `yikes there was an error: ${resp.status}, ${resp.statusText}`
         );
      }
   } catch (err) {
      alert(err);
   }
};

function renderPokemon(character) {
   const pokeCard = document.createElement('div');
   pokeCard.id = `poke-${character.id}`;
   pokeCard.className = 'poke-card';

   pokeCard.addEventListener('click', () => showCharacter(character));

   const pokeImg = document.createElement('img');
   pokeImg.src = character.img;
   pokeImg.alt = `picture of ${character.name}`;

   const pokeName = document.createElement('h3');
   pokeName.innerText = character.name;

   const pokeLikes = document.createElement('h3');
   pokeLikes.innerText = 'Likes: ';

   const likesNum = document.createElement('h5');
   likesNum.className = 'likes-num';
   likesNum.textContent = character.likes;

   const likeBtn = document.createElement('button');
   likeBtn.className = 'like-btn';
   likeBtn.textContent = '♥';

   likeBtn.addEventListener('click', addLikes);

   function addLikes(e) {
      e.stopPropagation();

      character.likes += 1;

      fetch(`${BASE_URL}/characters/${character.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify({ likes: character.likes }),
      })
         .then((r) => r.json())
         .then(
            (updatedCharObj) => (likesNum.textContent = updatedCharObj.likes)
         );
   }

   const deleteBtn = document.createElement('button');
   deleteBtn.className = 'delete-btn';
   deleteBtn.textContent = 'Delete';

   deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fetch(`${BASE_URL}/characters/${character.id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((r) => r.json())
         .then((emptyObj) => pokeCard.remove());
   });

   pokeCard.append(pokeImg, pokeName, pokeLikes, likesNum, likeBtn, deleteBtn);
   pokeContainer.append(pokeCard);

   // returning our pokeCard so we can use the return value of the render function in our pokeCard div event listener
   return pokeCard;
}

const init = () => {
   pokeForm.addEventListener('submit', addPoke);
   getPokemon();
};

// INVOKE INITIALIZE
init();
