// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// /*
// Design

// Class will not influence stats created, therefore getting an epic hero will be hard.
// I want to be paid... 0.05 eth per hero!
// I should be able to get my heroes I have generated.
// Heroes should be stored on the chain.
// stats are strength, health, intellect, magic, dexterity
// stats are randomly generated
// A scale of 1 - 18
// The stats are randomly picked and their amplitude is randomly determined according to the following:
// Stat 1 can max at 18
// Stat 2 can max at 17
// Stat 3 can max at 16
// ...
// You can imagine theser being an NFT
// They are non divisible
// l2 */

// contract Hero {
//     enum Class {
//         Mage,
//         Healer,
//         Barbarian
//     }
//     mapping(address => uint[]) addressToHeroes;

//     function createHero(Class class) public payable {
//         require(msg.value >= 0.05 ether, "Insufficient funds, peasant!");
//     }
// }

// // if you accept enums into a function, the function can't be called with non enum values.abi
// // so if mage is 0, healer is 1, and barbarian is 2, if a 3 is provided to the function it will fail becausde it didn't pass the solidity check

// *****************************************************//
pragma solidity ^0.8.0;

// A scale of 1 - 18
// The stats are randomly picked and their amplitude is randomly determined according to the following:
// Stat 1 can max at 18
// Stat 2 can max at 17
// Stat 3 can max at 16
// ...
// You can imagine these  being an NFT
// They are non divisible

contract Hero {
    enum Class {
        Mage,
        Healer,
        Barbarian
    }

    mapping(address => uint[]) addressToHeroes;

    function generateRandom() public view virtual returns (uint) {
        return
            uint(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            );
    }

    function getHeroes() public view returns (uint[] memory) {
        return addressToHeroes[msg.sender];
    }

    function getStrength(uint hero) public pure returns (uint) {
        return (hero >> 2) & 0x1F;
        // in hexadecimal, f is 15 (1111) and 1 is 11
    }

    function getHealth(uint hero) public pure returns (uint) {
        return (hero >> 7) & 0x1F;
    }

    function getDexterity(uint hero) public pure returns (uint) {
        return (hero >> 12) & 0x1F;
    }

    function getIntellect(uint hero) public pure returns (uint) {
        return (hero >> 17) & 0x1F;
    }

    function getMagic(uint hero) public pure returns (uint) {
        return (hero >> 22) & 0x1F;
    }

    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "please send more money");
        // stats are strength, health, dexterity, intellect, magic

        uint[] memory stats = new uint[](5);
        stats[0] = 2;
        stats[1] = 7;
        stats[2] = 12;
        stats[3] = 17;
        stats[4] = 22;

        uint len = 5;
        uint hero = uint(class); // 0 1 2 ( mage, healer, barbarian )

        do {
            uint pos = generateRandom() % len;
            uint value = (generateRandom() % (13 + len)) + 1;

            hero |= value << stats[pos];

            len--;
            stats[pos] = stats[len];
        } while (len > 0);

        addressToHeroes[msg.sender].push(hero);
    }
}
