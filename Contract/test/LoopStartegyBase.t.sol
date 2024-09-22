// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.24;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import {IERC20} from "../src/interfaces/IERC20.sol";
import {LoopStrategyBase} from "../src/ccip/LoopStrategyBase.sol";
import {ICreditDelegationToken} from "../src/interfaces/ICreditDelegationToken.sol";

import {IPool} from "../src/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "../src/interfaces/IPoolAddressesProvider.sol";

contract TestLoopStrategyBase is Test {
    IERC20 public wstEthBase;

    LoopStrategyBase public loopStrategyBase;
    IPool public aavePoolBase;
    IPoolAddressesProvider public addressesProviderBase;

    address public wstEthAddrBase = 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452;
    address public aWstEthAddressBase =
        0x99CBC45ea5bb7eF3a5BC08FB1B7E56bB2442Ef0D;
    address public wethAddrBase = 0x4200000000000000000000000000000000000006;
    address public vWethAddrBase = 0x24e6e0795b3c7c71D965fCc4f371803d1c1DcA1E;
    address public addressProviderBase =
        0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D;

    address public routerBase = 0x2626664c2603336E57B271c5C0b26F421741e481;

    function setUp() public {
        // setup the value
        wstEthBase = IERC20(wstEthAddrBase);

        loopStrategyBase = new LoopStrategyBase(
            addressProviderBase,
            routerBase,
            wethAddrBase
        );

        addressesProviderBase = IPoolAddressesProvider(addressProviderBase);
        aavePoolBase = IPool(addressesProviderBase.getPool());
    }

    function testLoopStrategyBaseWsteth() public {
        address user = address(123);
        console.log("Address of the User", user);
        uint256 amount = 1 ether;
        console.log("Address of loopStrategyBase", address(loopStrategyBase));

        deal(wstEthAddrBase, user, 1 * 1e18, false);

        console.log(
            "Balance of wstEthBase of user",
            wstEthBase.balanceOf(user)
        );

        vm.startPrank(user);

        wstEthBase.approve(address(loopStrategyBase), type(uint256).max);
        console.log(
            "Allownace given to LoopStartegy Contract by user",
            wstEthBase.allowance(user, address(loopStrategyBase))
        );

        aavePoolBase.setUserEMode(1);
        console.log("User E-MODE", aavePoolBase.getUserEMode(user));

        ICreditDelegationToken(vWethAddrBase).approveDelegation(
            address(loopStrategyBase),
            type(uint256).max
        );

        console.log(
            "Borrow Allownace",
            ICreditDelegationToken(vWethAddrBase).borrowAllowance(
                user,
                address(loopStrategyBase)
            )
        );

        loopStrategyBase.loopStrategy(
            wstEthAddrBase,
            amount,
            50, // 5x
            user,
            103,
            100
        );

        console.log(
            "Final balance of awstETH of USER:",
            IERC20(aWstEthAddressBase).balanceOf(user)
        );

        console.log(
            "Final balance of vWETH of USER:",
            IERC20(vWethAddrBase).balanceOf(user)
        );

        console.log(
            "Final balance of wstETH of LoopStategy contract:",
            IERC20(wstEthAddrBase).balanceOf(address(loopStrategyBase))
        );

        console.log(
            "Final balance of wstETH of user:",
            IERC20(wstEthAddrBase).balanceOf(user)
        );

        vm.stopPrank();
    }
}


// forge test --match-test testLoopStrategyBaseWsteth--fork-url $BASE_MAINNET_RPC -vvv

// 1236424
// 1930592
