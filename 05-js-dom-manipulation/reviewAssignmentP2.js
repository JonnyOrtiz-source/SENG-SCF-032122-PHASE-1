// === Loops and array methods ===

// 1. Using a loop, print the numbers 0 - 9 to the console.
for (let i = 0; i < 10; i++) {
    console.log(i);
}

const pokemon = [
    'Bulbasaur',
    'Ivysaur',
    'Venusaur',
    'Charmander',
    'Charmeleon',
    'Charizard',
    'Squirtle',
    'Wartortle',
    'Blastoise',
    'Caterpie',
    'Metapod',
    'Butterfree',
    'Weedle',
    'Kakuna',
    'Beedrill',
    'Pidgey',
    'Raticate',
    'Spearow',
    'Fearow',
    'Ekans',
    'Arbok',
    'Pikachu',
    'Raichu',
    'Sandshrew',
    'Sandslash',
    'Nidoran',
    'Nidorina',
    'Jigglypuff',
    'Wigglytuff',
    'Zubat',
    'Golbat',
    'Oddish',
    'Gloom',
    'Vileplume',
    'Paras',
    'Parasect',
    'Venonat',
    'Venomoth',
    'Diglett',
    'Dugtrio',
    'Meowth',
    'Persian',
    'Psyduck',
    'Golduck',
    'Mankey',
    'Primeape',
    'Growlithe',
    'Arcanine',
];

// 2. Use forEach to print each pokemon character in upper case (screaming pokes!)
pokemon.forEach((element) => console.log(element.toUpperCase()));

// 3. Use an iterator method that will return all pokemon characters that start with the letter 's'. Which array method should be used for this task?
console.log(pokemon.filter((element) => element[0] === 'S'));

// 3b. Use the same method to return all pokemon characters that are less than or equal to 6 letters in length
console.log(pokemon.filter((element) => element.length <= 6));

const numsArr = [2, 3, 6, 9, 12];

// 4. Using this array, return a new array with each element squared
console.log(numsArr.map((element) => element * element));
console.log(numsArr.map((element) => element ** 2));

// 5. Using the same array, return a value that is the sum of these elements (hint: there is a built-in array method for this!)
console.log(
    numsArr.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
    )
);
