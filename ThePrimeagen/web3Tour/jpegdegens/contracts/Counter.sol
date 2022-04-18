// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint256 counter;

    function count() public {
        counter++;
        console.log("Counter is now ", counter);
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }
}

// npx hardhat node
// npx hardhat run scripts/deploy-counter.ts --network localhost
// python3 -m http.server 6969
