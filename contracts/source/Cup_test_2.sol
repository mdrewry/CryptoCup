// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;
import "remix_tests.sol"; 
import "remix_accounts.sol";
import "../Cup.sol";

contract testSuite is Cup {
    address owner = TestsAccounts.getAccount(0); //owner by default
    address acc1 = TestsAccounts.getAccount(1);
    address acc2 = TestsAccounts.getAccount(2);
    address acc3 = TestsAccounts.getAccount(3);
    address acc4 = TestsAccounts.getAccount(4); //recipient

    /// #value: 1000000000000000000
    /// #sender: account-1
    function join1AndCheckPool() public payable{
        Assert.equal(msg.value, 1000000000000000000, 'value should be 1 Eth');
        joinCup();
        Assert.equal(balances_getter(recipient), 1000000000000000000, 'balances should be 1 Eth');
    }
    
    /// #value: 1000000000000000000
    /// #sender: account-2
    function join2AndCheckPool() public payable{
        Assert.equal(msg.value, 1000000000000000000, 'value should be 1 Eth');
        joinCup();
        Assert.equal(balances_getter(recipient), 2000000000000000000, 'balances should be 2 Eth');
    }
    
    /// #value: 2000000000000000000
    /// #sender: account-3
    function join3AndCheckPool()  public payable{
        Assert.equal(msg.value, 2000000000000000000, 'value should be 1 Eth');
        joinCup();
        Assert.equal(balances_getter(recipient), 4000000000000000000, 'balances should be 4 Eth');
    }
    
    /// #sender: account-4
    function testEndCup() public payable{
        uint initialBal = getBalance();
        endCup([acc1,acc3,acc4,acc2]);
        uint finalBal = getBalance();
        Assert.equal(finalBal-initialBal, 4000000000000000000, 'balances should be 4 Eth');
    }
}