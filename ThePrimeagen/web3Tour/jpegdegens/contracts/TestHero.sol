pragma solidity ^0.8.0;

import "./Hero.sol";

// test class to set the random nature of the random number
contract TestHero is Hero {
    uint random;

    function generateRandom() public view override returns (uint) {
        return random;
    }

    function setRandom(uint r) public {
        random = r;
    }
}
