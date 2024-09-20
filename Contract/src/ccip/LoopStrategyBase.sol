// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "./interfaces/IERC20.sol";
import {ISwapRouter02} from "./interfaces/ISwapRouter02.sol";
import {IPool} from "./interfaces/IPool.sol";
import {IPoolAddressesProvider} from "./interfaces/IPoolAddressesProvider.sol";

error FAILED_TO_RECEIVED();

contract LoopStrategyBase {
    ISwapRouter02 private immutable router;
    IPoolAddressesProvider private immutable addressesProvider;
    IPool private immutable pool;
    uint256 private constant TEN = 10;
    uint256 private constant HUNDRED = 100;
    address private borrowToken; // WETH address

    constructor(
        address _addressProvider,
        address _router,
        address _borrowToken
    ) {
        router = ISwapRouter02(_router);
        addressesProvider = IPoolAddressesProvider(_addressProvider);
        pool = IPool(addressesProvider.getPool());
        borrowToken = _borrowToken;
    }

    /********************************
     *                              *
     *      SETTER FUNCTIONS        *
     *                              *
     *********************************/

    /********************************
     *                              *
     *      PUBLIC FUNCTIONS        *
     *                              *
     *********************************/

    /**
     * @notice function to run the loop strategy
     * @param _token address of the token we will take looping on
     * @param _amount amount of token
     * @param _leverage leverage multiplier
     * @param _user address of the user
     * @param _borrowPercentage borrow Percentage against token
     * @param _slippage Slippage of Pool
     */
    function loopStrategy(
        address _token,
        uint256 _amount,
        uint256 _leverage,
        address _user,
        uint256 _borrowPercentage,
        uint24 _slippage
    ) external {
        bool receiveToken = IERC20(_token).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        if (!receiveToken) revert FAILED_TO_RECEIVED();

        uint leverageAmount = (_leverage * _amount) / TEN;

        uint256 tokenAmount = _amount;

        uint loanAmount = (_borrowPercentage * _amount) / HUNDRED;

        // Approve pool to use token
        IERC20(_token).approve(
            address(pool),
            ((_leverage + TEN) * _amount) / TEN
        );

        IERC20(borrowToken).approve(
            address(router),
            ((_leverage + TEN) * _amount) / TEN
        );

        // Supply to Pool onbehalf of user
        pool.supply(_token, _amount, _user, 0);

        // Borrow borrowToken token
        pool.borrow(borrowToken, loanAmount, 2, 0, _user);

        uint256 swapAmount;

        while (tokenAmount < leverageAmount) {
            swapAmount = swapExactInputSingleHop(
                borrowToken,
                _token,
                _slippage,
                IERC20(borrowToken).balanceOf(address(this)),
                address(this)
            );

            // Supply to Pool onbehalf of user
            pool.supply(_token, swapAmount, _user, 0);

            // update the token amount of the user
            tokenAmount += swapAmount;
            if (tokenAmount < leverageAmount) {
                loanAmount = (_borrowPercentage * swapAmount) / HUNDRED;

                pool.borrow(borrowToken, loanAmount, 2, 0, _user);
            }
        }
    }

    /********************************
     *                              *
     *      PRIVATE FUNCTIONS       *
     *                              *
     *********************************/

    /**
     * @notice function to swap tokens
     */
    function swapExactInputSingleHop(
        address tokenIn,
        address tokenOut,
        uint24 poolFee,
        uint amountIn,
        address receiver
    ) private returns (uint amountOut) {
        ISwapRouter02.ExactInputSingleParams memory params = ISwapRouter02
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: poolFee,
                recipient: receiver,
                // deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0, // need to be calcuated off-chain and need to take the value in parameter
                sqrtPriceLimitX96: 0
            });

        amountOut = router.exactInputSingle(params);
    }

    /********************************
     *                              *
     *      GETTER FUNCTIONS        *
     *                              *
     *********************************/

    // Function to get the address of the router contract
    function getRouterAddr() external view returns (address) {
        return address(router);
    }

    // Function to get the address of the addressesProvider contract
    function getAddressesProviderAddr() external view returns (address) {
        return address(addressesProvider);
    }

    // Function to get the address of the Pool contract
    function getPoolAddr() external view returns (address) {
        return address(pool);
    }

    // Function to get the address of the borrow token
    function getBorrowToken() external view returns (address) {
        return borrowToken;
    }
}
