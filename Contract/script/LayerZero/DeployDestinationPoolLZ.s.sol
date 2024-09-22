// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import {DestinationPoolLZ} from "../../src/layerzero/DestinationPoolLZ.sol";
import {LoopStrategyZerolendLinea} from "../../src/layerzero/LoopStrategyZerolendLinea.sol";

contract DeployDestinationPoolLZ is Script {

    // Mainnet addresses
    address constant ROUTER = 0x1b81D678ffb9C0263b24A97847620C99d213eB14;
    address constant LINEA_ADDR_PROVIDER = 0xC44827C51d00381ed4C52646aeAB45b455d200eB;

    address constant LINEA_ENDPOINT= 0x1a44076050125825900e736c501f859c50fE728c;
    address constant WSTETH_ADDR_LINEA=0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F;
    address constant OWNER= 0xdbea613E2bBD96d84c75f1856E088e8429E1Be72;


    function run() external {
        // Retrieve the private key from the environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        LoopStrategyZerolendLinea loopStrategy = new LoopStrategyZerolendLinea(
            LINEA_ADDR_PROVIDER, ROUTER
        );

        // Log the deployed contract address
        console.log("LoopStrategy contract LINEA CHAIN deployed at:", address(loopStrategy));

        vm.stopBroadcast();

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);


        // Deploy the Destination contract
        DestinationPoolLZ destinationPool = new DestinationPoolLZ(
            LINEA_ENDPOINT,
            OWNER,
            address(loopStrategy),
            WSTETH_ADDR_LINEA
        );

        // Log the deployed contract address
        console.log("Destination Pool contract LINEA CHAIN deployed at:", address(destinationPool));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}

// forge script script/LayerZero/DeployDestinationPoolLZ.s.sol:DeployDestinationPoolLZ --rpc-url $LINEA_MAINNET_RPC --etherscan-api-key B5A718NK69HF7GRRFTYMYF35MW5C5ZWUQB --chain 59144 --broadcast --verify -vvvv