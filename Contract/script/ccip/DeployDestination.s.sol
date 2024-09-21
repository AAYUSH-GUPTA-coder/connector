// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import {DestinationPool} from "../../src/ccip/DestinationPool.sol";
import {LoopStrategyBase} from "../../src/ccip/LoopStrategyBase.sol";

contract DeployDestination is Script {

    // Mainnet addresses
    address constant BASE_CCIP_ROUTER = 0x881e3A65B4d4a04dD529061dd0071cf975F58bCD;
    address constant BASE_LINK_TOKEN = 0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196;
    address public AAVE_ADDRESS_PROVIDER_BASE =
        0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D;
    address public BASE_WETH_ADDRESS = 0x4200000000000000000000000000000000000006;
    address constant OWNER = 0xdbea613E2bBD96d84c75f1856E088e8429E1Be72;
    address public WSTETH_ADDR_BASE = 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452;

    function run() external {
        // Retrieve the private key from the environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        LoopStrategyBase loopStrategy = new LoopStrategyBase(
            AAVE_ADDRESS_PROVIDER_BASE,
            BASE_WETH_ADDRESS,
            OWNER
        );

        // Log the deployed contract address
        console.log("LoopStrategy contract BASE CHAIN deployed at:", address(loopStrategy));

        vm.stopBroadcast();

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);


        // Deploy the Destination contract
        DestinationPool destinationPool = new DestinationPool(
            BASE_CCIP_ROUTER,
            address(loopStrategy),
            WSTETH_ADDR_BASE,
            OWNER
        );

        // Log the deployed contract address
        console.log("Destination Pool contract BASE CHAIN deployed at:", address(destinationPool));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}

// forge script script/ccip/DeployDestination.s.sol:DeployDestination --rpc-url $BASE_MAINNET_RPC --etherscan-api-key 53S9E7VTD6Q52I4R7G18PISSUNX4DVGNN8 --chain 8453 --broadcast --verify -vvvv