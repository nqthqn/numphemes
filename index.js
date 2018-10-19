const lo = require('lodash');
const fs = require('fs');
const GraphemeSplitter = require('grapheme-splitter')
const chalk = require('chalk');

// Read the file into a string
var string = fs.readFileSync(process.argv[2], "utf8");

// Using that string — get an array of graphemes
var graphemes = new GraphemeSplitter().splitGraphemes(string);
// console.log("Graphemes:", graphemes);

// Create an array of chunks (each 1000 graphemes)
var chunks = lo.chunk(graphemes, 1000);
// console.log("Chunks:", chunks);

// For each chunk, c, we create a Set s - an array of sets
var sets = chunks.map(c => new Set(c));
// console.log("Sets:", sets);

// Get the size of each set (the number of unique graphemes)
var uniqs = sets.map(s => s.size);
// console.log("Uniques:", uniqs);

// Get the sumation of each set size and divide by the length of the uniqs
var avg = lo.sum(uniqs) / uniqs.length;
var uniq_g = new Set(graphemes);

var avg2 = lo.sum(uniqs.slice(0, uniqs.length-1)) / uniqs.length - 1;

const num = n => Number(n).toLocaleString();

console.log(chalk`
Wow — you gave me {red ${num(string.length)}} non-orthographic characters! 
That's a total of {red ${num(graphemes.length)}} orthographic graphemes. 
We found {red ${uniq_g.size}} unique orthographic graphemes. 
We split these graphemes up into {red ${num(chunks.length)}} total chunks. 
(the last chunk size is {red ${num(chunks.map(c => c.length)[chunks.length-1])}}) 
Each chunk on average has {red ${num(avg)}} unique graphemes. 
If we ignore the last chunk the average unique grapheme in each chunk would be {red ${num(avg2)}}. 

Thanks for crunching letters with us today!`);
