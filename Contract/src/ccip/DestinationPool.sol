// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "../interfaces/IERC20.sol";

error DestinationPool__onlyOwnerCanCall(address);
error DestinationPool__ccipReceiveError();
error DestinationPool__failedToWithdrawToken(address, uint256);
error DestinationPool__NotEnoughTokenBalance(address, uint256);

contract DestinationPool is CCIPReceiver {
    // address of the loop strategy
    address private loopStrategy;
    // address of the token
    address private tokenAddr;
    // address of the owner
    address private owner;

    modifier onlyOwner() {
        if (msg.sender != owner)
            revert DestinationPool__onlyOwnerCanCall(msg.sender);
        _;
    }

    constructor(
        address _router,
        address _loopStrategy,
        address _tokenAddr,
        address _owner
    ) CCIPReceiver(_router) {
        loopStrategy = _loopStrategy;
        tokenAddr = _tokenAddr;
        owner = _owner;
    }

    // function to set the loop strategy address
    function setLoopStrategy(address _loopStrategy) external onlyOwner {
        loopStrategy = _loopStrategy;
    }

    // function to set the token address
    function setTokenAddr(address _tokenAddr) external onlyOwner {
        tokenAddr = _tokenAddr;
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        require(message.data.length > 0, "Data cannot be empty");
        require(message.data.length >= 4, "Invalid message length"); // Ensure the message is long enough

        bytes memory data1 = message.data;

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
        (bool success, ) = loopStrategy.call(message.data);
        if (!success) revert DestinationPool__ccipReceiveError();
    }

    // function testCcipReceiveMemory(bytes memory message) public {
    //     require(message.length > 0, "Data cannot be empty");
    //     require(message.length >= 4, "Invalid message length"); // Ensure the message is long enough

    //     // Use inline assembly to skip the first 4 bytes (function selector) and decode the rest
    //     bytes memory data;
    //     assembly {
    //         data := add(message, 0x04) // Move 4 bytes ahead to skip the selector
    //     }

    //     // Decode the rest of the data
    //     (
    //         address _tokenAddr,
    //         uint256 _amount,
    //         uint256 _leverage,
    //         address _user,
    //         uint256 _borrowPercentage,
    //         uint24 _slippage
    //     ) = abi.decode(
    //             data,
    //             (address, uint256, uint256, address, uint256, uint24)
    //         );

    //     // check if the amount is greater than the balance of the contract
    //     if (_amount > IERC20(_tokenAddr).balanceOf(address(this)))
    //         revert DestinationPool__NotEnoughTokenBalance(_tokenAddr, _amount);

    //     // approve the LoopStrategy to use token
    //     IERC20(_tokenAddr).approve(loopStrategy, _amount);

    //     // call the loop strategy
    //     (bool success, ) = loopStrategy.call(message);
    //     if (!success) revert DestinationPool__ccipReceiveError();
    // }

    // function testCcipReceive(bytes calldata message) public {
    //     require(message.length > 0, "Data cannot be empty");

    //     //! need to get the value amount and token address from the message
    //     // get the token address and amount from the message
    //     (address _tokenAddr, uint256 _amount, , , , ) = abi.decode(
    //         message[4:],
    //         (address, uint256, uint256, address, uint256, uint24)
    //     );

    //     // check if the amount is greater than the balance of the contract
    //     if (_amount > IERC20(_tokenAddr).balanceOf(address(this)))
    //         revert DestinationPool__NotEnoughTokenBalance(_tokenAddr, _amount);

    //     // transfer the token to the loop strategy
    //     // IERC20(_tokenAddr).transfer(loopStrategy, _amount);

    //     // approve the LoopStrategy to use token
    //     IERC20(_tokenAddr).approve(loopStrategy, _amount);

    //     // call the loop strategy
    //     (bool success, ) = loopStrategy.call(message);
    //     if (!success) revert DestinationPool__ccipReceiveError();
    // }

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
