// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "../interfaces/IERC20.sol";
import {ISwapRouter} from "../interfaces/ISwapRouter.sol";
import {IPool} from "../interfaces/IPool.sol";
import {IPoolAddressesProvider} from "../interfaces/IPoolAddressesProvider.sol";

error FAILED_TO_RECEIVED();

contract LoopStrategyZerolendLinea {
    ISwapRouter private immutable router;
    IPoolAddressesProvider private immutable addressesProvider;
    IPool private immutable pool;
    uint256 private constant TEN = 10;
    uint256 private constant HUNDRED = 100;

    constructor(address _addressProvider, address _router) {
        router = ISwapRouter(_router);
        addressesProvider = IPoolAddressesProvider(_addressProvider);
        pool = IPool(addressesProvider.getPool());
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
     * @param _borrowedToken address of the token to be borrowed
     * @param _amount amount of token
     * @param _leverage leverage multiplier
     * @param _user address of the user
     * @param _borrowPercentage borrow Percentage against token
     */
    function loopStrategy(
        address _token,
        address _borrowedToken,
        uint256 _amount,
        uint256 _leverage,
        address _user,
        uint256 _borrowPercentage,
        uint24 _slippage,
        uint256 _increaseApprove
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

        IERC20(_token).approve(
            address(pool),
            ((_leverage + _increaseApprove) * _amount) / TEN
        );

        IERC20(_borrowedToken).approve(
            address(router),
            ((_leverage + _increaseApprove) * _amount) / TEN
        );

        // Supply to Pool onbehalf of user
        pool.supply(_token, _amount, _user, 0);

        // Borrow borrow token
        pool.borrow(_borrowedToken, loanAmount, 2, 0, _user);

        uint256 swapAmount = 1;

        while (tokenAmount < leverageAmount) {
            swapAmount = swapExactInputSingleHop(
                _borrowedToken,
                _token,
                _slippage,
                IERC20(_borrowedToken).balanceOf(address(this)),
                address(this)
            );

            // Supply to Pool onbehalf of user
            pool.supply(_token, swapAmount, _user, 0);

            // update the token amount of the user
            unchecked {
                tokenAmount += swapAmount;
            }
            if (tokenAmount < leverageAmount) {
                loanAmount = (_borrowPercentage * swapAmount) / HUNDRED;

                pool.borrow(_borrowedToken, loanAmount, 2, 0, _user);
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
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: poolFee,
                recipient: receiver,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0, // need to be calcuated off-chain and need to take the value in parameter
                sqrtPriceLimitX96: 0
            });

        amountOut = router.exactInputSingle(params);
    }

    //----------------------------//
    //      view functions        //
    //----------------------------//

    // Function to get the address of the router contract
    function getRouterAddr() external view returns (address) {
        return address(router);
    }

    // Function to get the address of the addressesProvider contract
    function getAddressesProviderAddr() external view returns (address) {
        return address(addressesProvider);
    }

    // Function to get the address of the pool contract
    function getPoolAddr() external view returns (address) {
        return address(pool);
    }
}