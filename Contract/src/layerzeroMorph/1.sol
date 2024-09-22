// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.24;

// contract UniswapV2SwapExamples {
//     address private constant Bulbaswap_V2_ROUTER =
//         0x6824D42A7e67e237EC4c8184E5ce3e9A240c1b8B;

//     address private constant USDC = 0x9B056FbA1201d05376383708a45ECF91e3B975F4;
//     address private constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
//     address constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

//     IUniswapV2Router private router = IUniswapV2Router(UNISWAP_V2_ROUTER);
//     IERC20 private weth = IERC20(USDC);
//     IERC20 private dai = IERC20(DAI);

//     // Swap USDC to DAI
//     function swapSingleHopExactAmountIn(uint256 amountIn, uint256 amountOutMin)
//         external
//         returns (uint256 amountOut)
//     {
//         weth.transferFrom(msg.sender, address(this), amountIn);
//         weth.approve(address(router), amountIn);

//         address[] memory path;
//         path = new address[](2);
//         path[0] = USDC;
//         path[1] = DAI;

//         uint256[] memory amounts = router.swapExactTokensForTokens(
//             amountIn, amountOutMin, path, msg.sender, block.timestamp
//         );

//         // amounts[0] = USDC amount, amounts[1] = DAI amount
//         return amounts[1];
//     }

//     // Swap DAI -> USDC -> USDC
//     function swapMultiHopExactAmountIn(uint256 amountIn, uint256 amountOutMin)
//         external
//         returns (uint256 amountOut)
//     {
//         dai.transferFrom(msg.sender, address(this), amountIn);
//         dai.approve(address(router), amountIn);

//         address[] memory path;
//         path = new address[](3);
//         path[0] = DAI;
//         path[1] = USDC;
//         path[2] = USDC;

//         uint256[] memory amounts = router.swapExactTokensForTokens(
//             amountIn, amountOutMin, path, msg.sender, block.timestamp
//         );

//         // amounts[0] = DAI amount
//         // amounts[1] = USDC amount
//         // amounts[2] = USDC amount
//         return amounts[2];
//     }

//     // Swap USDC to DAI
//     function swapSingleHopExactAmountOut(
//         uint256 amountOutDesired,
//         uint256 amountInMax
//     ) external returns (uint256 amountOut) {
//         weth.transferFrom(msg.sender, address(this), amountInMax);
//         weth.approve(address(router), amountInMax);

//         address[] memory path;
//         path = new address[](2);
//         path[0] = USDC;
//         path[1] = DAI;

//         uint256[] memory amounts = router.swapTokensForExactTokens(
//             amountOutDesired, amountInMax, path, msg.sender, block.timestamp
//         );

//         // Refund USDC to msg.sender
//         if (amounts[0] < amountInMax) {
//             weth.transfer(msg.sender, amountInMax - amounts[0]);
//         }

//         return amounts[1];
//     }

//     // Swap DAI -> USDC -> USDC
//     function swapMultiHopExactAmountOut(
//         uint256 amountOutDesired,
//         uint256 amountInMax
//     ) external returns (uint256 amountOut) {
//         dai.transferFrom(msg.sender, address(this), amountInMax);
//         dai.approve(address(router), amountInMax);

//         address[] memory path;
//         path = new address[](3);
//         path[0] = DAI;
//         path[1] = USDC;
//         path[2] = USDC;

//         uint256[] memory amounts = router.swapTokensForExactTokens(
//             amountOutDesired, amountInMax, path, msg.sender, block.timestamp
//         );

//         // Refund DAI to msg.sender
//         if (amounts[0] < amountInMax) {
//             dai.transfer(msg.sender, amountInMax - amounts[0]);
//         }

//         return amounts[2];
//     }
// }

// interface IUniswapV2Router {
//     function swapExactTokensForTokens(
//         uint256 amountIn,
//         uint256 amountOutMin,
//         address[] calldata path,
//         address to,
//         uint256 deadline
//     ) external returns (uint256[] memory amounts);

//     function swapTokensForExactTokens(
//         uint256 amountOut,
//         uint256 amountInMax,
//         address[] calldata path,
//         address to,
//         uint256 deadline
//     ) external returns (uint256[] memory amounts);
// }

// interface IERC20 {
//     function totalSupply() external view returns (uint256);
//     function balanceOf(address account) external view returns (uint256);
//     function transfer(address recipient, uint256 amount)
//         external
//         returns (bool);
//     function allowance(address owner, address spender)
//         external
//         view
//         returns (uint256);
//     function approve(address spender, uint256 amount) external returns (bool);
//     function transferFrom(address sender, address recipient, uint256 amount)
//         external
//         returns (bool);
// }

// interface IWETH is IERC20 {
//     function deposit() external payable;
//     function withdraw(uint256 amount) external;
// }
