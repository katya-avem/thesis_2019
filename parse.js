if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
};

const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('./wolves_and_sheeps.html', 'utf8');
const $ = cheerio.load(html);

const excluded_heroes = ['две приживалки', 'крестьяне', 'мастеровые'];
// const excluded_heroes = ['мальчик'];

// стратегия 1: включаем персонажей, которые повляются в конце явления
// const acts = [];
// $('h2').map(function(i, el) {
// 	const heading = $(el).text().trim();

// 	if (heading === 'Лица') {
// 		acts.push([]);
// 	} else {
// 		const names_lowercase = $(el).next().find('i b').toArray().map(el => $(el).text().trim().toLowerCase());
// 		const names_unique = [...new Set(names_lowercase)];
// 		const names_sorted = names_unique.sort();
// 		const names = names_sorted.filter(el => excluded_heroes.indexOf(el) === -1);
// 		acts.last().push(names);
// 	}
// });

// стратегия 2: не включаем персонажей, которые повляются в конце явления
// включаем тех, кто появляется в середине

lut = {'гурмыжский': 'несчастливцев'}
const acts = [];
$('h2').map(function(i, el) {
	if ($(el).text().trim() === 'Лица') {
		acts.push([]);
	} else {
		const names_direct = $(el).next().find('i:first-child b').toArray().map(el => $(el).text().trim().toLowerCase());
		const names_indirect = $(el).next().find('> b').toArray().map(el => $(el).text().trim().toLowerCase());
		const names_lowercase = names_direct.concat(names_indirect).map(el => el in lut ? lut[el] : el);
		const names_unique = [...new Set(names_lowercase)];
		const names_sorted = names_unique.sort();
		const names = names_sorted.filter(el => excluded_heroes.indexOf(el) === -1);
		acts.last().push(names);
	}
});


// fs.writeFileSync('./data.json', JSON.stringify({acts: acts}));
console.log(JSON.stringify({acts: acts}));

