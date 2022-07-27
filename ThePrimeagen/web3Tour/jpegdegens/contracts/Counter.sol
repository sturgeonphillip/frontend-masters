// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint counter;

    event CounterInc(uint counter);

    function count() public {
        counter++;
        console.log("Counter is now ", counter);
        emit CounterInc(counter);
    }

    function getCounter() public view returns (uint32) {
        return uint32(counter);
    }
}

// start server: python3 -m http.server 6969
// run node: npx hardhat node
// webpack: npx webpack
// run deploy script
// deploy
// copy new address, adjust env
// kill webpack and restart it
// refresh

// python3 -m http.server 6969
// npx hardhat node
// npx hardhat run scripts/deploy-counter.ts --network localhost
// npx webpack

// event: 3 parameters, can be indexed
// right now for this course, just know events exist
// check them out because they're super useful
// events are awesome
