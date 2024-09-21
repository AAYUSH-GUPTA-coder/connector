// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.24;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import {IERC20} from "../src/interfaces/IERC20.sol";
import {LoopStrategyLinea} from "../src/layerzero/LoopStrategyLinea.sol";
import {ICreditDelegationToken} from "../src/interfaces/ICreditDelegationToken.sol";

import {IPool} from "../src/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "../src/interfaces/IPoolAddressesProvider.sol";

contract TestLoopStrategyZerolendLinea is Test {
    IERC20 public wstETH;
    LoopStrategyLinea public loopStrategy;

    IPool public aavePool;
    IPoolAddressesProvider public addressesProvider;

    address public wstEthAddr = 0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F;
    address public addressProvider = 0xC44827C51d00381ed4C52646aeAB45b455d200eB;
    address public route = 0x1b81D678ffb9C0263b24A97847620C99d213eB14;
    address public wethAddress = 0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f;
    address public aWstEthAddress = 0x9Eb8879231c71BD739967628CA26b72810BEEaD8;
    address public vWethAddress = 0xCb2dA0F5aEce616e2Cbf29576CFc795fb15c6133;
    address public wethDebtToken = 0xCb2dA0F5aEce616e2Cbf29576CFc795fb15c6133;
    address public user1 = 0xF4847F0646F6AB5261e28Ca28A5199283E2f99E0;

    function setUp() public {
        // setup the value
        wstETH = IERC20(wstEthAddr);
        loopStrategy = new LoopStrategyLinea(addressProvider, route, wethAddress);

        addressesProvider = IPoolAddressesProvider(addressProvider);
        aavePool = IPool(addressesProvider.getPool());
    }

    function testLoopStrategyLinea() public {
        address user = address(1);
        console.log("Address of the User", user);

        uint256 amount = 1 ether;
        console.log("Address of loopStrategy", address(loopStrategy));

        vm.startPrank(user);
        deal(wstEthAddr, user, 1 * 1e18, false);

        console.log("Balance of wstETH of user", wstETH.balanceOf(user));

        wstETH.approve(address(loopStrategy), type(uint256).max);

        ICreditDelegationToken(wethDebtToken).approveDelegation(
            address(loopStrategy),
            type(uint256).max
        );

        console.log("Address of loopstrategy contract", address(loopStrategy));

        console.log(
            "Borrow Allownace",
            ICreditDelegationToken(wethDebtToken).borrowAllowance(
                user,
                address(loopStrategy)
            )
        );

        loopStrategy.loopStrategy(
            wstEthAddr,
            amount,
            22, // 2.2x
            user,
            70,
            100
        );

        console.log(
            "Balance of weth LoopStategyZerolend contract",
            IERC20(wethAddress).balanceOf(address(loopStrategy))
        );

        console.log(
            "Balance of vWeth LoopStategyZerolend contract",
            IERC20(vWethAddress).balanceOf(address(loopStrategy))
        );

        console.log(
            "Balance of vWeth user",
            IERC20(vWethAddress).balanceOf(user)
        );

        console.log(
            "Balance of wstETH LoopStategyZerolend contract",
            IERC20(wstEthAddr).balanceOf(address(loopStrategy))
        );

        console.log(
            "Balance of AwstEth of user",
            IERC20(aWstEthAddress).balanceOf(user)
        );

        console.log(
            "Balance of AwstEth of LoopStategyZerolend contract",
            IERC20(aWstEthAddress).balanceOf(address(loopStrategy))
        );

        console.log(
            "Final balance of awstETH of USER:",
            IERC20(aWstEthAddress).balanceOf(user)
        );

        console.log(
            "Final balance of vWETH of USER:",
            IERC20(vWethAddress).balanceOf(user)
        );

        console.log(
            "Final balance of wstETH of LoopStategyZerolend contract:",
            IERC20(wstEthAddr).balanceOf(address(loopStrategy))
        );

        vm.stopPrank();
    }
}