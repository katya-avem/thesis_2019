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


function flatten_unique_sort(a) {
	return [...new Set([].concat.apply([], a))].sort();
}


const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('./wolves_and_sheeps.html', 'utf8');
const $ = cheerio.load(html);


const acts = [];
$('h2').map(function(i, el) {
	const heading = $(el).text().trim();

	if (heading === 'Лица') {
		acts.push([]);
	} else {
		const names_lowercase = $(el).next().find('i b').toArray().map(el => $(el).text().trim().toLowerCase());
		const names_unique = [...new Set(names_lowercase)];
		const names_sorted = names_unique.sort();
		acts.last().push(names_sorted);
	}
})

const drama_heroes = flatten_unique_sort( acts.map(act => [].concat.apply([], act)) );

const matrix = {};
drama_heroes.forEach(name => matrix[name] = acts.map(act => act.map(scene => scene.indexOf(name) !== -1 ? 1 : 0)));
console.log('matrix', matrix, '\n\n\n');

const mobility = {};
Object.entries(matrix).forEach(([name, acts]) => {
	const acts_flattened = [].concat.apply([], acts);
	let num = -1, den = acts_flattened.length-1;
	for (let i = 1, ilen = acts_flattened.length; i < ilen; ++i)
			if (acts_flattened[i] - acts_flattened[i-1] !== 0)
				num += 1;
	mobility[name] = [num, den, num/den];
});
console.log('mobility', mobility, '\n\n\n');

const business = {};
Object.entries(matrix).forEach(([name, acts]) => {
	business[name] = 0;
	acts.forEach(act => act.forEach(in_this_scene => business[name] += in_this_scene));
});
console.log('business', business, '\n\n\n');


const scenes_densities = [];
const acts_densities = [];
let drama_numerator = 0;
let drama_denumerator = 0;
acts.forEach(act => {
	const act_heroes_num = flatten_unique_sort(act).length;

	drama_denumerator += act.length;
	let act_numerator = 0;
	let act_denumerator = act_heroes_num * act.length;
	scenes_densities.push([]);

	act.forEach((scene_heroes) => {
		scenes_densities.last().push(scene_heroes.length/act_heroes_num);
		act_numerator += scene_heroes.length;
		drama_numerator += scene_heroes.length;
	});

	acts_densities.push(act_numerator/act_denumerator);
});
drama_denumerator *= drama_heroes.length;
const drama_density = drama_numerator/drama_denumerator;
console.log('scenes_densities', scenes_densities, '\n\n\n');
console.log('acts_densities', acts_densities, '\n\n\n');
console.log('drama_density', drama_density, '\n\n\n');


const distances_by_act = {};
for (name1 of drama_heroes)
	for (name2 of drama_heroes) {
		if (!distances_by_act[name1])
			distances_by_act[name1] = {};
		if (!distances_by_act[name1][name2])
			distances_by_act[name1][name2] = new Array(acts.length).fill(0);
	}
acts.forEach((act, act_num) => {
	act.forEach(scene_heroes => {
		for (hero of scene_heroes)
			for (other of drama_heroes) {
				distances_by_act[hero][other][act_num] += (scene_heroes.indexOf(other) === -1 ? 1 : 0);
				distances_by_act[other][hero][act_num] += (scene_heroes.indexOf(other) === -1 ? 1 : 0);
			}
	});

	for (name1 of drama_heroes)
		for (name2 of drama_heroes)
			distances_by_act[name1][name2][act_num] /= act.length;
});
console.log('distances by act', distances_by_act, '\n\n\n');


const distances_plain = {}
const scenes_plain = [].concat.apply([], acts);
for (name1 of drama_heroes)
	for (name2 of drama_heroes) {
		if (!distances_plain[name1])
			distances_plain[name1] = {};
		if (!distances_plain[name1][name2])
			distances_plain[name1][name2] = 0;
	}
scenes_plain.forEach(scene_heroes => {
	for (hero of scene_heroes)
		for (other of drama_heroes) {
			distances_plain[hero][other] += (scene_heroes.indexOf(other) === -1 ? 1 : 0);
			distances_plain[other][hero] += (scene_heroes.indexOf(other) === -1 ? 1 : 0);
		}
});
for (name1 of drama_heroes)
	for (name2 of drama_heroes)
		distances_plain[name1][name2] /= scenes_plain.length;
console.log('distances in whole drama', distances_plain, '\n\n\n');


const frequencies = {};
Object.entries(business).map(([name, b]) => {
	frequencies[name] = b/scenes_plain.length;
});
console.log('frequences personal', frequencies, '\n\n\n');


const frequencies_mutual = {};
for (name1 of drama_heroes)
	for (name2 of drama_heroes) {
		if (!frequencies_mutual[name1])
			frequencies_mutual[name1] = {};
		if (!frequencies_mutual[name1][name2])
			frequencies_mutual[name1][name2] = 0;
	}
scenes_plain.forEach(scene_heroes => {
	for (let i = 0; i < scene_heroes.length; ++i)
		for (let j = i; j < scene_heroes.length; ++j) {
			frequencies_mutual[scene_heroes[i]][scene_heroes[j]] += 1;
			if (i != j)
				frequencies_mutual[scene_heroes[j]][scene_heroes[i]] += 1;
		}
});
for (let i = 0; i < drama_heroes.length; ++i)
	for (let j = i; j < drama_heroes.length; ++j) {
		frequencies_mutual[drama_heroes[i]][drama_heroes[j]] /= business[drama_heroes[j]];
		if (i != j)
			frequencies_mutual[drama_heroes[j]][drama_heroes[i]] /= business[drama_heroes[i]];
	}
console.log('frequencies mutual', frequencies_mutual, '\n\n\n');