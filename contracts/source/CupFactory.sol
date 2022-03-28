// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import './Cup.sol';

contract CupFactory{
  address[] public cups;

  event CupCreated(address newCupAddress, uint256 index);

  function newCup(uint256 _buyIn, uint16[] memory _split) public returns(address) {
    Cup c = new Cup(_buyIn, _split, msg.sender);
    cups.push(address(c));
    emit CupCreated(address(c), cups.length - 1);
    return address(c);
  }

  function getCupCount()public view returns(uint) {
    return cups.length;
  }

  function getCupAddress(uint256 _index) public view returns(address){
    return cups[_index];
  }

}