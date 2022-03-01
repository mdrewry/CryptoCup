// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Cup {
    address public owner;
    uint256 public buyIn;
    uint256 public pool;
    uint16[] public split;
    bool public cupActive;
    bool public cupEnded;
    address[] public players;

    //modifier ensuring only owner can call functions
    modifier onlyowner {
        require(owner == msg.sender);
        _;
    }

    //Constructor of smart contract
    constructor(uint256 _buyIn, uint16[] memory _split){
        owner = msg.sender;
        buyIn = _buyIn;
        split = _split;
        cupActive = false;
        cupEnded = false;
    }

    //returns whether player exists in players array or not
    function checkPlayerExists(address player) public view
    returns(bool){
        for(uint256 i = 0; i < players.length; i++)
            if(players[i] == player) return true;
        return false;
    }

    //allows user to join the cup and add bet to pool
    function joinCup() public payable{

        //verifies cup has not started and has not ended
        require(!cupActive);
        require(!cupEnded);

        //verifies user is not already in cup and has bet enough
        require(!checkPlayerExists(msg.sender));
        require(msg.value >= buyIn);

        pool += msg.value;
        players.push(msg.sender);
    }

    //starts cup when owner is ready
    function startCup() public onlyowner{
        //verifies cup has not started and has not ended
        require(!cupActive);
        require(!cupEnded);

        cupActive = true;
    }

    function endCup(address[] calldata ranks) public onlyowner{
        //verifies cup has begun and has not ended
        require(cupActive);
        require(!cupEnded);

        distributePrizes(ranks);

        //clear variables
        pool = 0;
        buyIn = 0;
        delete split;
        delete players;
        cupEnded = true;
        cupActive = false;

        //deletes smart contract & sends remaining balance to owner
        selfdestruct(payable(owner));
    }

    function distributePrizes(address[] memory ranks) private{
        for(uint256 i = 0; i < split.length; i++){
            if(i < ranks.length){
                uint256 prize = pool/split[i];
                payable(ranks[i]).transfer(prize);
            }
        }
    }
}