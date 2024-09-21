// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import {SourcePool} from "../../src/ccip/SourcePool.sol";

contract DeploySourcePool is Script {
    address constant OWNER = 0xdbea613E2bBD96d84c75f1856E088e8429E1Be72;

    function run() external {
        // Retrieve the private key from the environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the SourcePool contract
        SourcePool sourcePool = new SourcePool(
            OWNER
        );

        // Log the deployed contract address
        console.log("SourcePool contract deployed at:", address(sourcePool));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}

// forge script script/ccip/DeploySourcePool.s.sol:DeploySourcePool --rpc-url $ARBITRUM_MAINNET_RPC --broadcast --private-key $PRIVATE_KEY

// forge verify-contract --etherscan-api-key GQTWIRIW9YAAGY2JZ2E8PITCJ1C6ZJSG29 0xb12081B5d7E1168847a4548e3f8FF27Dd6886916 src/ccip/SourcePool.sol:SourcePool --chain 42161 --constructor-args $(cast abi-encode "constructor(address)" "0xdbea613E2bBD96d84c75f1856E088e8429E1Be72")