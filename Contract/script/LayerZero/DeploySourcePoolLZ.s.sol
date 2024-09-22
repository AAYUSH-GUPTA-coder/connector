// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import {SourcePoolLZ} from "../../src/layerzero/SourcePoolLZ.sol";

contract DeploySourcePoolLZ is Script {
    address constant OWNER = 0xdbea613E2bBD96d84c75f1856E088e8429E1Be72;

    function run() external {
        // Retrieve the private key from the environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the SourcePool contract
        SourcePoolLZ sourcePoolLZ = new SourcePoolLZ(
            OWNER
        );

        // Log the deployed contract address
        console.log("SourcePoolLZ ARB contract deployed at:", address(sourcePoolLZ));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}

// forge script script/LayerZero/DeploySourcePoolLZ.s.sol:DeploySourcePoolLZ --rpc-url $ARBITRUM_MAINNET_RPC --etherscan-api-key $ARBISCAN_API_KEY --chain 42161 --broadcast --verify -vvvv