import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hero", function() {
	async function createHero() {
		const Hero = await ethers.getContractFactory("TestHero");
		const hero = await Hero.deploy();
		await hero.deployed();

		return hero;
	}

	let hero;

	before(async function() {
		hero = await createHero();
	});

	it("should get a zero hero array.", async function() {
		expect(await hero.getHeroes()).to.deep.equal([]);
	});

	it("should fail at creating hero because of payment", async function() {
		let e;
		try {
			await hero.createHero(0, {
				value: ethers.utils.parseEther("0.049999999")
			});
		} catch (err) {
			e = err;
		}
		expect(e.message.includes("please send more money")).to.equal(true);
	});

	it("should fail at creating hero due to payment", async function() {
		const hero = await createHero();

		await hero.setRandom(69);
		await hero.createHero(0, {
			value: ethers.utils.parseEther("0.05")
		});
		const h = (await hero.getHeroes())[0];

		// [ s , h , d , i, m ]
		// [ s , h , d , i ]
		// [ s , h , d ]
		expect(await hero.getMagic(h)).to.equal(16);
		expect(await hero.getHealth(h)).to.equal(2);
	});
});


/********* */

// import "@nomiclabs/hardhat-ethers";
// import { ethers } from "hardhat";
// import { expect }from "chai";

// describe("Hero", function() {
// 	async function createHero() {
// 		const Hero = await ethers.getContractFactory("Hero");
// 		const hero = await Hero.deploy();
// 		await hero.deployed();

// 		return hero;
// 	}

// 	let hero;

// 	before(async function() {
// 		hero = await createHero();
// 	});

// 	it("should fail at creating hero because of payment", async function() {
// 		let e;

// 		try{
// 			await hero.createHero(0, {
// 				value: ethers.utils.parseEther("0.49999999")
// 			});
// 		}	catch(err) {
// 				e = err;
// 			}
// 		expect(e.message.includes("please send more money")).to.equal(true);
// 	});
// });

// fallback? proxy obkect?
