// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "./interfaces/IERC20.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

error Source__TransferFailed();
error Source__NotEnoughLinkBalance(uint256 balance, uint256 required);
error Source__OnlyOwnerCanCall();

contract Source {
    // address of the ccip router
    address private immutable i_ccipRouter;
    // address of the link token
    address private immutable i_link;
    // address of the owner
    address private owner;

    // struct to store the parameters for the strategy
    struct StrategyParams {
        address token;
        address destinationToken;
        address user;
        uint24 slippage;
        uint256 gasFeeAmount;
        uint256 leverage;
        uint256 borrowPercentage;
    }

    // event to emit when a cross-chain message is sent
    event CrossChainMessageSent(
        bytes32 messageId,
        uint256 amount,
        uint256 leverage,
        // uint256 borrowPercentage,
        // uint24 slippage,
        uint64 destinationChainSelector,
        address receiver
        // uint256 gasFeeAmount
    );

    // modifier to check if the caller is the owner
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert Source__OnlyOwnerCanCall();
        }
        _;
    }

    constructor(address _router, address _link, address _owner) {
        i_ccipRouter = _router;
        i_link = _link;
        owner = _owner;
    }

    // function to set the owner of the contract
    function setOwner(address _owner) external onlyOwner {
        owner = _owner;
    }

    // function to withdraw the token from the contract
    function withdraw(uint256 _amount, address _token) external onlyOwner {
        IERC20(_token).transfer(owner, _amount);
    }

    // function to call the strategy. This function is called by the user
    function callStrategy(
        StrategyParams memory params,
        // address _token, // address of the token to be deposited
        // address _destinationToken, // address of the token in destination chain
        address _sourcePool, // address of the sourcePool to deposit the token
        uint256 _amount, // amount of the token to be deposited
        // uint256 _gasFeeAmount, // amount of gas fee to be paid
        address _receiver, // address of the receiver contract on destination chain
        // uint256 _leverage, // leverage to be used
        // uint256 _borrowPercentage, // borrow percentage to be used
        uint64 _destinationChainSelector // chain selector of the destination chain // uint24 _slippage // slippage to be used
    ) external {
        // receive token from the user
        bool success = IERC20(params.token).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        if (!success) {
            revert Source__TransferFailed();
        }

        // send token to the sourcePool
        bool success1 = IERC20(params.token).transfer(_sourcePool, _amount);
        if (!success1) {
            revert Source__TransferFailed();
        }

        //! commented this for smart contract test
        // calling the cross-chain transfer function
        crossChainTransfer(
            _receiver,
            _amount,
            params.destinationToken,
            params.gasFeeAmount,
            _destinationChainSelector,
            params.leverage,
            params.borrowPercentage,
            params.slippage
        );
    }

    // function to call the strategy on the destination chain
    function crossChainTransfer(
        address _receiver, // address of the receiver contract on destination chain
        uint256 _amount, // amount of token to be transferred/released
        address _destinationToken, // address of the token on the destination chain
        uint256 _gasFeeAmount, // amount of gas fee to be paid
        uint64 _destinationChainSelector, // chain selector of the destination chain
        uint256 _leverage, // leverage to be used
        uint256 _borrowPercentage, // borrow percentage to be used
        uint24 _slippage // slippage to be used
    ) private returns (bytes32 messageId) {
        // create client message
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            //! check this carefully
            data: abi.encodeWithSignature(
                "loopStrategy(address,uint256,uint256,address,uint256,uint24)",
                _destinationToken,
                _amount,
                _leverage,
                msg.sender,  // user 
                _borrowPercentage,
                _slippage
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: _gasFeeAmount})
            ),
            feeToken: i_link
        });

        // calculate fees
        uint256 fee = IRouterClient(i_ccipRouter).getFee(
            _destinationChainSelector,
            message
        );

        if (fee > IERC20(i_link).balanceOf(address(this)))
            revert Source__NotEnoughLinkBalance(
                IERC20(i_link).balanceOf(address(this)),
                fee
            );

        // approve router contract to use LINK token
        LinkTokenInterface(i_link).approve(i_ccipRouter, fee);

        // execute the action
        messageId = IRouterClient(i_ccipRouter).ccipSend(
            _destinationChainSelector,
            message
        );

        emit CrossChainMessageSent(
            messageId,
            _amount,
            _leverage,
            // _borrowPercentage,
            // _slippage,
            _destinationChainSelector,
            _receiver
            // _gasFeeAmount
        );

        // Return the message ID
        return messageId;
    }

    //----------------------------//
    //      view functions        //
    //----------------------------//

    // function to get the owner of the contract
    function getOwner() external view returns (address) {
        return owner;
    }

    // function to get the balance of the token
    function getTokenBalance(address _token) external view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }

    // function to get the router address
    function getRouterAddr() external view returns (address) {
        return i_ccipRouter;
    }

    // function to get the link address
    function getLinkAddress() external view returns (address) {
        return i_link;
    }
}
