// this is where you can take notes without risking merge conflicts when you pull down new code from Github (the remote is called origin => i.e., where your online repo for this directory is located)

// also feel free to use this as a sandbox!

// Running the file ```node notes.js``` (without the backticks) will allow you to explore/play around with code. Make sure you have cd'ed into the inner folder before you do this.

console.log('hi there!!');

const pokemon = {
    name: 'articuno',
    img: 'https://www.giantbomb.com/images/1300-1892690',
    likes: 0,
};

console.log(pokemon.name);
console.log(pokemon.img);

function increaseValue(obj, key) {
    return (obj[key] += 1);
}

increaseValue(pokemon, 'likes');

// Write a function charDetails() that takes a character object in as an argument and loops through the object using the for...in method to print out the values of each property

function charDetails(obj) {
    for (key in obj) {
        console.log(obj[key]);
    }
}

charDetails(pokemon);

/*
Write a function printAbilities that accepts a character object as an argument and returns a list of the characters abilities as a string.  Use the provided pikachu object to test.
*/

const pikachu = {
    name: 'Pikachu',
    img: 'www.img.com',
    likes: 0,
    abilities: [
        {
            name: 'static',
        },
        {
            name: 'lightning-rod',
        },
    ],
};
let str = '';
function printAbilities(obj) {
    // return obj.abilities.forEach((el) => console.log(el.name));
    obj.abilities.forEach((el) => (str += el.name + ' '));
    console.log(str);
}
printAbilities(pikachu);
