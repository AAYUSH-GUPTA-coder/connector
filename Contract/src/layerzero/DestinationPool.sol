// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "../interfaces/IERC20.sol";

error DestinationPool__onlyOwnerCanCall(address);
error DestinationPool__layerZeroReceiveError();
error DestinationPool__failedToWithdrawToken(address, uint256);
error DestinationPool__NotEnoughTokenBalance(address, uint256);

contract DestinationPool is OApp {
    // address of the loop strategy
    address private loopStrategy;
    // address of the token
    address private tokenAddr;
    // address of the owner
    address private owner;

    constructor(
        address _endpoint, // address of the source chain’s Endpoint Address for communicating with the protocol
        address _owner // address that will own the OApp contract
    ) OApp(_endpoint, _owner) Ownable(_owner) {}

    // function to set the loop strategy address
    function setLoopStrategy(address _loopStrategy) external onlyOwner {
        loopStrategy = _loopStrategy;
    }

    // function to set the token address
    function setTokenAddr(address _tokenAddr) external onlyOwner {
        tokenAddr = _tokenAddr;
    }

     function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata payload,
        address,  // Executor address as specified by the OApp.
        bytes calldata  // Any extra data or options to trigger on receipt.
    ) internal override {   
        require(payload.length > 0, "Data cannot be empty");
        require(payload.length >= 4, "Invalid message length"); // Ensure the message is long enough

        bytes memory data1 = payload;

        // Use inline assembly to skip the first 4 bytes (function selector) and decode the rest
        bytes memory memoryMessage;
        assembly {
            memoryMessage := add(data1, 0x04) // Move 4 bytes ahead to skip the selector
        }

        //! need to get the value amount and token address from the message
        // get the token address and amount from the message
        (address _tokenAddr, uint256 _amount, , , , ) = abi.decode(
            memoryMessage,
            (address, uint256, uint256, address, uint256, uint24)
        );

        // check if the amount is greater than the balance of the contract
        if (_amount > IERC20(_tokenAddr).balanceOf(address(this)))
            revert DestinationPool__NotEnoughTokenBalance(_tokenAddr, _amount);

        // approve the LoopStrategy to use token
        IERC20(_tokenAddr).approve(loopStrategy, _amount);

        // call the loop strategy
        (bool success, ) = loopStrategy.call(payload);
        if (!success) revert DestinationPool__layerZeroReceiveError();
    }

    receive() external payable {}

    // function to withdraw token from the contract
    function withdrawToken(address _token) external onlyOwner {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        bool success = IERC20(_token).transfer(msg.sender, amount);
        if (!success)
            revert DestinationPool__failedToWithdrawToken(_token, amount);
    }

    // function to get the owner address
    function getOwnerAddr() external view returns (address) {
        return owner;
    }

    // function to get the loop strategy address
    function getLoopStrategy() external view returns (address) {
        return loopStrategy;
    }

    // function to get the token address
    function getTokenAddr() external view returns (address) {
        return tokenAddr;
    }

    // function to get the token balance of the contract
    function getTokenBalance(address _token) external view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }
}
