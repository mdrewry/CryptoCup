// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;
import "remix_tests.sol";
import "./Cup.sol";

contract MyTest {
    Cup foo;

    // beforeEach works before running each test
    function beforeEach() public {
        foo = new Cup(100,[2,3,5]);
    }

    /// Test if initial value is set correctly
    function buyInShouldBe100() public returns (bool) {
        return Assert.equal(foo.buyIn, 100, "buyIn initial value is not correct");
    }

    /// Test if value is set as expected
    function splitShouldBe235() public returns (bool) {
        return Assert.equal(foo.split, [2,3,5], "split initial value is not correct");
    }

    function cupStatusShouldBeFF() public returns (bool) {
        return Assert.equal(foo.cupActive, false, "active initial value is not correct") && Assert.equal(foo.cupEnded, false, "ended initial value is not correct");
    }
}