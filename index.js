const Jimp = require('jimp');
const fs = require('fs');
const cliProgress = require('cli-progress');

const bg_dir = './Backgrounds'
const clothes_dir = './Clothes';

async function newPic(name) {
	const clothes = fs.readdirSync(clothes_dir);
	const bg = arrRand(fs.readdirSync(bg_dir).filter(file => file.endsWith('.png')));

	// const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	// bar1.start(clothes.length+2, 0);
	
	const image = await Jimp.read(bg_dir+'/'+bg);
	// bar1.increment();
	
	const base = await Jimp.read('./Body.png');
	image.composite(base, 0, 0);
	// bar1.increment();	
	
	for (const folder of clothes) {
		const images = fs.readdirSync(`${clothes_dir}/${folder}`).filter(file => file.endsWith('.png'));
		const accessory = await Jimp.read(`${clothes_dir}/${folder}/${arrRand(images)}`);
		image.composite(accessory, 0, 0);
		// bar1.increment();
	}
	await image.writeAsync('./output/${name}.png');
	// bar1.stop();
	console.log(name+' finished.')
}

function arrRand(arr) {
	const r = rand(0, arr.length);
	return arr[r]
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

for (var i = 0; i < 100; i++) {
	newPic(`man_${i}`);
}