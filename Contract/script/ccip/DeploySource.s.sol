// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import {Source} from "../../src/ccip/Source.sol";

contract DeploySource is Script {

    // MAINNET ADDRESSES
    address constant ARB_MAINNET_CCIP_ROUTER = 0x141fa059441E0ca23ce184B6A78bafD2A517DdE8;
    address constant ARB_MAINNET_LINK = 0xf97f4df75117a78c1A5a0DBb814Af92458539FB4;

    // Testnet addresses
    // address constant ARB_TESTNET_CCIP_ROUTER = 0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165;
    // address constant ARB_TESTNET_LINK_TOKEN = 0xb1D4538B4571d411F07960EF2838Ce337FE1E80E;

    address constant OWNER = 0xdbea613E2bBD96d84c75f1856E088e8429E1Be72;



    function run() external {
        // Retrieve the private key from the environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Retrieve the owner address from the environment variable
        // If not set, it will default to the address derived from the private key

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the Source contract
        Source source = new Source(
            ARB_MAINNET_CCIP_ROUTER,
            ARB_MAINNET_LINK,
            OWNER
        );

        // Log the deployed contract address
        console.log("Source contract deployed at:", address(source));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}


// forge script script/ccip/DeploySource.s.sol:DeploySource --rpc-url $ARBITRUM_MAINNET_RPC --broadcast --private-key $PRIVATE_KEY


// forge verify-contract --etherscan-api-key GQTWIRIW9YAAGY2JZ2E8PITCJ1C6ZJSG29 0x3E8c7e98d11C0fCD5d7B534ddbfEb1C14d3b4D81 src/ccip/Source.sol:Source --chain 42161 --constructor-args $(cast abi-encode "constructor(address,address,address)" "0x141fa059441E0ca23ce184B6A78bafD2A517DdE8" "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4" "0xdbea613E2bBD96d84c75f1856E088e8429E1Be72")

// forge verify-contract --etherscan-api-key MGE9XWX9ISUPSDHFWP6MDB2W4A48J9V35P  0x41CD49f1Fb38b07E072a9C815c629A7A48b18061 ./src/BalanceDestination.sol:BalanceDestination --chain 11155111 --constructor-args $(cast abi-encode "constructor(address,address)" "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" "0x1FB29E8c8AE352C7eccEA326d569a3E5C5C0e7C8")

