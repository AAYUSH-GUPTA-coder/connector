// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.24;

// import {OApp} from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
// import {Script} from "forge-std/Script.sol";
// import {SourceLZ} from "../../src/layerzero/SourceLZ.sol";
// import {DestinationPool} from "../../src/layerzero/DestinationPoolLZ.sol";

// contract SetPeer is Script {
//     // The real endpoint ids will vary per chain, and can be found under "Supported Chains"
//     uint32 public arbitrumMainnetEid = 30110;
//     uint32 public lineaMainnetEid = 30183;

//     function setUp() public {
//         Source arbitrumSource;
//         DestinationPool lineaDestinationPool;

//         // Set the peer on the Arbitrum chain (Source Chain) and Destination chain (Linea Chain)
//         arbitrumSource.setPeer(
//             lineaMainnetEid,
//             addressToBytes32(address(lineaDestinationPool))
//         );
//     }

//     // Convert address to bytes32
//     // @param _addr The address of destination contract on destination chain
//     function addressToBytes32(address _addr) public pure returns (bytes32) {
//         return bytes32(uint256(uint160(_addr)));
//     }
// }

// // Things to do
// // 1 change the MyOApp with correct contract and contract addresses
// // 2. setPeer() on source chain
// // The `setPeer()` function takes 2 arguments: _eid, the destination endpoint ID for the chain our other OApp contract lives on, and _peer, the destination OApp contract address in bytes32 format.


// // rm -rf lib/openzeppelin-contracts
// // rm -rf lib/@devtools