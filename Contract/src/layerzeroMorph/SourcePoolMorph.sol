// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.24;

// import {IERC20} from "../interfaces/IERC20.sol";

// error SourcePoolLZ__onlyOwnerCanCall();
// error SourcePoolLZ__nonZeroAmount();

// contract SourcePoolMorph {
//     // address of the owner of the SourcePool
//     address public owner;

//     // modifier to check if the caller is the owner
//     modifier onlyOwner() {
//         if (msg.sender != owner) revert SourcePoolLZ__onlyOwnerCanCall();
//         _;
//     }

//     // modifier to check if the amount is not zero
//     modifier nonZeroAmount(uint256 _amount) {
//         if (_amount == 0) revert SourcePoolLZ__nonZeroAmount();
//         _;
//     }

//     // constructor to set the owner of the SourcePool
//     constructor(address _owner) {
//         owner = _owner;
//     }

//     // function to set the owner of the SourcePool
//     function setOwner(address _owner) external onlyOwner {
//         owner = _owner;
//     }

//     // function to withdraw tokens from the SourcePool
//     function withdraw(
//         uint256 _amount,
//         address _token
//     ) external onlyOwner nonZeroAmount(_amount) {
//         IERC20(_token).transfer(owner, _amount);
//     }

//     //----------------------------//
//     //      view functions        //
//     //----------------------------//

//     //   function to get the balance of the SourcePool
//     function getBalance(address _token) external view returns (uint256) {
//         return IERC20(_token).balanceOf(address(this));
//     }

//     // function to get the owner of the SourcePool
//     function getOwner() external view returns (address) {
//         return owner;
//     }
// }
