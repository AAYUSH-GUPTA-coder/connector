// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import {SourceLZ} from "../../src/layerzero/SourceLZ.sol";

contract DeploySourceLZ is Script {
    // MAINNET ADDRESSES
    address constant ARB_MAINNET_LZ_ENDPOINT = 0x1a44076050125825900e736c501f859c50fE728c;
    address constant OWNER = 0xdbea613E2bBD96d84c75f1856E088e8429E1Be72;


    function run() external {
        // Retrieve the private key from the environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Retrieve the owner address from the environment variable
        // If not set, it will default to the address derived from the private key

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the Source contract
        SourceLZ sourceLZ = new SourceLZ(
            ARB_MAINNET_LZ_ENDPOINT,
            OWNER
        );

        // Log the deployed contract address
        console.log("SourceLZ ARB contract deployed at:", address(sourceLZ));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}

// forge script script/LayerZero/DeploySourceLZ.s.sol:DeploySourceLZ --rpc-url $ARBITRUM_MAINNET_RPC --etherscan-api-key $ARBISCAN_API_KEY --chain 42161 --broadcast --verify -vvvv