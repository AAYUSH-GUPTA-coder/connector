// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "../interfaces/IERC20.sol";
import {OAppSender, OAppCore, Origin, MessagingFee} from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import { OptionsBuilder } from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OptionsBuilder.sol";

error Source__TransferFailed();
error Source__NotEnoughLinkBalance(uint256 balance, uint256 required);
error Source__OnlyOwnerCanCall();

contract SourceLZ is OAppSender {
    using OptionsBuilder for bytes;

    // struct to store the parameters for the strategy
    struct StrategyParams {
        address token;
        address destinationToken;
        address user;
        uint24 slippage;
        uint128 gasFeeAmount;
        uint256 leverage;
        uint256 borrowPercentage;
    }

    // event to emit when a cross-chain message is sent
    event CrossChainMessageSent(
        bytes32 messageId,
        uint256 amount,
        uint256 leverage,
        uint64 destinationChainSelector,
        address receiver
    );

    constructor(
        address _endpoint, // address of the source chain’s Endpoint Address for communicating with the protocol
        address _owner // address that will own the OApp contract
    ) OAppCore(_endpoint, _owner) Ownable(_owner) {}

    // function to withdraw the token from the contract
    function withdraw(uint256 _amount, address _token, address _receiver) external onlyOwner {
        IERC20(_token).transfer(_receiver, _amount);
    }

    // function to call the strategy. This function is called by the user
    function callStrategy(
        StrategyParams memory params,
        address _sourcePool, // address of the sourcePool to deposit the token
        uint256 _amount, // amount of the token to be deposited
        uint32 _dstEid // Destination chain's endpoint ID.
    ) external payable{
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

        // calling the cross-chain transfer function
        _crossChainTransferLayerZero(
            _amount,
            params.destinationToken,
            params.gasFeeAmount,
            _dstEid,
            params.leverage,
            params.borrowPercentage,
            params.slippage
        );
    }

    function _crossChainTransferLayerZero(
        uint256 _amount, // amount of the token to be deposited
        address _destinationToken, // address of the token in destination chain
        uint128 _gasFeeAmount, // amount of gas fee to be paid
        uint32 _dstEid, // Destination chain's endpoint ID.
        uint256 _leverage, // leverage to be used
        uint256 _borrowPercentage, // borrow percentage to be used
        uint24 _slippage // slippage to be used
    ) private {
        // encoding _payload with function signature
        bytes memory _payload = abi.encodeWithSignature(
                "loopStrategy(address,uint256,uint256,address,uint256,uint24)",
                _destinationToken,
                _amount,
                _leverage,
                msg.sender,  // address of user 
                _borrowPercentage,
                _slippage
            );
        
        // create _Option parameter for send function
        //! need to check, very carefully
        bytes memory _options = createLzReceiveOption(_gasFeeAmount, 0);

        _lzSend(
            _dstEid,
            _payload,
            _options,
            // Fee in native gas and ZRO token.
            MessagingFee(msg.value, 0), 
            //! set _gasFeeAmount + 100_000
            // Refund address in case of failed source message.
            payable(msg.sender)
        );
    }

    // function to create _Option parameter for send function
    function createLzReceiveOption(uint128 _gas, uint128 _value) private pure returns(bytes memory) {
        return OptionsBuilder.newOptions().addExecutorLzReceiveOption(_gas, _value);
    }

    //----------------------------//
    //      view functions        //
    //----------------------------//

    // function to get the balance of the token
    function getTokenBalance(address _token) external view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }
}
